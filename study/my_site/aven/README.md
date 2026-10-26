# Aven

> 안드로이드 AccessibilityService API와 LLM 기반 Intent Parsing 서버를 연동한 **Human-In-The-Loop(HITL) AI 스마트폰 보조 서비스**

### ✨ 한눈에 보기

| | |
| --- | --- |
| **무엇을** | 공식 API가 없는 배달 · 예약 · 쇼핑 앱의 화면 조작을 대신해 주는 AI 비서 |
| **어떻게** | 접근성 API로 화면을 읽고, AI 서버가 다음 동작을 정하고, 앱이 대신 누름 |
| **안전장치** | 사용자가 승인 카드의 **[실행]** 을 직접 눌러야 시작, 결제 직전에서 반드시 멈춤 |
| **기술** | Android(**Kotlin**) · AI 서버(Python FastAPI) · 백엔드(**Kotlin** Spring Boot) · PostgreSQL |
| **상태** | 샘플 전체 기능 구현 완료, 실기기 통합 확인 중 |

## 📑 문서 목록

| 분류 | 문서 | 내용 |
| --- | --- | --- |
| 🗺️ **계획** | [개발 계획 · 다음 할 일](docs/plan/PLAN.md) | 현재 상태, 문제점, 단계별 할 일, 결정 대기 |
| 📜 **정책 · 규제** | [접근성 서비스 API 사용 정책](docs/policy/ACCESSIBILITY_POLICY.md) | AccessibilityService API 사용 목적과 4대 준수 원칙 |
| | [개인정보 처리방침](docs/policy/PRIVACY_POLICY.md) | 개인정보 수집 · 이용 · 보관 · 파기 |
| | [서비스 이용약관](docs/policy/TERMS_OF_SERVICE.md) | 이용조건, 권리 · 의무, 책임의 한계 |
| | [제3자 서비스 상호작용 방침](docs/policy/THIRD_PARTY_POLICY.md) | 제3자 앱 UI 접근 범위와 제한 |
| | [보안 및 데이터 감사 정책](docs/policy/SECURITY_AUDIT.md) | RLS, Soft Delete, 감사 로깅 |
| | [정부 규제 대응 · 법률 부합성 보고서](docs/policy/REGULATORY_COMPLIANCE.md) | 정보통신망법 · 형법 · 개인정보보호법 검토 |
| 🛠️ **기술** | [기술 스택 및 개발 환경 명세](docs/tech/TECH_STACK.md) | 레이어별 기술, **왜 Kotlin인가**, 데이터 흐름 |
| | [WebSocket 프로토콜 명세](docs/tech/WEBSOCKET_PROTOCOL.md) | Android ↔ AI 서버 메시지 형식 |
| ▶️ **실행** | [실행 방법](docs/guide/START.md) | 서버 · 에뮬레이터 · 실기기 실행, 앱 첫 사용, 문제 해결 |

---

## 📌 1. 프로젝트 개요 (Overview)

본 프로젝트는 안드로이드 **AccessibilityService API**와 **LLM 기반 Intent Parsing 서버**를 연동하여, 배달·예약·쇼핑 등 공식 API가 제공되지 않는 제3자 모바일 앱의 화면 탐색 및 작업 입력을 대리 수행하는 AI 스마트폰 보조 서비스입니다.

스파이웨어 및 자율 매크로 오용을 방지하기 위해 **Human-In-The-Loop (HITL) 보안 아키텍처**를 적용하였으며, 구글 플레이 정책 및 정보통신망법·개인정보보호법 가이드라인을 철저히 준수합니다.

## 🛡️ 2. 핵심 보안 및 정책 준수 원칙 (Compliance & Security Rules)

### ① 백그라운드 자율 제어 전면 금지 (No Autonomous Background Actions)

- 앱이 자율적으로 판단하여 백그라운드에서 실행되는 것을 전면 차단합니다.
- 오직 사용자가 직접 음성/텍스트 명령을 입력한 시점에만 **1회성으로** 활성화됩니다.

### ② Human-In-The-Loop (HITL) 최종 승인 체계

- AI는 화면 제어 전, 명령(목표)·대상 앱·멈추는 조건을 **'승인 UI 카드'** 로 제시합니다.
- 사용자가 **[실행/승인]** 버튼을 직접 터치한 시점에만 대리 조작이 시작되며, 승인한 목표 안에서만 화면을 한 단계씩 확인하며 진행합니다 (지점·옵션 등 선택은 사용자에게 질문).
- 금융, 계정 설정 변경, 직접 결제 등 **민감 동작은 대리 실행 대상에서 전면 제외**됩니다.

### ③ 실시간 시각적 피드백 (Visual Overlay)

- Accessibility API를 통한 화면 제어 시, 화면 레이어 상에 터치 포인터 및 반투명 하이라이트 박스를 실시간 표시하여 사용자가 제어 과정을 완벽히 인지하도록 합니다.

### ④ 전면 공개 및 명시적 동의 (Prominent Disclosure)

- 최초 실행 시 접근성 권한 사용 목적과 수집하지 않는 정보를 명시하는 전면 공개 안내창을 제공합니다.
- 사용자가 안드로이드 시스템 설정에서 **직접** 권한을 부여하도록 설계합니다.

> 자세한 내용은 [접근성 서비스 API 사용 정책](docs/policy/ACCESSIBILITY_POLICY.md)을 참고하세요.

## 🏗️ 3. 시스템 아키텍처 (System Architecture)

| 구분 | 기술 스택 | 주요 역할 |
| --- | --- | --- |
| **Android Client** | Kotlin, AccessibilityService, WindowManager Overlay, Coroutines & Flow | 전면 공개, 승인 카드, 대리 클릭, Visual Overlay, 민감 화면 차단 |
| **AI Server** | Python FastAPI (WebSocket), Ollama(개발) / 커스텀 튜닝 LLM(운영) | Intent 파싱, Action Plan 생성, UI 구조 즉시 폐기 |
| **Backend** | Kotlin + Spring Boot (JPA) | 회원·SMS 인증, 작업 기록, 초기화·비활성화·탈퇴(익명화), 저장 공간 관리 |
| **Database** | PostgreSQL | JSONB, RLS, Soft Delete, Audit Trigger, 휴대폰 번호 암호화 |
| **Storage** | 오브젝트 스토리지 (개발: SeaweedFS / 운영: 클라우드) | 음성 녹음(1인 500MB), 대화 목록, 작업 오류 기록 |
| **External API** | OpenAI Whisper(STT), SMS 발송 대행 | 음성 인식, 가입 인증번호 발송 (응답 음성은 기기 내장 TTS) |

```mermaid
flowchart LR
    U([사용자]) --> A[Android Client]
    A <-->|WebSocket| P[AI Server<br/>FastAPI]
    A <-->|REST| B[Backend<br/>Spring Boot]
    P --> W[OpenAI Whisper<br/>STT]
    P --> L[LLM<br/>Ollama]
    B --> D[(PostgreSQL)]
    B --> S[(Object Storage)]
    B --> M[SMS 발송]
```

> 💡 **왜 Kotlin인가?** 안드로이드 공식 우선 언어이고, 접근성 서비스를 네이티브로 직접 다루면서 null 안전성 · 코루틴으로 "없는 버튼은 누르지 않는" 안전한 코드를 쓰기 쉽기 때문입니다. 앱과 백엔드를 같은 언어로 개발합니다.
>
> 자세한 내용은 [기술 스택 및 개발 환경 명세](docs/tech/TECH_STACK.md)를 참고하세요.

## 📂 4. 데이터베이스 구조 (Database Schema)

| 항목 | 설명 |
| --- | --- |
| **JSONB Metadata** | 확장성을 고려한 작업 명령 및 Intent 스키마 저장 |
| **Row Level Security (RLS)** | 사용자 데이터 격리 및 접근 제어 |
| **Soft Delete (`is_deleted`)** | 데이터 삭제 시 물리 삭제 대신 논리 삭제 적용 |
| **Automated Audit Trigger** | 보안 모니터링 및 감사 로그 자동 기록 (`updated_at` 및 감사 트레이스) |
| **휴대폰 번호 암호화** | AES-256-GCM 암호화 + HMAC 블라인드 인덱스(중복 가입 확인용) |
| **탈퇴 시 익명화** | 계정 정보·음성 녹음 삭제, 텍스트 기록은 `user_id`를 익명 값으로 교체 |
| **재가입 제한 해시** | 탈퇴한 번호의 HMAC 해시를 30일간 별도 보관 |

> 자세한 내용은 [보안 및 데이터 감사 정책](docs/policy/SECURITY_AUDIT.md), [개인정보 처리방침](docs/policy/PRIVACY_POLICY.md)을 참고하세요.

## 📋 5. 법적 및 규제 검토 진행 현황 (Regulatory Status)

- [x] **Google Play Developer Support**: 사전 알림(Advance Notice) 및 Accessibility API 정책 검토 요청 제출 완료
- [ ] **과학기술정보통신부 (ICT 규제샌드박스)**: 제3자 앱 UI 대리 제어 관련 정보통신망법 및 업무방해죄 저촉 여부 법리 검토 및 실증특례/임시허가 상담 접수 예정
- [ ] **개인정보보호위원회**: 화면 UI 읽기 및 입력 대리 수행 과정에서의 개인정보보호법 유권해석 문의 예정

> 자세한 내용은 [정부 규제 대응 및 법률 부합성 보고서](docs/policy/REGULATORY_COMPLIANCE.md)를 참고하세요.

## 🚀 6. 샘플 개발 로드맵 (Sample Program Milestone)

전체 기능을 샘플로 구현합니다. 이후 계획은 [PLAN.md](docs/plan/PLAN.md)에서 관리합니다.

### Phase 0. 개발 환경 구성

- [x] 저장소 구조 구성 (`android/`(앱·더미 앱), `ai-server/`, `backend/`, `infra/`)
- [x] Docker Compose로 PostgreSQL, SeaweedFS(S3 호환 오브젝트 스토리지) 실행
- [x] USB `adb reverse`로 기기 ↔ 로컬 서버 연결 (`android/connect-device.ps1`, 에뮬레이터 확인 완료 · 실기기 대기)
- [x] API 키·암호화 키를 환경 변수로 관리 (`.env`는 Git 제외)

### Phase 1. 더미 앱

- [x] 메뉴 → 장바구니 → 주문 확인 → 결제 화면으로 이어지는 배달 앱 모사 (더미 금융 앱은 2026-09-30 삭제)
- [x] 상황 설정: 화면 전환 지연, 팝업·광고, 잘못된 금액 계산, 비밀번호 입력 화면

### Phase 2. Android 접근성 & HITL

- [x] 전면 공개(Prominent Disclosure) 화면 및 접근성 설정 유도
- [x] 텍스트·음성 명령 입력 → [실행 승인 카드] 표시
- [x] 승인 시 더미 앱 대리 클릭 & Visual Overlay 표시
- [x] 결제·비밀번호·금융 화면 차단, 긴급 중단(화면 터치 / [취소])
- [x] 클릭 간격 100~500ms, 대상 요소 등장 즉시 동작
- [x] 에뮬레이터에서 동작 확인 (음성·실기기 제외)

### Phase 3. AI 서버 & WebSocket

- [x] Android ↔ Python WebSocket JSON 프로토콜 정의 ([명세](docs/tech/WEBSOCKET_PROTOCOL.md))
- [x] Ollama 기반 Intent 파싱 → Action Plan 생성, 처리 후 UI 구조 즉시 폐기 (Ollama 미실행 시 규칙 기반 플래너로 대체)
- [x] 음성 명령: 서버에서 OpenAI Whisper로 STT (실제 API 키로 연동 확인 필요)
- [x] 응답 음성: 기기 내장 TTS (Typecast 서버 TTS는 2026-10-12 삭제 — 외부 위탁 줄임)
- [x] 서버가 보낸 Action Plan을 앱에서 한 번 더 검증 (민감 동작 차단)

### Phase 4. 백엔드 & DB

- [x] JPA Entity 및 Repository 구현
- [x] RLS, Soft Delete, Audit Trigger 적용
- [x] 작업 기록 저장 (JSONB), 민감정보 미저장 확인

### Phase 5. 회원 관리

- [x] 휴대폰 SMS 인증 가입 (샘플에서는 콘솔 출력용 가짜 SMS 발송기 사용)
- [x] 1인 1계정: 휴대폰 번호 암호화 + 블라인드 인덱스로 중복 가입 차단
- [x] 초기화 / 비활성화 / 탈퇴(익명화) 구현
- [x] 탈퇴 후 30일 재가입 제한 및 만료 해시 자동 삭제

### Phase 6. 개인 저장 공간

- [x] 음성 녹음·대화 목록·작업 오류 기록 저장 및 조회
- [x] 음성 1인 500MB 용량 제한 (서버 측 확인), 90% 알림, 초과 시 오래된 녹음 자동 삭제
- [x] 서명된 URL로 파일 제공, 사용자 간 접근 차단

### Phase 7. 실기기 통합 확인

- [ ] 전체 흐름(가입 → 명령 → 승인 → 대리 클릭 → 기록 저장) 실기기 확인

---

## 🧰 7. 개발 환경 실행 (Getting Started)

**필요 도구**: Docker Desktop, Python 3.12, JDK 17, Android Studio

```bash
# 1) 비밀 값 준비: .env.example을 .env로 복사하고 키 생성 명령으로 값을 채운다
cp .env.example .env

# 2) PostgreSQL(5433) + S3 저장소(8333) 실행
docker compose up -d

# 3) 백엔드 (http://localhost:8080) — 첫 실행 시 DB 마이그레이션 자동 적용
cd backend && ./gradlew bootRun

# 4) AI 서버 (ws://localhost:8000/ws)
cd ai-server
python -m venv .venv && .venv/Scripts/pip install -r requirements.txt
.venv/Scripts/python -m uvicorn app.main:_app_factory --factory --port 8000
```

> 개발 중에는 SMS 인증번호가 실제로 발송되지 않고 **백엔드 콘솔에 출력**됩니다 (`[DEV SMS]`).
>
> 단계별 설명과 문제 해결은 [실행 방법](docs/guide/START.md)에 있습니다.
