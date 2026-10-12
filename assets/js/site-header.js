/**
 * site-header.js — 포트폴리오 루트 공통 헤더 (수업 간 이동)
 *
 * [사용법]  <script src="(상대경로)/assets/js/site-header.js" defer></script>
 *           경로는 이 스크립트 위치로 자동 계산합니다.
 *
 * [수업 추가]  아래 COURSES 에 한 줄 추가하면 메뉴에 자동 반영됩니다.
 *              items 가 있으면 하위 페이지에 브레드크럼 + 이전/다음 버튼이 생깁니다.
 *
 * ※ study/ai_web 은 자체 header.js(HTML/CSS/JS 예제 이동)를 사용합니다.
 *   헤더는 Shadow DOM + <body> 바깥 삽입으로 페이지 CSS와 서로 간섭하지 않습니다.
 */
(function () {
    'use strict';

    var SITE = {
        name: 'pullcoder',
        home: 'index.html',
        github: 'https://github.com/pullcoder/pullcoder.github.io'
    };

    var COURSES = [
        { id: 'it', label: 'IT개론', prof: '박경배', color: '#0891b2', href: 'study/introduction_it/index.html', dir: 'study/introduction_it/' },
        { id: 'web', label: 'AI웹프로그래밍', prof: '박경배', color: '#4f46e5', href: 'study/ai_web/index.html', dir: 'study/ai_web/' },
        { id: 'excel', label: '컴퓨터활용능력', prof: '홍성준', color: '#16a34a', href: 'study/excel/index.html', dir: 'study/excel/' },
        { id: 'aic', label: 'AI콘텐츠활용', prof: '홍성준', color: '#9333ea', href: 'study/ai_content/index.html', dir: 'study/ai_content/' },
        {
            id: 'java', label: 'JAVA프로그래밍', prof: '홍광희', color: '#ea580c', href: 'study/java/index.html', dir: 'study/java/',
            items: [
                ['html/chap01.html', 'Chapter 01 — 자바 소개'],
                ['html/chap02.html', 'Chapter 02 — 변수와 연산자'],
                ['html/chap02exer.html', 'Chapter 02 — 연습문제'],
                ['html/chap03.html', 'Chapter 03 — 제어문'],
                ['html/chap03arr.html', 'Chapter 03 — 배열'],
                ['html/chap03exer.html', 'Chapter 03 — 연습문제'],
                ['html/chap04.html', 'Chapter 04 — 클래스와 객체'],
                ['html/chap04exer.html', 'Chapter 04 — 연습문제'],
                ['html/chap05.html', 'Chapter 05 — 메서드와 배열']
            ]
        },
        { id: 'uai', label: '인공지능활용', prof: '홍광희', color: '#64748b', href: 'study/utilizing_artificial_intelligence/index.html', dir: 'study/utilizing_artificial_intelligence/', soon: true }
    ];

    if (window.self !== window.top) return; // iframe 안에서는 그리지 않음

    // ---------- 경로 ----------
    var script = document.currentScript;
    var BASE = new URL('../../', script ? script.src : location.href).href; // assets/js/ → 루트

    function url(p) { return new URL(p, BASE).href; }
    function norm(href) {
        var p = new URL(href, location.href).pathname;
        try { p = decodeURIComponent(p); } catch (e) { /* noop */ }
        return p.toLowerCase();
    }
    function esc(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    // ---------- 현재 위치 판별 ----------
    function detect() {
        var here = norm(location.href);
        if (here === norm(url(SITE.home)) || here === norm(BASE)) return { type: 'home' };
        for (var i = 0; i < COURSES.length; i++) {
            var c = COURSES[i];
            if (here === norm(url(c.href))) return { type: 'course', course: c };
            var items = c.items || [];
            for (var j = 0; j < items.length; j++) {
                if (here === norm(url(c.dir + items[j][0]))) return { type: 'sub', course: c, index: j };
            }
            if (here.indexOf(norm(url(c.dir))) === 0) return { type: 'sub', course: c, index: -1 };
        }
        return { type: 'other' };
    }
    var PAGE = detect();

    // ---------- 스타일 (Shadow DOM 전용) ----------
    var CSS = '\
:host { all: initial; display: block; position: relative; z-index: 1000;\
  font-family: "Noto Sans KR", system-ui, -apple-system, "Segoe UI", sans-serif;\
  --line: #e3e8ef; --text: #1e293b; --muted: #64748b; --primary: #4f46e5; --soft: #eef2ff;\
  --mono: "JetBrains Mono", Consolas, monospace; --accent: var(--primary); }\
:host([sticky]) { position: sticky; top: 0; }\
@media print { :host { display: none; } }\
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\
a { color: inherit; text-decoration: none; }\
button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }\
.bar { background: rgba(255,255,255,.88); backdrop-filter: saturate(180%) blur(12px); -webkit-backdrop-filter: saturate(180%) blur(12px); border-bottom: 1px solid var(--line); }\
.inner { max-width: 1120px; margin: 0 auto; padding: 0 clamp(16px, 4vw, 32px); }\
.top { height: 60px; display: flex; align-items: center; gap: 16px; }\
.logo { font-family: var(--mono); font-weight: 700; font-size: 17px; color: var(--text); white-space: nowrap; letter-spacing: -.02em; }\
.logo .br { color: var(--primary); }\
.nav { margin-left: auto; display: flex; align-items: center; gap: 2px; }\
.nav a { padding: 8px 10px; border-radius: 8px; font-size: 14px; font-weight: 500; color: var(--muted); white-space: nowrap;\
  display: inline-flex; align-items: center; gap: 7px; transition: color .15s, background .15s; }\
.nav a:hover { color: var(--text); background: #f1f5f9; }\
.nav a .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--c); flex-shrink: 0; }\
.nav a[aria-current="page"] { color: var(--text); background: var(--soft); font-weight: 700; }\
.nav a .soon { font-size: 11px; color: var(--muted); font-weight: 400; }\
.menu-btn { display: none; margin-left: auto; width: 40px; height: 40px; border-radius: 10px; align-items: center; justify-content: center; }\
.menu-btn:hover { background: #f1f5f9; }\
.menu-btn span, .menu-btn span::before, .menu-btn span::after { display: block; width: 18px; height: 2px; background: var(--text); border-radius: 2px; position: relative; transition: transform .2s, background .2s; }\
.menu-btn span::before, .menu-btn span::after { content: ""; position: absolute; left: 0; }\
.menu-btn span::before { top: -6px; } .menu-btn span::after { top: 6px; }\
.open .menu-btn span { background: transparent; }\
.open .menu-btn span::before { transform: translateY(6px) rotate(45deg); }\
.open .menu-btn span::after { transform: translateY(-6px) rotate(-45deg); }\
.sub { border-top: 1px solid var(--line); background: rgba(248,250,252,.92); }\
.sub .inner { min-height: 48px; display: flex; align-items: center; gap: 12px; }\
.crumb { flex: 1; min-width: 0; display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--muted); }\
.crumb .tag { font-size: 12px; font-weight: 700; padding: 2px 8px; border-radius: 6px; color: #fff; background: var(--accent); flex-shrink: 0; }\
.crumb .title { color: var(--text); font-weight: 700; font-size: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\
.crumb .count { flex-shrink: 0; font-family: var(--mono); font-size: 12px; }\
.pager { display: flex; gap: 6px; flex-shrink: 0; }\
.pager a { display: inline-flex; align-items: center; height: 32px; padding: 0 12px; border-radius: 8px; font-size: 13px; font-weight: 500;\
  border: 1px solid var(--line); background: #fff; color: var(--text); transition: border-color .15s, color .15s; }\
.pager a:hover { border-color: var(--accent); color: var(--accent); }\
.pager a[aria-disabled="true"] { opacity: .4; pointer-events: none; }\
@media (max-width: 1000px) {\
  .menu-btn { display: inline-flex; }\
  .nav { display: none; position: absolute; left: 0; right: 0; top: 60px; flex-direction: column; align-items: stretch; gap: 2px;\
    padding: 8px clamp(16px, 4vw, 32px) 16px; background: #fff; border-bottom: 1px solid var(--line); box-shadow: 0 12px 24px rgba(15,23,42,.08); }\
  .open .nav { display: flex; }\
  .nav a { padding: 12px; font-size: 15px; }\
}\
@media (max-width: 640px) {\
  .crumb .path, .crumb .count { display: none; }\
  .pager .txt { display: none; }\
  .pager a { padding: 0 10px; }\
}';

    // ---------- 마크업 ----------
    function nav() {
        var cur = PAGE.course ? PAGE.course.id : '';
        return COURSES.map(function (c) {
            return '<a href="' + url(c.href) + '" style="--c:' + c.color + '"' + (c.id === cur ? ' aria-current="page"' : '') + '>' +
                '<span class="dot"></span>' + esc(c.label) + (c.soon ? ' <span class="soon">준비중</span>' : '') + '</a>';
        }).join('');
    }

    function subBar() {
        var c = PAGE.course, items = c.items || [], i = PAGE.index;
        var title = i >= 0 ? items[i][1] : document.title;
        function link(item, label) {
            if (!item) return '<a aria-disabled="true">' + label + '</a>';
            return '<a href="' + url(c.dir + item[0]) + '" title="' + esc(item[1]) + '">' + label + '</a>';
        }
        var pager = '<a href="' + url(c.href) + '">목록</a>';
        if (i >= 0) pager = link(items[i - 1], '←<span class="txt"> 이전</span>') + pager + link(items[i + 1], '<span class="txt">다음 </span>→');
        return '<div class="sub"><div class="inner">' +
            '<div class="crumb"><a class="tag" href="' + url(c.href) + '">' + esc(c.label) + '</a>' +
            '<span class="path">/</span><span class="title">' + esc(title) + '</span>' +
            (i >= 0 ? '<span class="count">' + (i + 1) + ' / ' + items.length + '</span>' : '') + '</div>' +
            '<div class="pager">' + pager + '</div>' +
        '</div></div>';
    }

    function render() {
        if (document.querySelector('pc-header')) return;
        var host = document.createElement('pc-header');
        if (PAGE.type !== 'sub' && !document.body.hasAttribute('data-header-static')) host.setAttribute('sticky', '');
        if (PAGE.course) host.style.setProperty('--accent', PAGE.course.color);

        var root = host.attachShadow({ mode: 'open' });
        root.innerHTML = '<style>' + CSS + '</style>' +
            '<div class="bar"><div class="inner top">' +
                '<a class="logo" href="' + url(SITE.home) + '"><span class="br">&lt;</span>' + SITE.name + '<span class="br">&nbsp;/&gt;</span></a>' +
                '<button class="menu-btn" type="button" aria-label="메뉴 열기" aria-expanded="false"><span></span></button>' +
                '<nav class="nav">' + nav() + '</nav>' +
            '</div>' + (PAGE.type === 'sub' ? subBar() : '') + '</div>';

        var bar = root.querySelector('.bar'), btn = root.querySelector('.menu-btn');
        btn.addEventListener('click', function () {
            btn.setAttribute('aria-expanded', String(bar.classList.toggle('open')));
        });
        document.documentElement.insertBefore(host, document.body);
    }

    function fonts() {
        if (document.getElementById('pc-fonts')) return;
        var l = document.createElement('link');
        l.id = 'pc-fonts'; l.rel = 'stylesheet';
        l.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Noto+Sans+KR:wght@400;500;700&display=swap';
        document.head.appendChild(l);
    }

    // 파비콘(탭 아이콘) — 페이지에 없으면 공통 아이콘 추가 (favicon.ico 404 방지)
    function favicon() {
        if (document.querySelector('link[rel~="icon"]')) return;
        var l = document.createElement('link');
        l.rel = 'icon';
        l.href = 'data:image/svg+xml,' + encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#4f46e5"/>' +
            '<text x="16" y="21.5" font-family="monospace" font-size="14" font-weight="700" fill="#fff" text-anchor="middle">&lt;/&gt;</text></svg>');
        document.head.appendChild(l);
    }

    function init() { fonts(); favicon(); render(); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

    window.COURSES = COURSES;
})();
