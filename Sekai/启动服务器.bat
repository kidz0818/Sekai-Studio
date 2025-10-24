@echo off
echo 正在启动本地服务器...
echo.
echo 启动后，局域网内的人可以通过以下地址访问：
echo http://您的电脑IP:8000
echo.
echo 按 Ctrl+C 停止服务器
echo.
python -m http.server 8000
pause


