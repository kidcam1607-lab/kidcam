@echo off
setlocal enabledelayedexpansion

echo 🚀 KidCam Deployment Script
echo ============================
echo.

REM Check if git is initialized
if not exist ".git" (
  echo Initializing git repository...
  call git init
)

REM Build frontend
echo 📦 Building frontend...
cd frontend
call npm run build
if errorlevel 1 (
  echo ❌ Frontend build failed
  exit /b 1
)
cd ..

echo ✅ Frontend built successfully
echo.

REM Commit changes
echo 📝 Committing changes...
call git add .
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c-%%a-%%b)
for /f "tokens=1-2 delims=/:" %%a in ('time /t') do (set mytime=%%a:%%b)
call git commit -m "Production deployment: !mydate! !mytime!"

REM Push to GitHub
echo 🚀 Pushing to GitHub...
call git push origin main

if errorlevel 1 (
  echo ❌ Push to GitHub failed
  exit /b 1
) else (
  echo.
  echo ✅ ========================================
  echo    Deployment Started! 🎉
  echo ========================================
  echo.
  echo Next steps:
  echo 1. Check Vercel: https://vercel.com/dashboard
  echo 2. Check Render: https://dashboard.render.com
  echo 3. Wait 3-5 minutes for deployment
  echo 4. Visit: https://kidcam.com
  echo.
)

pause
