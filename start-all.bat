@echo off
echo Starting PATHFINDER AI Browser Agent Services...
start "PATHFINDER Server (Port 5000)" cmd /k "cd /d %~dp0server && npm start"
timeout /t 2 /nobreak >nul
start "PATHFINDER Frontend (Vite)" cmd /k "cd /d %~dp0client && npm run dev"
echo Services launched!
echo Open http://localhost:5173 in Google Chrome or Microsoft Edge.
pause
