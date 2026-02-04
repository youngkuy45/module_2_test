#!/usr/bin/env python3
"""
2048 게임 간단 웹 서버
핸드폰에서 접속하여 게임을 플레이할 수 있습니다.
"""

import http.server
import socketserver
import socket

# 포트 설정
PORT = 8000

# 현재 컴퓨터의 IP 주소 가져오기
def get_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # 실제 연결하지 않고 IP만 가져오기
        s.connect(('10.255.255.255', 1))
        ip = s.getsockname()[0]
    except Exception:
        ip = '127.0.0.1'
    finally:
        s.close()
    return ip

# 핸들러 설정
Handler = http.server.SimpleHTTPRequestHandler

# 서버 시작
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    ip_address = get_ip()
    print("=" * 60)
    print("🎮 2048 게임 서버가 시작되었습니다!")
    print("=" * 60)
    print(f"\n📱 핸드폰에서 접속하기:")
    print(f"\n   http://{ip_address}:{PORT}")
    print(f"\n   또는")
    print(f"\n   http://localhost:{PORT}")
    print("\n" + "=" * 60)
    print("⚠️  컴퓨터와 핸드폰이 같은 Wi-Fi에 연결되어 있어야 합니다!")
    print("=" * 60)
    print("\n종료하려면 Ctrl+C를 누르세요.\n")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n서버를 종료합니다.")
