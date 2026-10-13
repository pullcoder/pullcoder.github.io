/**
 * header.js — 사이트 공통 헤더 + 예제 목록 관리
 *
 * [사용법]  어느 페이지든 <head> 안에 한 줄만 추가하면 됩니다.
 *           <script src="(상대경로)/header.js" defer></script>
 *           경로(base)는 이 스크립트 위치로 자동 계산합니다.
 *
 * [예제 추가]  새 예제 파일을 만들면 아래 SITE.sections 의 items 에 한 줄만 추가하세요.
 *              → 목록 페이지, 브레드크럼, 이전/다음 버튼에 자동 반영됩니다.
 *
 * [구조]
 *   - 헤더는 Shadow DOM 안에 그려서 예제 페이지의 CSS(header, nav, a, div 등)와 서로 간섭하지 않습니다.
 *   - 헤더는 <body> 바깥(<html> 바로 아래)에 삽입되어 body 의 margin/position 예제에도 영향을 주지 않습니다.
 */
(function () {
    'use strict';

    // ===================================================================
    // 1. 사이트 데이터 (manifest)
    // ===================================================================
    var SITE = {
        name: 'pullcoder',
        home: 'index.html',
        mainSite: '../../index.html',
        github: 'https://github.com/pullcoder/pullcoder.github.io',
        sections: [
            {
                id: 'html', label: 'HTML', color: '#ff6b3d',
                desc: '문서 구조, 텍스트, 테이블, 이미지, 폼, 멀티미디어',
                list: 'html/htmlTag.html', dir: 'html/',
                items: [
                    ['frameHtml.html', 'HTML 문서의 구조'],
                    ['metaHtml.html', '메타 태그'],
                    ['terragraphHtml.html', '문단 태그'],
                    ['textHtml.html', '문자 태그'],
                    ['pharagraphHtml.html', '헤딩 태그'],
                    ['specialCharHtml.html', '특수문자 표시'],
                    ['tableHtml.html', '테이블 태그'],
                    ['tableSpanHtml.html', '테이블 병합'],
                    ['tableSize.html', '테이블 크기 조절'],
                    ['img.html', '이미지 태그'],
                    ['imgSize.html', '이미지 크기'],
                    ['Hyperlink.html', '하이퍼링크'],
                    ['imgHyperlink.html', '이미지 하이퍼링크'],
                    ['formInput.html', '폼 입력 태그'],
                    ['formInput2.html', '폼 입력 태그 2'],
                    ['formTag.html', '폼태그 Select, Textarea'],
                    ['veryfy.html', '입력 검증 폼'],
                    ['audio.html', '오디오'],
                    ['video.html', '비디오'],
                    ['divIframe.html', 'div, iframe'],
                    ['listTag.html', 'list 태그']
                ]
            },
            {
                id: 'css', label: 'CSS', color: '#3d9bff',
                desc: '선택자, 폰트, 색상, 경계선, 박스 모델',
                list: 'css/cssTag.html', dir: 'css/',
                items: [
                    ['exCss.html', '외부 CSS 파일 연동'],
                    ['innerCss.html', 'style 태그를 이용한 내부 스타일'],
                    ['inlineCss.html', 'style 속성을 이용한 인라인 스타일'],
                    ['typeSelector.html', '요소(태그) 선택자'],
                    ['idSelector.html', 'id / class 선택자 스타일 적용'],
                    ['classSelector.html', 'class 선택자'],
                    ['idClassS.html', 'id / class 선택자'],
                    ['pseduo.html', '의사 선택자'],
                    ['fontText.html', '폰트와 텍스트'],
                    ['color.html', '색상 표현'],
                    ['border.html', '경계선 스타일'],
                    ['borderMix.html', '경계선 혼합 스타일'],
                    ['box&Shadoow.html', '박스 모델과 그림자']
                ]
            },
            {
                id: 'js', label: 'JavaScript', color: '#ffd23f',
                desc: '출력, 변수, 연산자, 함수, 이벤트, 조건문, 반복문',
                list: 'js/jsTag.html', dir: 'js/',
                items: [
                    ['8-1externjs.html', '외부 자바스크립트'],
                    ['8-2Onexternjs.html', '이벤트 외부 자바스크립트'],
                    ['8-3innerjs.html', '내부 자바스크립트'],
                    ['8-4inlinejs.html', '인라인 자바스크립트'],
                    ['8-5-1state.html', '설명문, 연산자, 키워드'],
                    ['8-5-2fCalculator.html', '연산자 출력'],
                    ['8-5-3finputCal.html', '함수 값 입력 및 호출'],
                    ['8-5-4onClick.html', 'onclick 이벤트'],
                    ['8-5-5onChange.html', 'onchange 이벤트'],
                    ['8-5-6onMouseOver.html', 'onmouseover 이벤트'],
                    ['8-5-7onMouseDown.html', 'onmousedown 이벤트'],
                    ['8-5-8onKeyDown.html', 'onkeydown 이벤트'],
                    ['8-5-9onLoad.html', 'onload 이벤트'],
                    ['8-6Output.html', '출력문'],
                    ['8-7variable.html', '변수'],
                    ['8-8operation.html', '연산자'],
                    ['8-8example.html', '버튼 함수로 연산자 실행'],
                    ['8-9function.html', '함수(Function)'],
                    ['8-10eventFuc.html', '이벤트 함수'],
                    ['8-11funcCalc.html', '함수 계산'],
                    ['8-12innerFunc.html', '내장 함수'],
                    ['8-10-12.html', '함수 종합 정리 (8-10~12)'],
                    ['8-13ifElse.html', 'if 조건문'],
                    ['8-14elseIf.html', 'else if 조건문'],
                    ['8-15switch.html', 'switch case문'],
                    ['8-16for.html', 'for 반복문'],
                    ['8-17이중for문.html', '이중 for문'],
                    ['8-18while문.html', 'while 반복문'],
                    ['8-19dowhile문.html', 'do while 반복문']
                ]
            },
            {
                id: 'design', label: 'Design', color: '#c26bff',
                desc: 'position, float, 네비게이션, transform, transition, animation',
                list: 'design/designTag.html', dir: 'design/',
                items: [
                    ['6-1_display.html', 'display 속성'],
                    ['6-2_marginPadding.html', 'margin과 padding'],
                    ['6-3_static.html', 'position: static'],
                    ['6-4_relative.html', 'position: relative'],
                    ['6-5_absolute.html', 'position: absolute'],
                    ['6-6_fixed.html', 'position: fixed'],
                    ['6-7_sticky.html', 'position: sticky'],
                    ['6-8_position.html', '다양한 position'],
                    ['6-9_zIndex.html', 'z-index'],
                    ['6-10_opacity.html', '투명도 (opacity)'],
                    ['6-11_overflow.html', 'overflow 속성'],
                    ['6-12_floatClear.html', 'float와 clear'],
                    ['6-13_headerStyle.html', '헤더 스타일'],
                    ['6-14_navigation.html', '네비게이션'],
                    ['6-15_horizontalNav.html', '수평 메뉴'],
                    ['6-16_verticallNav.html', '수직 메뉴'],
                    ['6-17_dropDown.html', '드롭다운 메뉴'],
                    ['7-1translate.html', '2D transform: translate()'],
                    ['7-2scale.html', '2D transform: scale()'],
                    ['7-3skew.html', '2D transform: skew()'],
                    ['7-4rotate.html', '2D transform: rotate()'],
                    ['7-5matrix.html', '2D transform: matrix()'],
                    ['7-6translate3d.html', '3D transform: translate3d()'],
                    ['7-7scale3d.html', '3D transform: scale3d()'],
                    ['7-8rotate3d.html', '3D transform: rotate3d()'],
                    ['7-8transition.html', 'transition-timing-function 비교'],
                    ['7-9transition.html', 'transition 기본'],
                    ['7-10transitionFunc.html', 'transition-timing-function'],
                    ['7-11keyFrameBorder.html', 'keyframes 색상 애니메이션'],
                    ['7-12translationAni.html', '이동 애니메이션'],
                    ['7-13iterationAni.html', '반복(iteration) 애니메이션']
                ]
            }
        ]
    };

    // iframe 안에 열린 페이지(divIframe 예제 등)에는 헤더를 그리지 않음
    var IN_FRAME = window.self !== window.top;

    // ===================================================================
    // 2. 경로 계산 / 현재 페이지 판별
    // ===================================================================
    var script = document.currentScript;
    var BASE = new URL('.', script ? script.src : location.href).href;

    function url(path) { return new URL(path, BASE).href; }

    function norm(href) {
        var p = new URL(href, location.href).pathname;
        try { p = decodeURIComponent(p); } catch (e) { /* 그대로 사용 */ }
        return p.toLowerCase();
    }

    function esc(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    // 현재 페이지가 어떤 종류인지: home / list / lesson / other
    function detectPage() {
        var here = norm(location.href);
        if (here === norm(url(SITE.home)) || here === norm(BASE)) return { type: 'home' };

        for (var i = 0; i < SITE.sections.length; i++) {
            var sec = SITE.sections[i];
            if (here === norm(url(sec.list))) return { type: 'list', section: sec };
            for (var j = 0; j < sec.items.length; j++) {
                if (here === norm(url(sec.dir + sec.items[j][0]))) {
                    return { type: 'lesson', section: sec, index: j };
                }
            }
        }
        // manifest 에 없지만 섹션 폴더 안에 있는 페이지
        for (var k = 0; k < SITE.sections.length; k++) {
            if (here.indexOf(norm(url(SITE.sections[k].dir))) === 0) {
                return { type: 'lesson', section: SITE.sections[k], index: -1 };
            }
        }
        return { type: 'other' };
    }

    var PAGE = detectPage();

    // ===================================================================
    // 3. 헤더 스타일 (Shadow DOM 내부 전용)
    // ===================================================================
    var HEADER_CSS = '\
:host { all: initial; display: block; position: relative; z-index: 1000;\
  font-family: "Noto Sans KR", system-ui, -apple-system, "Segoe UI", sans-serif;\
  --bg: rgba(7,7,15,.72); --line: rgba(139,150,255,.16); --text: #e9ecff; --muted: #8189b8;\
  --primary: #00f0ff; --primary-soft: rgba(0,240,255,.1); --mono: "JetBrains Mono", Consolas, monospace;\
  --accent: var(--primary); }\
:host([sticky]) { position: sticky; top: 0; }\
@media print { :host { display: none; } }\
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\
a { color: inherit; text-decoration: none; }\
button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }\
\
.bar { position: relative; background: var(--bg); backdrop-filter: saturate(180%) blur(12px); -webkit-backdrop-filter: saturate(180%) blur(12px);\
  border-bottom: 1px solid var(--line); }\
.bar::after { content: ""; position: absolute; left: 0; right: 0; bottom: -1px; height: 1px; pointer-events: none;\n  background: linear-gradient(90deg, transparent, #00f0ff, #ff2bd6, transparent); box-shadow: 0 0 10px #00f0ff; }\n.inner { max-width: 1120px; margin: 0 auto; padding: 0 clamp(16px, 4vw, 32px); }\
.top { height: 60px; display: flex; align-items: center; gap: 16px; }\
\
.logo { font-family: var(--mono); font-weight: 700; font-size: 17px; color: var(--text); letter-spacing: -.02em;\
  display: inline-flex; align-items: center; gap: 2px; white-space: nowrap; }\
.logo { text-shadow: 0 0 12px rgba(139,92,255,.6); }\n.logo .br { color: var(--primary); text-shadow: 0 0 10px var(--primary); }\
.logo .sub { color: var(--muted); font-weight: 500; font-size: 13px; margin-left: 8px; padding: 2px 8px; border-radius: 6px;\
  background: var(--primary-soft); transition: color .15s; }\
.logo .sub:hover { color: var(--primary); }\
\
.nav { margin-left: auto; display: flex; align-items: center; gap: 4px; }\
.nav a { position: relative; padding: 8px 12px; border-radius: 8px; font-size: 14px; font-weight: 500; color: var(--muted);\
  transition: color .15s, background .15s; display: inline-flex; align-items: center; gap: 8px; }\
.nav a:hover { color: var(--text); background: rgba(255,255,255,.06); }\
.nav a .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--c); box-shadow: 0 0 8px var(--c); flex-shrink: 0; }\
.nav a[aria-current="page"] { color: var(--text); background: rgba(255,255,255,.06); box-shadow: inset 0 -2px 0 var(--c); font-weight: 700; }\
.nav .sep { width: 1px; height: 20px; background: var(--line); margin: 0 6px; }\
.nav .gh { font-family: var(--mono); font-size: 13px; }\
\
.menu-btn { display: none; margin-left: auto; width: 40px; height: 40px; border-radius: 10px; align-items: center; justify-content: center; }\
.menu-btn:hover { background: rgba(255,255,255,.06); }\
.menu-btn span, .menu-btn span::before, .menu-btn span::after { display: block; width: 18px; height: 2px; background: var(--text);\
  border-radius: 2px; position: relative; transition: transform .2s, background .2s; }\
.menu-btn span::before, .menu-btn span::after { content: ""; position: absolute; left: 0; }\
.menu-btn span::before { top: -6px; } .menu-btn span::after { top: 6px; }\
.open .menu-btn span { background: transparent; }\
.open .menu-btn span::before { transform: translateY(6px) rotate(45deg); }\
.open .menu-btn span::after { transform: translateY(-6px) rotate(-45deg); }\
\
.lesson { border-top: 1px solid var(--line); background: rgba(10,10,26,.85); }\
.lesson .inner { min-height: 48px; display: flex; align-items: center; gap: 12px; }\
.crumb { flex: 1; min-width: 0; display: flex; align-items: center; gap: 6px; font-family: var(--mono); font-size: 13px; color: var(--muted); }\
.crumb a:hover { color: var(--primary); }\
.crumb .tag { font-family: var(--mono); font-size: 12px; font-weight: 700; padding: 2px 8px; border-radius: 6px;\
  color: #07070f; background: var(--accent); flex-shrink: 0; box-shadow: 0 0 10px var(--accent); }\
.crumb .title { color: var(--text); font-family: "Noto Sans KR", system-ui, sans-serif; font-weight: 700; font-size: 14px;\
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\
.crumb .count { flex-shrink: 0; font-size: 12px; }\
.pager { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }\
.pager a { display: inline-flex; align-items: center; gap: 4px; height: 32px; padding: 0 12px; border-radius: 8px; font-size: 13px;\
  font-weight: 500; border: 1px solid var(--line); background: rgba(255,255,255,.04); color: var(--text); transition: border-color .15s, color .15s, box-shadow .15s; }\
.pager a:hover { border-color: var(--accent); color: var(--accent); box-shadow: 0 0 12px color-mix(in srgb, var(--accent) 40%, transparent); }\
.pager a[aria-disabled="true"] { opacity: .4; pointer-events: none; }\
\
@media (max-width: 760px) {\
  .menu-btn { display: inline-flex; }\
  .logo .sub { font-size: 12px; }\
  .nav { display: none; position: absolute; left: 0; right: 0; top: 60px; flex-direction: column; align-items: stretch; gap: 2px;\
    padding: 8px clamp(16px, 4vw, 32px) 16px; background: rgba(10,10,26,.97); border-bottom: 1px solid var(--line);\
    box-shadow: 0 12px 24px rgba(0,0,0,.5); }\
  .open .nav { display: flex; }\
  .nav a { padding: 12px; font-size: 15px; }\
  .nav .sep { width: auto; height: 1px; margin: 6px 0; }\
  .crumb .path, .crumb .count { display: none; }\
  .pager .txt { display: none; }\
  .pager a { padding: 0 10px; }\
}';

    // ===================================================================
    // 4. 헤더 HTML 생성
    // ===================================================================
    function navHtml() {
        var current = PAGE.section ? PAGE.section.id : '';
        var links = SITE.sections.map(function (s) {
            return '<a href="' + url(s.list) + '" style="--c:' + s.color + '"' +
                (s.id === current ? ' aria-current="page"' : '') + '>' +
                '<span class="dot"></span>' + esc(s.label) + '</a>';
        }).join('');
        return links +
            '<span class="sep"></span>' +
            '<a class="gh" href="' + SITE.github + '" target="_blank" rel="noopener">GitHub ↗</a>';
    }

    function lessonHtml() {
        var sec = PAGE.section;
        var items = sec.items;
        var i = PAGE.index;
        var title = i >= 0 ? items[i][1] : document.title;
        var prev = i > 0 ? items[i - 1] : null;
        var next = i >= 0 && i < items.length - 1 ? items[i + 1] : null;

        function pageLink(item, label, cls) {
            if (!item) return '<a aria-disabled="true">' + label + '</a>';
            return '<a href="' + url(sec.dir + item[0]) + '" title="' + esc(item[1]) + '" class="' + cls + '">' + label + '</a>';
        }

        return '<div class="lesson"><div class="inner">' +
            '<div class="crumb">' +
                '<a class="tag" href="' + url(sec.list) + '">' + esc(sec.label) + '</a>' +
                '<span class="path">/</span>' +
                '<span class="title">' + esc(title) + '</span>' +
                (i >= 0 ? '<span class="count">' + (i + 1) + ' / ' + items.length + '</span>' : '') +
            '</div>' +
            '<div class="pager">' +
                pageLink(prev, '←<span class="txt"> 이전</span>', 'prev') +
                '<a href="' + url(sec.list) + '">목록</a>' +
                pageLink(next, '<span class="txt">다음 </span>→', 'next') +
            '</div>' +
        '</div></div>';
    }

    function renderHeader() {
        if (IN_FRAME || document.querySelector('pc-header')) return;

        var host = document.createElement('pc-header');
        if (PAGE.type !== 'lesson') host.setAttribute('sticky', '');
        if (PAGE.section) host.style.setProperty('--accent', PAGE.section.color);

        var root = host.attachShadow({ mode: 'open' });
        root.innerHTML =
            '<style>' + HEADER_CSS + '</style>' +
            '<div class="bar">' +
                '<div class="inner top">' +
                    '<span class="logo">' +
                        '<a href="' + url(SITE.mainSite) + '" title="포트폴리오 메인">' +
                            '<span class="br">&lt;</span>' + SITE.name + '<span class="br">&nbsp;/&gt;</span>' +
                        '</a>' +
                        '<a class="sub" href="' + url(SITE.home) + '" title="AI웹프로그래밍 홈">ai_web</a>' +
                    '</span>' +
                    '<button class="menu-btn" type="button" aria-label="메뉴 열기" aria-expanded="false"><span></span></button>' +
                    '<nav class="nav">' + navHtml() + '</nav>' +
                '</div>' +
                (PAGE.type === 'lesson' ? lessonHtml() : '') +
            '</div>';

        // 모바일 햄버거 메뉴
        var bar = root.querySelector('.bar');
        var btn = root.querySelector('.menu-btn');
        btn.addEventListener('click', function () {
            var open = bar.classList.toggle('open');
            btn.setAttribute('aria-expanded', String(open));
        });
        root.querySelectorAll('.nav a').forEach(function (a) {
            a.addEventListener('click', function () { bar.classList.remove('open'); });
        });

        // <body> 바깥에 삽입 → 예제 페이지의 body 스타일과 분리
        document.documentElement.insertBefore(host, document.body);
    }

    // ===================================================================
    // 5. 목록 렌더링  <div data-lesson-list="css"></div>
    //    섹션 개수 표시  <span data-lesson-count="css"></span>
    // ===================================================================
    function findSection(id) {
        for (var i = 0; i < SITE.sections.length; i++) if (SITE.sections[i].id === id) return SITE.sections[i];
        return null;
    }

    function renderLists() {
        document.querySelectorAll('[data-lesson-list]').forEach(function (box) {
            var sec = findSection(box.getAttribute('data-lesson-list'));
            if (!sec) return;
            box.style.setProperty('--accent', sec.color);

            var cards = sec.items.map(function (item, i) {
                var no = String(i + 1).padStart(2, '0');
                return '<li><a class="lesson-card" href="' + url(sec.dir + item[0]) + '">' +
                    '<span class="no">' + no + '</span>' +
                    '<span class="info"><span class="title">' + esc(item[1]) + '</span>' +
                    '<span class="file">' + esc(item[0]) + '</span></span>' +
                    '<span class="arrow" aria-hidden="true">→</span>' +
                '</a></li>';
            }).join('');

            box.innerHTML =
                '<div class="lesson-toolbar">' +
                    '<input type="search" class="lesson-filter" placeholder="예제 검색 (제목 또는 파일명)" aria-label="예제 검색">' +
                    '<span class="lesson-total"><b>' + sec.items.length + '</b>개 예제</span>' +
                '</div>' +
                '<ul class="lesson-grid">' + cards + '</ul>' +
                '<p class="lesson-empty" hidden>검색 결과가 없습니다.</p>';

            var input = box.querySelector('.lesson-filter');
            var rows = box.querySelectorAll('.lesson-grid li');
            var empty = box.querySelector('.lesson-empty');
            input.addEventListener('input', function () {
                var q = input.value.trim().toLowerCase();
                var shown = 0;
                rows.forEach(function (li) {
                    var hit = li.textContent.toLowerCase().indexOf(q) !== -1;
                    li.hidden = !hit;
                    if (hit) shown++;
                });
                empty.hidden = shown !== 0;
            });
        });

        document.querySelectorAll('[data-lesson-count]').forEach(function (el) {
            var sec = findSection(el.getAttribute('data-lesson-count'));
            if (sec) el.textContent = sec.items.length;
        });
    }

    // ===================================================================
    // 6. 실행
    // ===================================================================
    function loadFonts() {
        if (document.getElementById('pc-fonts')) return;
        var link = document.createElement('link');
        link.id = 'pc-fonts';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Noto+Sans+KR:wght@400;500;700&display=swap';
        document.head.appendChild(link);
    }

    // 파비콘(탭 아이콘) — 페이지에 없으면 공통 아이콘 추가 (favicon.ico 404 방지)
    function loadFavicon() {
        if (document.querySelector('link[rel~="icon"]')) return;
        var link = document.createElement('link');
        link.rel = 'icon';
        link.href = 'data:image/svg+xml,' + encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#0c0c1d"/>' +
            '<text x="16" y="21.5" font-family="monospace" font-size="14" font-weight="700" fill="#00f0ff" text-anchor="middle">&lt;/&gt;</text></svg>');
        document.head.appendChild(link);
    }

    function init() {
        loadFonts();
        loadFavicon();
        renderHeader();
        renderLists();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // 이전 버전 호환: 예전 페이지의 loadHeader({...}) 호출은 무시해도 됨 (자동 렌더링)
    window.loadHeader = function () {};
    window.SITE = SITE;
})();
