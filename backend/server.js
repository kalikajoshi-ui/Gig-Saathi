require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


// ================================
// USER MODEL
// ================================

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        passwordHash: {
            type: String,
            required: true,
            select: false
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);


// ================================
// QUERY MODEL
// ================================

const querySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        problem: {
            type: String,
            required: true,
            trim: true
        },

        language: {
            type: String,
            default: "en"
        },

        category: {
            type: String,
            default: "unknown"
        },

        status: {
            type: String,
            enum: ["open", "resolved"],
            default: "open"
        }
    },
    {
        timestamps: true
    }
);

const Query = mongoose.model("Query", querySchema);


// ================================
// AUTHENTICATION MIDDLEWARE
// ================================

function createToken(user) {
    return jwt.sign(
        {
            userId: user._id.toString(),
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "8h"
        }
    );
}

function authenticateUser(req, res, next) {
    const authHeader = req.headers.authorization;

    if (
        !authHeader ||
        !authHeader.startsWith("Bearer ")
    ) {
        return res.status(401).json({
            success: false,
            message: "Login required"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Session expired. Please login again."
        });
    }
}

function requireAdmin(req, res, next) {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Admin access required"
        });
    }

    next();
}


// ================================
// HEALTH CHECK
// ================================

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Gig Saathi backend is working",
        database:
            mongoose.connection.readyState === 1
                ? "connected"
                : "disconnected"
    });
});


// ================================
// USER REGISTRATION
// ================================

app.post("/api/auth/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const cleanName = String(name || "").trim();
        const cleanEmail = String(email || "")
            .trim()
            .toLowerCase();

        if (!cleanName || !cleanEmail || !password) {
            return res.status(400).json({
                success: false,
                message:
                    "Name, email and password are required"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must contain at least 8 characters"
            });
        }

        const existingUser = await User.findOne({
            email: cleanEmail
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message:
                    "An account with this email already exists"
            });
        }

        const passwordHash = await bcrypt.hash(
            password,
            12
        );

        const user = await User.create({
            name: cleanName,
            email: cleanEmail,
            passwordHash,
            role: "user"
        });

        const token = createToken(user);

        res.status(201).json({
            success: true,
            message: "Registration successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Registration failed",
            error: error.message
        });
    }
});


// ================================
// USER AND ADMIN LOGIN
// ================================

app.post("/api/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const cleanEmail = String(email || "")
            .trim()
            .toLowerCase();

        if (!cleanEmail || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({
            email: cleanEmail
        }).select("+passwordHash");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!passwordMatches) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = createToken(user);

        res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message
        });
    }
});


// ================================
// CURRENT USER INFORMATION
// ================================

app.get(
    "/api/auth/me",
    authenticateUser,
    async (req, res) => {
        try {
            const user = await User.findById(
                req.user.userId
            );

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            res.json({
                success: true,
                user
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Unable to load user"
            });
        }
    }
);


// ================================
// CREATE QUERY
// ================================

app.post(
    "/api/queries",
    authenticateUser,
    async (req, res) => {
        try {
            const {
                problem,
                language,
                category
            } = req.body;

            if (!problem || !problem.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Problem is required"
                });
            }

            const query = await Query.create({
                userId: req.user.userId,
                problem: problem.trim(),
                language: language || "en",
                category: category || "unknown",
                status: "open"
            });

            res.status(201).json({
                success: true,
                message: "Query saved successfully",
                query
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Unable to save query",
                error: error.message
            });
        }
    }
);


// ================================
// GET USER QUERY HISTORY
// ================================

app.get(
    "/api/queries",
    authenticateUser,
    async (req, res) => {
        try {
            const {
                category,
                language,
                status,
                search
            } = req.query;

            const filter = {};

            if (req.user.role !== "admin") {
                filter.userId = req.user.userId;
            }

            if (category) {
                filter.category = category;
            }

            if (language) {
                filter.language = language;
            }

            if (status) {
                filter.status = status;
            }

            if (search) {
                filter.problem = {
                    $regex: search,
                    $options: "i"
                };
            }

            const queries = await Query.find(filter)
                .sort({
                    createdAt: -1
                });

            res.json({
                success: true,
                total: queries.length,
                queries
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Unable to load queries",
                error: error.message
            });
        }
    }
);


// ================================
// ADMIN: UPDATE QUERY STATUS
// ================================

app.patch(
    "/api/queries/:id/status",
    authenticateUser,
    requireAdmin,
    async (req, res) => {
        try {
            const { status } = req.body;

            if (!["open", "resolved"].includes(status)) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Status must be open or resolved"
                });
            }

            const query = await Query.findByIdAndUpdate(
                req.params.id,
                {
                    status
                },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!query) {
                return res.status(404).json({
                    success: false,
                    message: "Query not found"
                });
            }

            res.json({
                success: true,
                message: "Query status updated",
                query
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Unable to update query",
                error: error.message
            });
        }
    }
);


// ================================
// ADMIN: DELETE QUERY
// ================================

app.delete(
    "/api/queries/:id",
    authenticateUser,
    requireAdmin,
    async (req, res) => {
        try {
            const query =
                await Query.findByIdAndDelete(
                    req.params.id
                );

            if (!query) {
                return res.status(404).json({
                    success: false,
                    message: "Query not found"
                });
            }

            res.json({
                success: true,
                message: "Query deleted successfully"
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Unable to delete query",
                error: error.message
            });
        }
    }
);


// ================================
// ADMIN DASHBOARD
// ================================

app.get(
    "/api/dashboard",
    authenticateUser,
    requireAdmin,
    async (req, res) => {
        try {
            const result = await Query.aggregate([
                {
                    $facet: {
                        summary: [
                            {
                                $group: {
                                    _id: null,

                                    totalQueries: {
                                        $sum: 1
                                    },

                                    openQueries: {
                                        $sum: {
                                            $cond: [
                                                {
                                                    $eq: [
                                                        {
                                                            $ifNull: [
                                                                "$status",
                                                                "open"
                                                            ]
                                                        },
                                                        "open"
                                                    ]
                                                },
                                                1,
                                                0
                                            ]
                                        }
                                    },

                                    resolvedQueries: {
                                        $sum: {
                                            $cond: [
                                                {
                                                    $eq: [
                                                        "$status",
                                                        "resolved"
                                                    ]
                                                },
                                                1,
                                                0
                                            ]
                                        }
                                    }
                                }
                            }
                        ],

                        categoryStats: [
                            {
                                $group: {
                                    _id: "$category",
                                    count: {
                                        $sum: 1
                                    }
                                }
                            },
                            {
                                $sort: {
                                    count: -1
                                }
                            }
                        ],

                        languageStats: [
                            {
                                $group: {
                                    _id: "$language",
                                    count: {
                                        $sum: 1
                                    }
                                }
                            },
                            {
                                $sort: {
                                    count: -1
                                }
                            }
                        ],

                        latestQueries: [
                            {
                                $sort: {
                                    createdAt: -1
                                }
                            },
                            {
                                $limit: 5
                            }
                        ]
                    }
                }
            ]);

            const analytics = result[0];

            const summary =
                analytics.summary[0] || {
                    totalQueries: 0,
                    openQueries: 0,
                    resolvedQueries: 0
                };

            res.json({
                success: true,
                summary,
                categoryStats:
                    analytics.categoryStats,
                languageStats:
                    analytics.languageStats,
                latestQueries:
                    analytics.latestQueries
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Unable to load dashboard",
                error: error.message
            });
        }
    }
);


// ================================
// CREATE ADMIN ACCOUNT
// ================================

async function createAdminAccount() {
    const adminEmail = String(
        process.env.ADMIN_EMAIL || ""
    )
        .trim()
        .toLowerCase();

    const adminPassword =
        process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
        throw new Error(
            "ADMIN_EMAIL or ADMIN_PASSWORD is missing"
        );
    }

    const existingAdmin = await User.findOne({
        email: adminEmail
    });

    if (existingAdmin) {
        console.log("Admin account already exists");
        return;
    }

    const passwordHash = await bcrypt.hash(
        adminPassword,
        12
    );

    await User.create({
        name: "Gig Saathi Admin",
        email: adminEmail,
        passwordHash,
        role: "admin"
    });

    console.log("Admin account created successfully");
}


// ================================
// START SERVER
// ================================

async function startServer() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error(
                "MONGODB_URI is missing from .env"
            );
        }

        if (!process.env.JWT_SECRET) {
            throw new Error(
                "JWT_SECRET is missing from .env"
            );
        }

        await mongoose.connect(
            process.env.MONGODB_URI
        );

        console.log("MongoDB connected successfully");

        await createAdminAccount();

        app.listen(PORT, () => {
            console.log(
                `Backend running at http://localhost:${PORT}`
            );
        });

    } catch (error) {
        console.error(
            "Server startup error:",
            error.message
        );
    }
}

startServer();