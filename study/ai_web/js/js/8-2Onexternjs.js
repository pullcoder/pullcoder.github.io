// 예제 8-2 이벤트 외부 자바스크립트
// defer 속성으로 불러오므로 HTML을 모두 읽은 뒤에 실행됩니다.
// → <h1> 요소를 찾아서 이벤트를 연결할 수 있습니다.

const title = document.querySelector("h1");

// 제목을 클릭하면 글자와 색상이 바뀜
title.addEventListener("click", function () {
    title.innerHTML = "제목을 클릭했습니다!";
    title.style.color = "tomato";
});

// 마우스를 올리면 커서 모양 변경, 벗어나면 원래대로
title.addEventListener("mouseover", function () {
    title.style.cursor = "pointer";
    title.style.backgroundColor = "#f0f0f0";
});

title.addEventListener("mouseout", function () {
    title.style.backgroundColor = "";
});

console.log("8-2Onexternjs.js 로드 완료 - 제목을 클릭해 보세요");
