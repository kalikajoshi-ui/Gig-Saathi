@echo off
cd /d "%~dp0"

echo Starting Gig Saathi backend...
echo Current folder: %cd%

if not exist server.js (
    echo ERROR: server.js is not present in this folder.
    pause
    exit /b
)

node server.js

echo Backend stopped or an error occurred.
pause