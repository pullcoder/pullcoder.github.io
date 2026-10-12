# 예제 8-6 출력문 (8-6Output.html) 동작 방식

JavaScript로 화면(또는 개발자 도구)에 값을 출력하는 **4가지 방법**을 한 페이지에서 비교하는 예제입니다.

## 전체 코드 구조

```html
<body>
<h1>JavaScript Output</h1>
<p id="output"></p>
    <script>
        document.write("outPut1:write");
        document.getElementById("output").innerHTML = "outPut2:innerHTML";
        window.alert("outPut3:alert");
        console.log("outPut4:console");
    </script>
</body>
```

- `<h1>` : 제목 표시
- `<p id="output">` : 비어 있는 문단. 뒤에서 `innerHTML`로 내용을 채울 **자리(타깃)** 입니다.
- `<script>` : `<body>` 맨 아래에 있으므로, 위의 `<h1>`, `<p>`가 이미 만들어진 뒤에 실행됩니다.

## 실행 순서 (위에서 아래로 한 줄씩)

| 순서 | 코드 | 출력 위치 | 결과 |
|---|---|---|---|
| 1 | `document.write("outPut1:write")` | 문서(HTML) 본문 | `<script>` 태그가 있는 위치(= `<p>` 아래)에 글자가 그대로 삽입됨 |
| 2 | `document.getElementById("output").innerHTML = ...` | `id="output"` 요소 내부 | 비어 있던 `<p>` 안에 `outPut2:innerHTML` 표시 |
| 3 | `window.alert("outPut3:alert")` | 브라우저 팝업창 | 경고창이 뜨고, **확인을 누를 때까지 다음 코드 실행이 멈춤** |
| 4 | `console.log("outPut4:console")` | 개발자 도구(F12) → Console 탭 | 화면에는 안 보이고 콘솔에만 찍힘 |

### 최종 화면 모습

```
JavaScript Output          ← <h1>
outPut2:innerHTML          ← <p id="output"> (innerHTML)
outPut1:write              ← document.write 가 script 위치에 삽입
```

> 코드상으로는 `write`가 먼저 실행되지만, 화면에서는 `innerHTML` 내용이 위에 보입니다.
> `<p id="output">`가 `<script>`보다 위에 있고, `document.write`는 **스크립트가 있는 위치**에 글을 넣기 때문입니다.

## 각 방법 정리

### 1. `document.write()`
- HTML 문서가 **읽히는 도중**에 그 자리에 문자열(HTML 포함)을 끼워 넣습니다.
- 주의: 페이지 로드가 끝난 뒤(예: 버튼 클릭 시) 호출하면 **기존 문서 전체가 지워지고** 새 내용으로 덮어씁니다. 학습·테스트용으로만 사용합니다.

### 2. `innerHTML`
- `document.getElementById("아이디")`로 요소를 찾은 뒤, 그 요소 **안쪽 내용**을 바꿉니다.
- HTML 태그도 해석됩니다. (예: `"<b>굵게</b>"` → 굵은 글씨)
- 실무에서 가장 많이 쓰는 화면 출력 방식입니다. (태그 해석이 필요 없으면 `textContent` 사용)
- 해당 요소가 스크립트보다 **먼저** 만들어져 있어야 합니다. 스크립트를 `<head>`에 두면 요소를 못 찾아 에러(`null`)가 납니다.

### 3. `window.alert()`
- 메시지를 팝업창으로 띄웁니다. `window.`는 생략 가능 → `alert("...")`
- 확인 버튼을 누르기 전까지 페이지가 멈춥니다(블로킹).

### 4. `console.log()`
- 개발자 도구 콘솔에만 출력되는 **디버깅용** 출력입니다.
- 변수 값 확인, 코드가 어디까지 실행됐는지 확인할 때 사용합니다.

## 확인 방법

1. 브라우저로 `8-6Output.html` 열기
2. `outPut3:alert` 팝업 → **확인** 클릭
3. 화면에서 `outPut2:innerHTML`, `outPut1:write` 확인
4. `F12` → **Console** 탭에서 `outPut4:console` 확인
