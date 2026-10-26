# 🔌 WebSocket 프로토콜 명세 (Android ↔ AI Server)

> Android 앱과 Python AI 서버가 주고받는 메시지 형식을 정의합니다. 모든 메시지는 UTF-8 JSON 텍스트 프레임이며, **요청 하나에 응답 하나**입니다.

[← 문서 목록으로](../../README.md)

### ⚡ 메시지 한눈에 보기

| 방향 | 메시지 | 용도 |
| --- | --- | --- |
| 앱 → 서버 | `chat` | 일반 대화 (기본) |
| | `transcribe` | 음성을 텍스트로 |
| | `task` | 목표 확인 → 승인 카드 |
| | `step` | 현재 화면을 보내고 다음 동작 하나 받기 |
| 서버 → 앱 | `chat_reply` · `transcript` · `task_plan` | 대화 답장 · 변환 결과 · 승인 요약 |
| | `next_action` · `ask` | 다음 동작 · 사용자에게 선택 질문 |
| | `done` · `rejected` · `error` | 완료 · 거부 · 오류 |

---

## 1. 연결

| 항목 | 내용 |
| --- | --- |
| **URL** | `wss://<서버>/ws` (개발: `ws://localhost:8000/ws`, 기기는 USB `adb reverse`) |
| **인증** | 핸드셰이크 헤더 `Authorization: Bearer <JWT>` — 백엔드가 발급한 토큰 |
| **거부 조건** | 토큰 없음·서명 불일치·만료, 또는 **백엔드에 물어본 계정의 현재 상태가 활성이 아님**(비활성화·탈퇴) → close code `4401` |

AI 서버는 연결마다 백엔드 `GET /api/account`로 계정 상태를 확인하고, 활성 확인 결과만 60초 기억합니다. 백엔드에 연결할 수 없으면 거부합니다.

## 2. 공통 규칙

- 모든 요청에는 앱이 생성한 `request_id`(UUID)가 있으며, 응답은 같은 `request_id`를 돌려줍니다. 앱은 **자신이 보낸 `request_id`의 응답만** 처리합니다.
- 서버는 `screen`(화면 UI 구조)을 다음 동작을 정한 직후 폐기하며 로그에 남기지 않습니다.
- 화면은 **사용자가 승인한 뒤의 `step`에서만** 보냅니다. `chat`·`task`에는 화면이 없습니다.

## 3. 흐름

```
chat ──(intent=task)──▶ 앱이 대상 앱 열기 ──▶ task(패키지명만) ──▶ 승인 카드 [실행]
     ──▶ step(현재 화면) ⇄ next_action / ask … ──▶ done / rejected
```

## 4. 앱 → 서버

### `chat` — 일반 대화 (기본)

```json
{ "type": "chat", "request_id": "…", "text": "오늘 날씨 어때?", "app": "날씨",
  "history": [{ "role": "user", "text": "안녕" }, { "role": "aven", "text": "안녕하세요!" }] }
```

- `app`: 말 속에서 **폰 안에서** 찾은 설치 앱 이름 하나 (없으면 `null`). 앱 목록은 보내지 않습니다.
- `history`: 최근 10개까지. 서버는 저장하지 않고 로그에는 `request_id`·`planner`·`intent`만 남깁니다.
- `follow_up`: 직전에 서버가 **실행 전 질문**을 했으면 받은 `{goal, app}`을 그대로 돌려줍니다 (이번 `text`가 그 답). 서버는 대화를 저장하지 않으므로 앱이 들고 있습니다.

**실행 전 질문**: 레시피가 있는 앱인데 명령에 가게·메뉴로 볼 낱말이 없으면(카테고리뿐이거나 없음, 예: "더미 배달에서 피자 시켜줘") 실행하지 않고 `chat_reply`(`intent: reply`)로 묻고 `follow_up`을 줍니다. 답이 오면 `답 + 원래 명령`으로 `intent: task`와 `goal`·`app`을 돌려주고, 앱은 그 `goal`로 실행합니다. 답이 '취소·그만·아니…'면 하지 않습니다.

### `transcribe` — 음성만 텍스트로 변환

```json
{ "type": "transcribe", "request_id": "…", "input": { "kind": "audio", "format": "m4a", "data_b64": "…" } }
```

응답은 `transcript` 또는 `error`(`STT_UNAVAILABLE`, `INPUT_TOO_LARGE`) — 최대 5MB.

### `task` — 목표 확인 (승인 카드용)

```json
{ "type": "task", "request_id": "…", "goal": "더미 배달에서 김밥 담아줘", "package": "com.aven.dummy", "app_version": 12, "mode": "recipe" }
```

| 필드 | 설명 |
| --- | --- |
| `package`, `app_version` | 대상 앱 패키지명과 versionCode. **화면은 보내지 않음** (승인 전에는 화면을 읽지 않음) |
| `mode` | `recipe`(기본, Google Play 빌드) · `agent`(갤럭시 스토어 빌드) |

응답: `task_plan` 또는 `rejected` — 계정 변경 명령(`SENSITIVE_ACTION`), 금융·대화·사진·연락처 앱(`SENSITIVE_SCREEN`), 이 빌드로 실행할 수 없는 앱이나 레시피가 지원하지 않는 버전(`UNSUPPORTED`).

### `step` — 다음 동작 하나

```json
{ "type": "step", "request_id": "…", "goal": "…", "history": ["'행복분식' 누르기", "사용자 선택: 보통맛"],
  "screen": { "package": "com.aven.dummy", "app_version": 12, "nodes": [ … ] }, "mode": "recipe" }
```

| 필드 | 설명 |
| --- | --- |
| `history` | 지금까지 한 동작의 설명과 사용자 선택 (최대 20개) |
| `screen.nodes[]` | `id, text, desc, view_id, class_name, clickable, editable, bounds`, 체크박스·라디오만 `checked`, 누를 수 있는 줄 안의 글자는 `in_clickable: true`. 비밀번호 필드는 앱에서 제외. 최대 500개 |

**다음 동작을 정하는 순서**

1. 그 앱의 **레시피**(`ai-server/recipes/<패키지>.json`, 사람이 작성한 고정 규칙)가 있으면 레시피로 정합니다 (`planner: recipe`).
2. `mode: agent`일 때만, 레시피가 없거나 레시피가 **할 일을 찾지 못한** 화면에서 로컬 LLM → 클라우드 LLM 순서로 정합니다 (`llm-local`·`llm-cloud`). 레시피가 안전 때문에 일부러 멈춘 경우는 넘기지 않습니다.
3. 결과가 결제·주문 확정 등 **민감 동작**이거나 레시피의 `stop_before`에 해당하면 실행하지 않습니다. 명령이 주문·결제를 시킨 경우에만 `done` + `notice`(결제 직전까지 옴)이고, 담기·보기만 시킨 명령이면 엉뚱한 곳에 온 것이므로 `rejected`(`SENSITIVE_ACTION`)로 끝냅니다 — **성공으로 보고하지 않습니다**.
4. 요청하지 않은 삭제·비우기·취소 버튼(예: '삭제하고 담기')은 누르지 않고 `rejected`(`UNREQUESTED_ACTION`)로 끝냅니다. 명령에 '삭제·비워·취소' 등이 있을 때만 허용합니다.
5. LLM 결과의 `description`은 모델이 쓴 문장이 아니라 실제로 누르는 요소로 서버가 만듭니다(`'김밥' 누르기`). 이미 누른 버튼을 다시 누르려 하면(수량 +·− 제외) 쓸 수 없는 답으로 봅니다. LLM의 `done`은 결과를 확인할 수 없으므로 메시지에 "화면에서 직접 확인해 주세요"를 붙입니다.

Google Play는 접근성 API로 스스로 계획·실행하는 것을 금지하므로 `recipe` 모드는 LLM으로 동작을 정하지 않습니다.

## 5. 서버 → 앱

```json
{ "type": "chat_reply", "request_id": "…", "intent": "reply", "text": "실시간 날씨는 확인할 수 없어요.", "planner": "llm-local" }
{ "type": "chat_reply", "request_id": "…", "intent": "reply", "text": "어느 가게의 어떤 메뉴로 할까요?", "planner": "recipe", "follow_up": { "goal": "더미 배달에서 피자 시켜줘", "app": "더미 배달" } }
{ "type": "chat_reply", "request_id": "…", "intent": "task", "text": null, "planner": "rule", "goal": "더미피자 불고기 피자 더미 배달에서 피자 시켜줘", "app": "더미 배달" }
{ "type": "transcript", "request_id": "…", "text": "더미 배달에서 김밥 담아줘" }
{ "type": "task_plan", "request_id": "…", "summary": "더미 배달에서 김밥 담아줘", "notice": null }
{ "type": "next_action", "request_id": "…", "planner": "recipe",
  "step": { "index": 1, "action": "click", "target": { "node_id": "n14", "view_id": "com.aven.dummy:id/menu_item", "text": "김밥" }, "value": null, "description": "'김밥' 누르기" } }
{ "type": "ask", "request_id": "…", "question": "어느 지점으로 할까요?", "options": ["더미피자 강남점", "더미피자 역삼점"], "planner": "recipe" }
{ "type": "done", "request_id": "…", "message": "장바구니에 담았습니다.", "notice": null, "planner": "recipe" }
{ "type": "done", "request_id": "…", "message": "결제 직전에서 멈췄습니다. 주문 내역: 후라이드치킨 (한마리) x1 18,000원 · 결제 금액 21,000원", "notice": "결제·주문 확정은 직접 진행해 주세요. …", "planner": "recipe" }
{ "type": "rejected", "request_id": "…", "reason_code": "SENSITIVE_ACTION", "message": "계정·비밀번호 변경은 직접 진행해 주세요." }
{ "type": "error", "request_id": "…", "code": "STT_UNAVAILABLE", "message": "음성 인식을 사용할 수 없습니다. 텍스트로 입력해 주세요." }
```

| 항목 | 설명 |
| --- | --- |
| `chat_reply.intent` | `reply`: 답장만 (다른 앱으로 전환하지 않음) · `task`: `app`이 있고 그 앱에서 할 일을 시킨 경우만 → 앱이 `task`로 진행 |
| `next_action.step.action` | `click`, `set_text`, `submit`(키보드 검색·완료), `scroll_forward`, `scroll_backward`. 좌표 터치는 없음 |
| `next_action.step.target.node_id` | 보낸 화면의 요소 id. 같은 글자의 버튼이 여럿일 수 있어 앱은 그 요소의 **위치**로 먼저 찾고, 없으면 글자로 찾음 |
| `rejected.reason_code` | `SENSITIVE_ACTION` · `SENSITIVE_SCREEN` · `UNSUPPORTED` · `UNREQUESTED_ACTION`(요청하지 않은 삭제·취소) |
| `error.code` | `INVALID_MESSAGE` · `INPUT_TOO_LARGE` · `STT_UNAVAILABLE` · `PLANNER_FAILED` |

## 6. 민감 동작 처리 (서버·앱 이중 차단)

| 상황 | 서버 | 앱 |
| --- | --- | --- |
| 명령이 계정·비밀번호 변경 | `rejected` (`SENSITIVE_ACTION`) | — |
| 금융·대화·메일·사진·연락처·설정 앱 | `rejected` (`SENSITIVE_SCREEN`) | 앱을 열기 전에 거부 (소셜 분류 앱 포함) |
| 결제·송금·인증 버튼, 금액이 붙은 주문·구매 버튼, 레시피의 `stop_before` | 실행하지 않음. 주문을 시킨 명령이면 `done` + `notice`, 아니면 `rejected` | 받은 동작을 다시 검사, 해당하면 멈춤 |
| 요청하지 않은 삭제·비우기·취소 버튼 | `rejected` (`UNREQUESTED_ACTION`) | (앱 쪽 재검사는 추가 예정) |
| 비밀번호 입력 화면 (로그인 등) | — | 화면을 보내지 않고 **사용자가 직접 입력**하기를 기다림. 위쪽 카드의 [계속]을 실제로 누르면 이어서 진행, [취소]·5분·3번 넘으면 멈춤 |

> 예전 `command` → `action_plan`(첫 화면만 보고 LLM이 계획 전체를 만드는 방식)과 서버 TTS(`tts`)는 삭제했습니다.
