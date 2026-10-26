# ▶️ 실행 방법 (Getting Started)

> Windows PC에서 서버 3종(DB · 저장소, 백엔드, AI 서버)을 켜고, 에뮬레이터 또는 실제 폰에서 Aven 앱을 사용하는 방법입니다.
> 명령어는 **저장소 루트** 기준, Git Bash 기준입니다. PowerShell 전용 명령은 따로 표시했습니다.

### ⏱️ 요약 — 매번 실행하는 순서

| 순서 | 할 일 | 확인 |
| :---: | --- | --- |
| 1 | Docker Desktop 실행 → `docker compose up -d` | postgres `healthy` |
| 2 | 백엔드 `./gradlew bootRun` | `Started AvenApplicationKt` |
| 3 | AI 서버 `uvicorn …` | `/health` → `ok` |
| 4 | 에뮬레이터 켜기 또는 폰 연결 | `adb devices` |
| 5 | `connect-device.ps1` 실행 | 앱에서 서버 연결됨 |

[← 문서 목록으로](../../README.md)

---

## 📑 목차

1. [준비물](#1-준비물)
2. [처음 한 번만 하는 설정](#2-처음-한-번만-하는-설정)
3. [매번 실행하는 순서](#3-매번-실행하는-순서)
4. [앱 처음 사용하기](#4-앱-처음-사용하기)
5. [종료하기](#5-종료하기)
6. [문제 해결](#6-문제-해결)

---

## 1. 준비물

| 도구 | 용도 | 확인 명령 |
| --- | --- | --- |
| Docker Desktop | PostgreSQL, S3 저장소 | `docker info` |
| Python 3.12 | AI 서버 | `python --version` |
| JDK 17 | 백엔드·Android 빌드 | `~/.gradle/gradle.properties`의 `org.gradle.java.home` |
| Android Studio | SDK, 에뮬레이터 | `%LOCALAPPDATA%\Android\Sdk` 존재 |

> ⚠️ Gradle 8.9는 JDK 22까지만 지원합니다. JDK 17을 설치하고 `JAVA_HOME`을 지정하거나 `~/.gradle/gradle.properties`의 `org.gradle.java.home`에 경로를 적으세요 (PC마다 경로가 다릅니다).

선택 사항:

| 항목 | 없을 때 동작 |
| --- | --- |
| Ollama (LLM) | 대화는 짧은 규칙 답장, 실행은 레시피가 있는 앱(더미 배달)만 |
| OpenAI API 키 | 음성 명령 불가, 텍스트 명령만 사용 |

---

## 2. 처음 한 번만 하는 설정

### 2-1. 비밀 값 파일 (`.env`)

이미 `.env`가 있으면 건너뜁니다.

```bash
cp .env.example .env
# 아래 명령으로 키를 3번 생성해 JWT_SECRET, PHONE_ENC_KEY, PHONE_HMAC_KEY 에 넣고,
# 비밀번호 항목(POSTGRES_*_PASSWORD, S3_SECRET_KEY)도 임의 값으로 바꾼다
python -c "import secrets,base64;print(base64.b64encode(secrets.token_bytes(32)).decode())"
```

선택 항목: `OPENAI_API_KEY`(음성), `OLLAMA_URL`·`OLLAMA_MODEL`(대화·galaxy 빌드 AI 실행), `CLOUD_LLM_*`, `SLOT_LLM`

> `.env`는 Git에 올라가지 않습니다. 키를 잃어버리면 기존 DB의 휴대폰 번호를 복호화할 수 없으니 따로 보관하세요.

### 2-2. AI 서버 가상환경

```bash
cd ai-server
python -m venv .venv
.venv/Scripts/pip install -r requirements.txt
cd ..
```

### 2-3. Android 앱 설치

에뮬레이터를 켜거나 폰을 연결한 상태에서([3-4](#3-4-에뮬레이터-또는-폰-연결)):

```bash
cd android
./gradlew installGalaxyDebug :dummy:installDebug   # Aven(갤럭시 스토어 빌드), 더미 배달 설치 (더미 배달은 개발용)
cd ..
```

---

## 3. 매번 실행하는 순서

터미널을 여러 개 열어 두고 진행하면 편합니다.

### 3-1. Docker Desktop 실행 → DB·저장소 켜기

Docker Desktop을 먼저 실행한 뒤:

```bash
docker compose up -d
docker compose ps          # postgres: healthy, s3: Up 확인
```

| 서비스 | 주소 |
| --- | --- |
| PostgreSQL | `localhost:5433` (기본 5432와 겹치지 않도록) |
| S3 저장소 (SeaweedFS) | `http://localhost:8333` |

### 3-2. 백엔드 (터미널 1)

```bash
cd backend
./gradlew bootRun
```

`Started AvenApplicationKt` 가 보이면 준비 완료 → `http://localhost:8080`
첫 실행 시 DB 테이블이 자동으로 만들어집니다.

> 📌 **SMS 인증번호는 이 터미널에 출력됩니다.** `[DEV SMS] to=010-****-1234 message=[Aven] 인증번호 [123456]`

### 3-3. AI 서버 (터미널 2)

```bash
cd ai-server
.venv/Scripts/python -m uvicorn app.main:_app_factory --factory --host 127.0.0.1 --port 8000
```

확인: `curl http://localhost:8000/health` → `{"status":"ok"}`

> AI 서버는 앱이 연결할 때마다 **백엔드에 계정 상태를 물어봅니다**. 백엔드(3-2)가 꺼져 있으면 모든 연결을 거부합니다 (주소: `.env`의 `BACKEND_URL`, 기본 `http://localhost:8080`).

### 3-4. 에뮬레이터 또는 폰 연결

**에뮬레이터**

- Android Studio → Device Manager → `jarvis_api35` ▶
- 또는 명령으로:

```bash
"$LOCALAPPDATA/Android/Sdk/emulator/emulator.exe" -avd jarvis_api35 &
```

**실제 폰**

1. 설정 → 휴대전화 정보 → **빌드 번호 7번 탭** → 개발자 옵션 → **USB 디버깅** 켜기
2. USB로 연결 → 폰에 뜨는 **"USB 디버깅 허용"** 누르기
3. 확인: `"$LOCALAPPDATA/Android/Sdk/platform-tools/adb" devices` 에 기기가 보이면 성공

### 3-5. 기기 ↔ PC 서버 연결 (PowerShell)

```powershell
powershell -ExecutionPolicy Bypass -File android\connect-device.ps1
```

기기의 `localhost:8080 / 8000 / 8333`이 USB를 통해 PC 서버로 연결됩니다.

> 🔁 **에뮬레이터를 재시작하거나 폰을 다시 꽂으면 이 스크립트를 다시 실행**해야 합니다.

---

## 4. 앱 처음 사용하기

| 순서 | 화면 | 할 일 |
| :---: | --- | --- |
| 1 | 접근성 권한 안내 | 내용 확인 → **동의하고 접근성 설정 열기** |
| 2 | 안드로이드 접근성 설정 | **Aven** → **Use Aven** 켜기 → **Allow** |
| 3 | Aven 앱으로 돌아오기 | 휴대폰 인증 화면이 뜸 |
| 4 | 휴대폰 인증 | 번호 입력 → **인증번호 받기** → 백엔드 터미널의 `[DEV SMS]` 번호 입력 → **인증 확인** |
| 5 | 가입 | 처음이면 이메일 입력 → **가입하기** |
| 6 | 메인 | 마이크를 누르고 "더미 배달에서 행복분식 김밥 장바구니에 담아줘" 말하기 (또는 직접 입력 → **보내기**). 명령 속 앱 이름으로 대상 앱을 찾음 |
| 7 | 승인 카드 | 계획을 확인하고 **[실행]** → 파란 하이라이트·빨간 포인터와 함께 자동 실행 |

### 해 볼 만한 명령

| 명령 / 동작 | 기대 결과 |
| --- | --- |
| `더미 배달에서 행복분식 김밥 장바구니에 담아줘` | 행복분식 → 김밥 → 장바구니 담기 |
| `더미 배달에서 행복분식 떡볶이 담아줘` | 맵기를 선택 카드로 물어본 뒤 담기 |
| `더미 배달에서 더미피자 불고기 피자 라지로 담아줘` | 지점 질문 → 스크롤 → 라지 선택 → 담기 (레시피) |
| `행복분식 김밥 담고 주문하고 결제까지 해줘` | 주문하기 화면에서 멈추고 "결제는 직접" 안내 |
| `계정 비밀번호 바꿔줘` | 거부 |
| 실행 중 화면 아무 곳 터치 | 즉시 중단 |
| 더미 배달 앱 홈 맨 아래 → **설정** | 로딩 지연·광고 팝업·금액 오류·주문 시 로그인 요구·비밀번호 화면 시나리오 |

대화와 결과는 메인 **채팅 화면**에 쌓이고(말풍선을 누르면 실행한 단계), 녹음·오류 기록은 오른쪽 위 **보관함**, 계정 관리(초기화·비활성화·탈퇴)는 **설정**에서 확인합니다.


---

## 5. 종료하기

| 대상 | 방법 |
| --- | --- |
| 백엔드, AI 서버 | 각 터미널에서 `Ctrl + C` |
| 에뮬레이터 | 창 닫기 |
| DB·저장소 | `docker compose down` (데이터는 유지) |
| DB·저장소 데이터까지 삭제 | `docker compose down -v` ⚠️ 가입 정보·기록·녹음이 모두 지워짐 |

터미널을 닫아 버려 서버가 남아 있을 때 (PowerShell):

```powershell
foreach ($p in 8080, 8000) { Get-NetTCPConnection -LocalPort $p -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force } }
```

---

## 6. 문제 해결

| 증상 | 원인 · 해결 |
| --- | --- |
| `docker compose up`에서 `port is already allocated` | 5433 또는 8333을 다른 프로그램이 사용 중 → `.env`의 `POSTGRES_PORT` 변경 |
| 백엔드: `Port 8080 was already in use` | 다른 프로그램이 8080 사용 중 → `SERVER_PORT=8081 ./gradlew bootRun`, `.env`에 `BACKEND_URL=http://localhost:8081`, 기기는 `adb reverse tcp:8080 tcp:8081` |
| 백엔드가 DB 연결 실패 | Docker Desktop과 `docker compose up -d`가 먼저 실행됐는지 확인 |
| 앱: "서버에 연결할 수 없습니다" | `connect-device.ps1`을 다시 실행 (에뮬레이터 재시작·폰 재연결 후 필수) |
| 앱: "접근성 서비스가 꺼져 있습니다" | 설정 → 접근성 → Aven 켜기. 앱을 새로 설치한 직후라면 몇 초 기다리기 |
| 앱: "인증이 만료되었습니다" | 설정 · 계정 → 로그아웃 후 다시 로그인 |
| 인증번호가 안 옴 | 실제 SMS는 발송되지 않음 → **백엔드 터미널의 `[DEV SMS]`** 확인 |
| "잠시 후 다시 요청해 주세요" | SMS는 같은 번호로 1분에 1번, 하루 5번까지 |
| 승인 카드가 뜨기까지 느림 | Ollama를 켜지 않았다면 첫 요청만 1초 정도 더 걸림 (이후 60초간 건너뜀) |
| 음성 명령: "음성 인식을 사용할 수 없습니다" | `.env`에 `OPENAI_API_KEY` 입력 후 AI 서버 재시작 |
| 녹음 재생 실패 | `connect-device.ps1`로 8333 포트가 연결됐는지 확인, `.env`의 `S3_PUBLIC_ENDPOINT`는 비워 둠 |
| `pip install`에서 `cp949` 오류 | `requirements.txt`에 한글이 들어갔는지 확인 (영문 주석만 사용) |
| 폰 LAN(Wi-Fi)으로 직접 연결이 안 됨 | 방화벽 설정에 따라 막힐 수 있음 → USB + `connect-device.ps1` 사용 |
