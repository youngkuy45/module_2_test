@echo off
chcp 65001 >nul
cls

echo ═══════════════════════════════════════════════════════════
echo     🎮 2048 게임 서버 시작
echo ═══════════════════════════════════════════════════════════
echo.
echo 서버를 시작하는 중...
echo.

:: Python 버전 확인
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python이 설치되어 있지 않습니다.
    echo.
    echo Python 다운로드: https://www.python.org/downloads/
    echo.
    pause
    exit /b 1
)

:: IP 주소 확인
echo 📡 IP 주소 확인 중...
echo.
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    set IP=%%a
    goto :found
)

:found
:: 공백 제거
set IP=%IP: =%

echo ═══════════════════════════════════════════════════════════
echo.
echo ✅ 서버가 시작되었습니다!
echo.
echo 📱 핸드폰에서 다음 주소로 접속하세요:
echo.
echo    http://%IP%:8000
echo.
echo ⚠️  주의: 컴퓨터와 핸드폰이 같은 Wi-Fi에 연결되어 있어야 합니다!
echo.
echo ═══════════════════════════════════════════════════════════
echo.
echo 종료하려면 Ctrl+C를 누르세요.
echo.

:: Python 서버 시작
python simple_server.py

if errorlevel 1 (
    echo.
    echo Python 서버가 실패했습니다. 대체 방법을 시도합니다...
    echo.
    python -m http.server 8000
)

pause
