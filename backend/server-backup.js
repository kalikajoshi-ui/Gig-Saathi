require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB Query Schema
const querySchema = new mongoose.Schema(
    {
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

// Check backend and database connection
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

// CREATE: Save a new query
app.post("/api/queries", async (req, res) => {
    try {
        const { problem, language, category } = req.body;

        if (!problem || !problem.trim()) {
            return res.status(400).json({
                success: false,
                message: "Problem is required"
            });
        }

        const query = await Query.create({
            problem: problem.trim(),
            language: language || "en",
            category: category || "unknown",
            status: "open"
        });

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to save query",
            error: error.message
        });
    }
});

// READ + FILTER: Get queries from MongoDB
app.get("/api/queries", async (req, res) => {
    try {
        const { category, language, status, search } = req.query;

        const filter = {};

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

        const queries = await Query.find(filter).sort({
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
});

// UPDATE: Change query status
app.patch("/api/queries/:id/status", async (req, res) => {
    try {
        const { status } = req.body;

        if (!["open", "resolved"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status must be open or resolved"
            });
        }

        const query = await Query.findByIdAndUpdate(
            req.params.id,
            { status: status },
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
});

// DELETE: Remove a query
app.delete("/api/queries/:id", async (req, res) => {
    try {
        const query = await Query.findByIdAndDelete(
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
});

// MongoDB Aggregation: Dashboard analytics
app.get("/api/dashboard", async (req, res) => {
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
        const summary = analytics.summary[0] || {
            totalQueries: 0,
            openQueries: 0,
            resolvedQueries: 0
        };

        res.json({
            success: true,
            summary,
            categoryStats: analytics.categoryStats,
            languageStats: analytics.languageStats,
            latestQueries: analytics.latestQueries
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to load dashboard",
            error: error.message
        });
    }
});

// Connect MongoDB and start backend
async function startServer() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error(
                "MONGODB_URI is missing from the .env file"
            );
        }

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(
                `Backend running at http://localhost:${PORT}`
            );
        });
    } catch (error) {
        console.error(
            "MongoDB connection error:",
            error.message
        );
    }
}

startServer();