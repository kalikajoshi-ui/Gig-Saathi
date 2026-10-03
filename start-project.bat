@echo off

start "Gig Saathi Backend" cmd /k "cd /d ""%~dp0backend"" && node server.js"

start "Gig Saathi Frontend" cmd /k "cd /d ""%~dp0"" && npx http-server -p 5500"

timeout /t 4 /nobreak >nul

start "" "http://127.0.0.1:5500/user-login.html"