@echo off
title Kompilacja Ninjago Club Launcher do EXE
echo ========================================================
echo   Kompilowanie Ninjago Club Launcher do pliku .EXE
echo ========================================================
echo.
echo [1/2] Sprawdzanie i instalowanie narzedzi kompilacji...
call npm.cmd install electron-builder --save-dev
if %errorlevel% neq 0 (
  echo Blad podczas pobierania electron-builder.
  pause
  exit /b %errorlevel%
)

echo.
echo [2/2] Budowanie instalatora (.exe) i wersji przenosnej w folderze dist\...
call npx.cmd electron-builder --win
if %errorlevel% neq 0 (
  echo Blad podczas budowania pliku EXE.
  pause
  exit /b %errorlevel%
)

echo.
echo ========================================================
echo   SUKCES! Gotowy plik .EXE znajduje sie w folderze: dist\
echo ========================================================
if exist "dist" (
  explorer.exe dist
)
pause
