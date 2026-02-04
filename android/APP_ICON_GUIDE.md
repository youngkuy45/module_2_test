# 📱 앱 아이콘 추가 가이드

현재 프로젝트에는 기본 Android 아이콘이 설정되어 있습니다.
커스텀 아이콘을 추가하려면 아래 방법을 따라주세요.

## 🎨 방법 1: Android Asset Studio 사용 (권장)

### 단계:

1. **아이콘 이미지 준비**
   - 정사각형 이미지 (권장: 1024x1024px)
   - 배경이 투명한 PNG 또는 일반 이미지

2. **Android Asset Studio 접속**
   - 웹사이트: https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html

3. **아이콘 생성**
   - Source에서 이미지 업로드
   - 설정 조정 (패딩, 배경색 등)
   - "Download" 클릭

4. **파일 복사**
   - 다운로드된 zip 파일 압축 해제
   - 각 해상도별 폴더의 파일들을 다음 위치에 복사:
     ```
     android/app/src/main/res/mipmap-hdpi/ic_launcher.png
     android/app/src/main/res/mipmap-mdpi/ic_launcher.png
     android/app/src/main/res/mipmap-xhdpi/ic_launcher.png
     android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png
     android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png
     ```

5. **둥근 아이콘도 복사**
   ```
   ic_launcher_round.png (각 해상도별)
   ```

## 🎨 방법 2: Android Studio 사용

1. **Android Studio에서 프로젝트 열기**

2. **Image Asset Studio 실행**
   - 프로젝트 탐색기에서 `app` 폴더 우클릭
   - New > Image Asset 선택

3. **아이콘 설정**
   - Icon Type: Launcher Icons (Adaptive and Legacy)
   - Path에서 이미지 선택
   - 미리보기 확인

4. **Next > Finish** 클릭
   - 자동으로 모든 해상도의 아이콘이 생성됩니다

## 📐 아이콘 크기 가이드

| 해상도 | 크기 | 폴더 |
|--------|------|------|
| ldpi | 36x36 | mipmap-ldpi |
| mdpi | 48x48 | mipmap-mdpi |
| hdpi | 72x72 | mipmap-hdpi |
| xhdpi | 96x96 | mipmap-xhdpi |
| xxhdpi | 144x144 | mipmap-xxhdpi |
| xxxhdpi | 192x192 | mipmap-xxxhdpi |

## 🎯 2048 게임 아이콘 제안

게임 아이콘으로 다음을 추천합니다:

1. **2048 숫자 타일**
   - 황금색 배경에 "2048" 숫자
   - 게임을 대표하는 아이콘

2. **게임 보드**
   - 4x4 그리드 모양
   - 여러 숫자 타일이 있는 보드

3. **심플한 디자인**
   - 보라색 그라데이션 배경 (#667eea → #764ba2)
   - 중앙에 "2048" 또는 큰 숫자 타일

## ⚠️ 주의사항

- 아이콘 파일명은 반드시 `ic_launcher.png`와 `ic_launcher_round.png`여야 합니다
- 모든 해상도의 아이콘을 제공하는 것이 좋습니다
- Android 8.0 이상에서는 Adaptive Icon을 지원합니다
- 아이콘 변경 후 Clean Project 후 재빌드 권장

## 🔍 확인 방법

1. Android Studio에서 빌드
2. 에뮬레이터 또는 실제 기기에 설치
3. 앱 목록에서 아이콘 확인

## 💡 온라인 아이콘 생성 도구

- **Android Asset Studio**: https://romannurik.github.io/AndroidAssetStudio/
- **App Icon Generator**: https://appicon.co/
- **Canva**: https://www.canva.com/ (디자인 생성)
- **Figma**: https://www.figma.com/ (디자인 생성)

## 📝 예제: 간단한 2048 아이콘 디자인

```
배경: 보라색 그라데이션 (#667eea → #764ba2)
중앙: 흰색 "2048" 텍스트
모서리: 둥근 모서리 (8dp)
```

이런 디자인은 Canva나 Figma에서 5분 안에 만들 수 있습니다!
