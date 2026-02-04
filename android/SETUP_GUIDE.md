# 🚀 Android 앱 설정 가이드

2048 게임 Android 앱을 빌드하고 실행하기 위한 단계별 가이드입니다.

## 📋 필수 요구사항

### 1. Android Studio 설치

1. **다운로드**
   - https://developer.android.com/studio 방문
   - 최신 버전 다운로드 (현재 권장: Giraffe 이상)

2. **설치**
   - 다운로드한 설치 파일 실행
   - 기본 설정으로 설치 진행
   - Android SDK, Android SDK Platform, Android Virtual Device 포함

3. **초기 설정**
   - Android Studio 실행
   - SDK Components 설치 (자동으로 진행됨)
   - 약 2-3GB 다운로드 필요

### 2. JDK 설치 (Android Studio에 포함됨)

Android Studio는 JDK를 자동으로 포함하고 있습니다.
별도 설치 불필요!

## 🔧 프로젝트 설정

### 1단계: 프로젝트 열기

1. Android Studio 실행
2. 시작 화면에서 **"Open"** 클릭
3. `module_2/android` 폴더 선택
4. "OK" 클릭

### 2단계: SDK 경로 설정

프로젝트를 처음 열면 SDK 경로를 설정해야 할 수 있습니다.

**자동 설정 (권장)**
- Android Studio가 자동으로 SDK 경로를 감지합니다
- 대부분의 경우 수동 설정 불필요

**수동 설정 (필요한 경우)**
1. File > Project Structure > SDK Location
2. Android SDK location 확인
3. 일반적인 경로:
   - Windows: `C:\Users\[사용자명]\AppData\Local\Android\Sdk`
   - Mac: `/Users/[사용자명]/Library/Android/sdk`
   - Linux: `/home/[사용자명]/Android/Sdk`

### 3단계: Gradle 동기화

1. Android Studio가 자동으로 Gradle 동기화 시작
2. 하단에 "Gradle Sync" 진행 상황 표시
3. 첫 실행 시 다음 작업 수행:
   - Gradle 다운로드
   - 의존성 다운로드
   - 프로젝트 빌드
4. **약 5-10분 소요** (인터넷 속도에 따라 다름)

> ⚠️ "Gradle sync failed" 오류가 발생하면:
> - File > Invalidate Caches / Restart
> - 재시작 후 다시 시도

### 4단계: SDK 플랫폼 설치

1. Tools > SDK Manager
2. "SDK Platforms" 탭:
   - ✅ Android 14.0 (API 34) 선택
   - ✅ Android 7.0 (API 24) 선택 (최소 버전)
3. "SDK Tools" 탭:
   - ✅ Android SDK Build-Tools
   - ✅ Android Emulator
   - ✅ Android SDK Platform-Tools
4. "Apply" 클릭하여 설치

## 📱 앱 실행하기

### 방법 1: 에뮬레이터 사용 (추천)

#### 에뮬레이터 생성

1. **Device Manager 열기**
   - 상단 툴바의 "Device Manager" 아이콘 클릭
   - 또는 Tools > Device Manager

2. **새 가상 기기 생성**
   - "Create Device" 클릭
   - Phone 카테고리에서 기기 선택 (예: Pixel 6)
   - "Next" 클릭

3. **시스템 이미지 선택**
   - Recommended 탭에서 최신 버전 선택
   - 다운로드 필요하면 다운로드 아이콘 클릭
   - "Next" 클릭

4. **설정 확인**
   - AVD Name 확인 (예: Pixel_6_API_34)
   - "Finish" 클릭

#### 앱 실행

1. 상단 툴바에서 생성한 기기 선택
2. **녹색 실행 버튼 (▶️)** 클릭
3. 에뮬레이터 부팅 대기 (약 30초-1분)
4. 앱이 자동으로 설치되고 실행됨

### 방법 2: 실제 Android 기기 사용

#### 기기 설정

1. **개발자 옵션 활성화**
   - 설정 > 휴대전화 정보
   - "빌드 번호"를 7번 연속 탭
   - "개발자 옵션이 활성화되었습니다" 메시지 확인

2. **USB 디버깅 허용**
   - 설정 > 개발자 옵션
   - "USB 디버깅" 켜기

3. **기기 연결**
   - USB 케이블로 컴퓨터와 기기 연결
   - 기기에서 "USB 디버깅 허용" 팝업에 "허용" 선택

#### 앱 실행

1. Android Studio 상단에서 연결된 기기 확인
2. **녹색 실행 버튼 (▶️)** 클릭
3. 기기에 앱 설치 및 실행

## 🏗️ APK 빌드하기

### Debug APK (테스트용)

1. **메뉴에서 선택**
   - Build > Build Bundle(s) / APK(s) > Build APK(s)

2. **빌드 완료 대기**
   - 하단에 진행 상황 표시
   - "Build successful" 메시지 확인

3. **APK 위치**
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

4. **APK 설치**
   - 파일을 Android 기기로 전송
   - 파일 관리자에서 열기
   - "설치" 탭

### Release APK (배포용)

1. **키 스토어 생성** (최초 1회)
   - Build > Generate Signed Bundle / APK
   - "APK" 선택 > Next
   - "Create new..." 클릭
   - 키 정보 입력:
     - Key store path: 저장 위치 선택
     - Password: 비밀번호 (안전하게 보관!)
     - Alias: 키 별칭
     - Validity: 25년 이상 권장
     - 이름, 조직 정보 입력
   - "OK" 클릭

2. **서명된 APK 생성**
   - Build > Generate Signed Bundle / APK
   - "APK" 선택 > Next
   - 키 스토어 정보 입력
   - Build Variant: "release" 선택
   - "Finish" 클릭

3. **Release APK 위치**
   ```
   android/app/release/app-release.apk
   ```

> ⚠️ **중요**: 키 스토어 파일과 비밀번호를 안전하게 보관하세요!
> 분실하면 앱 업데이트를 할 수 없습니다.

## ❓ 문제 해결

### Gradle Sync Failed

**해결책:**
```
1. File > Invalidate Caches / Restart
2. Android Studio 재시작
3. Build > Clean Project
4. Build > Rebuild Project
```

### SDK Not Found

**해결책:**
1. File > Project Structure
2. SDK Location 확인
3. Tools > SDK Manager에서 필요한 SDK 설치

### Emulator가 시작되지 않음

**해결책:**
1. Tools > SDK Manager > SDK Tools
2. "Intel x86 Emulator Accelerator (HAXM installer)" 설치
3. 또는 ARM 기반 시스템 이미지 사용

### "Installed Build Tools revision X is corrupted"

**해결책:**
1. Tools > SDK Manager > SDK Tools
2. "Show Package Details" 체크
3. 해당 버전 Build Tools 삭제 후 재설치

### 앱이 느리게 실행됨

**해결책:**
1. 에뮬레이터의 RAM/Storage 늘리기:
   - Device Manager > 기기 우클릭 > Edit
   - Advanced Settings에서 RAM 증가 (4GB 권장)
2. 또는 실제 기기 사용

## 📚 추가 리소스

### 공식 문서
- [Android 개발자 가이드](https://developer.android.com/guide)
- [Android Studio 사용자 가이드](https://developer.android.com/studio/intro)
- [WebView 가이드](https://developer.android.com/guide/webapps/webview)

### 튜토리얼
- [Android 앱 첫 실행하기](https://developer.android.com/training/basics/firstapp)
- [Android Studio 설정](https://developer.android.com/studio/intro/studio-config)

### 커뮤니티
- [Stack Overflow - Android](https://stackoverflow.com/questions/tagged/android)
- [Android Developers Reddit](https://reddit.com/r/androiddev)

## ✅ 체크리스트

설정이 완료되었는지 확인하세요:

- [ ] Android Studio 설치 완료
- [ ] Android SDK 설치 완료
- [ ] 프로젝트 열기 성공
- [ ] Gradle 동기화 성공
- [ ] 에뮬레이터 생성 또는 실제 기기 연결
- [ ] 앱 실행 성공
- [ ] 게임이 정상적으로 표시됨

모든 항목이 체크되었다면 준비 완료! 🎉

## 💡 팁

1. **에뮬레이터는 리소스를 많이 사용**합니다
   - 다른 프로그램을 종료하고 사용하세요
   - 실제 기기 사용을 권장합니다

2. **빌드 시간 단축**
   - gradle.properties에서 병렬 빌드 활성화
   - SSD 사용 권장

3. **디버깅**
   - Logcat 창에서 로그 확인
   - chrome://inspect에서 WebView 디버깅 가능

4. **성능 최적화**
   - Release 빌드는 Debug보다 훨씬 빠릅니다
   - 테스트 시 Release APK로 확인하세요

## 🎯 다음 단계

앱이 정상적으로 실행되면:

1. 앱 아이콘 커스터마이징 (`APP_ICON_GUIDE.md` 참조)
2. 앱 이름 변경 (strings.xml)
3. 색상 테마 수정 (colors.xml)
4. Google Play Store 배포 준비
5. 사용자 피드백 수집 및 개선

즐거운 개발 되세요! 🚀
