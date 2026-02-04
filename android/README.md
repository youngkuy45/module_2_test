# 2048 게임 - Android 앱

웹 기반 2048 게임을 Android 앱으로 변환한 버전입니다.

## 📱 앱 정보

- **앱 이름**: 2048 게임
- **패키지명**: com.game.game2048
- **최소 SDK**: 24 (Android 7.0)
- **타겟 SDK**: 34 (Android 14)

## 🛠️ 빌드 방법

### 1. Android Studio 설치
- [Android Studio](https://developer.android.com/studio) 다운로드 및 설치

### 2. 프로젝트 열기
1. Android Studio 실행
2. "Open an Existing Project" 선택
3. `android` 폴더 선택

### 3. Gradle 동기화
- Android Studio가 자동으로 Gradle을 동기화합니다
- 처음 열 때는 시간이 걸릴 수 있습니다

### 4. 앱 실행
두 가지 방법으로 실행 가능:

**A. 에뮬레이터에서 실행**
1. AVD Manager에서 가상 기기 생성
2. 상단의 "Run" 버튼 클릭 (▶️)

**B. 실제 기기에서 실행**
1. 기기의 개발자 옵션 활성화
2. USB 디버깅 허용
3. USB로 기기 연결
4. "Run" 버튼 클릭

### 5. APK 빌드 (배포용)
```
Build > Build Bundle(s) / APK(s) > Build APK(s)
```
빌드된 APK는 `app/build/outputs/apk/debug/` 폴더에 생성됩니다.

## 📦 프로젝트 구조

```
android/
├── app/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/game/game2048/
│   │       │   └── MainActivity.kt          (메인 액티비티)
│   │       ├── res/
│   │       │   ├── layout/
│   │       │   │   └── activity_main.xml    (레이아웃)
│   │       │   ├── values/
│   │       │   │   ├── strings.xml          (문자열 리소스)
│   │       │   │   └── colors.xml           (색상 리소스)
│   │       │   └── mipmap-*/                (앱 아이콘)
│   │       ├── assets/                      (웹 파일들)
│   │       │   ├── index.html
│   │       │   ├── game.html
│   │       │   ├── css/
│   │       │   └── js/
│   │       └── AndroidManifest.xml          (앱 매니페스트)
│   ├── build.gradle                         (앱 레벨 빌드 설정)
│   └── proguard-rules.pro                   (ProGuard 규칙)
├── build.gradle                             (프로젝트 레벨 빌드 설정)
├── settings.gradle                          (프로젝트 설정)
└── gradle.properties                        (Gradle 속성)
```

## 🎯 주요 기능

- ✅ WebView 기반으로 웹 게임을 네이티브 앱처럼 실행
- ✅ LocalStorage 지원 (사용자 데이터 저장)
- ✅ 세로 모드 고정
- ✅ 뒤로 가기 버튼 지원
- ✅ 앱 상태 저장 및 복원

## ⚙️ 기술 스택

- **언어**: Kotlin
- **최소 SDK**: Android 7.0 (API 24)
- **UI**: WebView
- **빌드 도구**: Gradle 8.2.0

## 🎨 앱 아이콘 변경

기본 아이콘을 변경하려면:

1. [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html) 방문
2. 아이콘 이미지 업로드
3. 생성된 아이콘 파일들을 다음 폴더에 복사:
   - `app/src/main/res/mipmap-hdpi/`
   - `app/src/main/res/mipmap-mdpi/`
   - `app/src/main/res/mipmap-xhdpi/`
   - `app/src/main/res/mipmap-xxhdpi/`
   - `app/src/main/res/mipmap-xxxhdpi/`

## 🔧 문제 해결

### Gradle 동기화 실패
- Android Studio의 File > Invalidate Caches / Restart 실행
- Gradle 버전 확인 (8.2.0 이상 권장)

### 앱이 실행되지 않음
- AndroidManifest.xml의 권한 확인
- WebView 설정 확인
- 로그 확인 (Logcat)

### 웹 파일이 표시되지 않음
- assets 폴더에 파일이 제대로 복사되었는지 확인
- 빌드 후 재실행

## 📝 주의사항

- 이 앱은 WebView를 사용하므로 인터넷 권한이 필요합니다
- LocalStorage를 사용하여 로컬에 데이터를 저장합니다
- 세로 모드로 고정되어 있습니다 (필요시 변경 가능)

## 🚀 배포

### Google Play Store에 배포하려면:

1. **서명된 APK 생성**
   ```
   Build > Generate Signed Bundle / APK
   ```

2. **키 스토어 생성** (최초 1회)
   - Create new... 선택
   - 키 정보 입력
   - 안전한 곳에 키 파일 보관

3. **Play Console에 업로드**
   - [Google Play Console](https://play.google.com/console) 접속
   - 개발자 등록 (25달러 1회 결제)
   - 앱 생성 및 APK/AAB 업로드

## 📄 라이선스

MIT License

## 👨‍💻 개발자

2048 게임 웹 버전을 Android 앱으로 변환
