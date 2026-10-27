/* md 문서 렌더링 — doc.html 과 index.html 팝업이 함께 사용
   필요: marked, highlight.js (mermaid 는 다이어그램이 있을 때만 불러옴) */
(function () {
    // GitHub 저장소 (md 가 아닌 상대 링크는 여기로)
    var repo = 'https://github.com/pullcoder/pullcoder.github.io/blob/main/study/my_site/';

    // aven/ 폴더 안의 .md 만 허용 (한글 · 공백 파일명 포함)
    function allowed(file) {
        return /^aven\/[\p{L}\p{N}_\-\/ .]+\.md$/u.test(file) && file.indexOf('..') === -1;
    }

    // 앵커는 글자·숫자·-·_ 만 남겨 비교 (이모지 변형 문자 차이 무시)
    function anchor(hash) {
        try { hash = decodeURIComponent(hash); } catch (e) { /* 그대로 */ }
        return hash.toLowerCase().replace(/[^\p{L}\p{N}_-]/gu, '');
    }
    // GitHub 와 같은 방식으로 제목 앵커 만들기 (문서 안의 목차 링크용)
    function slug(text) {
        return anchor(text.trim().replace(/\s/g, '-'));
    }

    // 문서 안의 상대 링크 → { href, md(다른 md 문서면 경로), hash }
    function resolve(href, file) {
        if (!href || /^(https?:|mailto:)/.test(href)) return null;
        if (href.charAt(0) === '#') return { href: '#' + anchor(href.slice(1)), hash: anchor(href.slice(1)) };
        var parts = href.split('#');
        var target = decodeURIComponent(new URL(parts[0], 'http://x/' + file).pathname.slice(1));
        var hash = parts[1] ? anchor(parts[1]) : '';
        if (/\.md$/.test(target) && allowed(target)) {
            return { href: 'doc.html?f=' + encodeURI(target) + (hash ? '#' + hash : ''), md: target, hash: hash };
        }
        return { href: repo + encodeURI(target) };
    }

    function render(box, file) {
        if (!allowed(file)) {
            box.innerHTML = '<p class="doc-msg">열 수 없는 문서입니다.</p>';
            return Promise.reject(new Error('not allowed'));
        }
        box.innerHTML = '<p class="doc-msg">문서를 불러오는 중…</p>';

        return fetch(encodeURI(file))
            .then(function (res) {
                if (!res.ok) throw new Error(res.status);
                return res.text();
            })
            .then(function (md) {
                box.innerHTML = marked.parse(md, { gfm: true });

                box.querySelectorAll('h1, h2, h3, h4').forEach(function (h) { h.id = slug(h.textContent); });
                box.querySelectorAll('a[href]').forEach(function (a) {
                    var r = resolve(a.getAttribute('href'), file);
                    if (r) {
                        a.setAttribute('href', r.href);
                        if (r.md) a.dataset.md = r.md;
                        if (r.hash) a.dataset.hash = r.hash;
                    }
                    if (/^https?:/.test(a.getAttribute('href'))) { a.target = '_blank'; a.rel = 'noopener'; }
                });
                box.querySelectorAll('table').forEach(function (t) {
                    var wrap = document.createElement('div');
                    wrap.className = 'table-wrap';
                    t.parentNode.insertBefore(wrap, t);
                    wrap.appendChild(t);
                });

                // ```mermaid 는 다이어그램으로, 나머지 코드는 구문 강조
                var diagrams = box.querySelectorAll('pre code.language-mermaid');
                diagrams.forEach(function (code) {
                    var div = document.createElement('div');
                    div.className = 'mermaid';
                    div.textContent = code.textContent;
                    code.parentNode.replaceWith(div);
                });
                if (diagrams.length) loadMermaid(function () { mermaid.run({ nodes: box.querySelectorAll('.mermaid') }); });
                if (window.hljs) box.querySelectorAll('pre code').forEach(function (el) { hljs.highlightElement(el); });

                var h1 = box.querySelector('h1');
                return { title: h1 ? h1.textContent : file.split('/').pop() };
            }, function (err) {
                box.innerHTML = '<p class="doc-msg">문서를 불러오지 못했습니다.<br>' +
                    '파일을 더블클릭해서 연 경우(<code>file://</code>)에는 브라우저가 막습니다 — ' +
                    'VS Code <code>Live Server</code> 등 로컬 서버로 열거나 GitHub Pages 에서 확인하세요.</p>';
                throw err;
            });
    }

    var mermaidState = null;
    function loadMermaid(done) {
        if (window.mermaid && mermaidState === 'ready') return done();
        if (!mermaidState) {
            mermaidState = [];
            var s = document.createElement('script');
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.9.1/mermaid.min.js';
            s.onload = function () {
                mermaid.initialize({ startOnLoad: false, theme: 'dark' });
                var queue = mermaidState;
                mermaidState = 'ready';
                queue.forEach(function (fn) { fn(); });
            };
            document.head.appendChild(s);
        }
        if (Array.isArray(mermaidState)) mermaidState.push(done);
    }

    window.MdView = { render: render, anchor: anchor, allowed: allowed };
})();
