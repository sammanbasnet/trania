@echo off
echo Starting TRANIA Backend Server...
echo.
echo Make sure MongoDB is running before starting the server!
echo.
cd /d %~dp0
npm start
pause

