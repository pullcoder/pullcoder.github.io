/**
 * fx.js — 네온 테마 인터랙션 효과 (site.css 와 함께 사용)
 *
 * [사용법]  <script src="(상대경로)/assets/js/fx.js" defer></script>
 *
 *   1. 카드 스포트라이트 — 커서 위치에 빛 (.course-card, .stack-card, .item-card, .lesson-card)
 *   2. 커서 오라       — 마우스를 따라다니는 큰 빛 (마우스 사용 환경만)
 *   3. 매트릭스 비      — .hero 가 있는 메인 페이지 배경
 *   4. 터미널 타이핑    — .terminal pre 를 한 줄씩 출력
 *   5. 스크롤 등장      — .section 이 화면에 들어오면 나타남
 *   6. 입력 터미널      — .terminal[data-shell] 에서 help, ls, cd 등 명령어 실행
 *
 * '동작 줄이기(prefers-reduced-motion)' 설정이면 2~5 는 실행하지 않습니다.
 */
(function () {
    'use strict';

    var CARDS = '.course-card, .stack-card, .item-card, .lesson-card';
    var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var finePointer = window.matchMedia('(pointer: fine)').matches;

    // 1. 카드 스포트라이트 (목록이 나중에 그려져도 동작하도록 위임)
    function spotlight() {
        document.addEventListener('pointermove', function (e) {
            var card = e.target.closest && e.target.closest(CARDS);
            if (!card) return;
            var r = card.getBoundingClientRect();
            card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
            card.style.setProperty('--my', (e.clientY - r.top) + 'px');
        });
        document.addEventListener('pointerout', function (e) {
            var card = e.target.closest && e.target.closest(CARDS);
            if (card && !card.contains(e.relatedTarget)) {
                card.style.removeProperty('--mx');
                card.style.removeProperty('--my');
            }
        });
    }

    // 2. 커서 오라
    function aura() {
        var el = document.createElement('div');
        el.className = 'fx-aura';
        el.style.opacity = '0';
        document.body.appendChild(el);
        var x = 0, y = 0, tx = 0, ty = 0, running = false;
        function tick() {
            x += (tx - x) * .15;
            y += (ty - y) * .15;
            el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
            running = Math.abs(tx - x) > .5 || Math.abs(ty - y) > .5;
            if (running) requestAnimationFrame(tick);
        }
        document.addEventListener('pointermove', function (e) {
            tx = e.clientX; ty = e.clientY;
            el.style.opacity = '1';
            if (!running) { running = true; requestAnimationFrame(tick); }
        });
        document.documentElement.addEventListener('pointerleave', function () { el.style.opacity = '0'; });
    }

    // 3. 매트릭스 비
    function rain() {
        if (!document.querySelector('.hero')) return;
        var cv = document.createElement('canvas');
        cv.className = 'fx-rain';
        cv.setAttribute('aria-hidden', 'true');
        document.body.appendChild(cv);
        var ctx = cv.getContext('2d');
        var chars = '01<>/{}[]=;アイウエオカキクケコサシスセソ';
        var colors = ['#00f0ff', '#ff2bd6', '#b6ff3b', '#8b5cff'];
        var size = 16, cols = 0, drops = [], last = 0;

        function resize() {
            var dpr = Math.min(window.devicePixelRatio || 1, 2);
            cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            cols = Math.ceil(innerWidth / size);
            drops = [];
            for (var i = 0; i < cols; i++) drops.push(Math.random() * -innerHeight / size);
        }
        function draw(t) {
            requestAnimationFrame(draw);
            if (document.hidden || t - last < 50) return;   // 약 20fps
            last = t;
            ctx.fillStyle = 'rgba(7, 7, 15, .18)';
            ctx.fillRect(0, 0, innerWidth, innerHeight);
            ctx.font = size + 'px "JetBrains Mono", monospace';
            for (var i = 0; i < cols; i++) {
                ctx.fillStyle = colors[i % colors.length];
                ctx.fillText(chars[Math.random() * chars.length | 0], i * size, drops[i] * size);
                if (drops[i] * size > innerHeight && Math.random() > .975) drops[i] = 0;
                drops[i]++;
            }
        }
        resize();
        addEventListener('resize', resize);
        requestAnimationFrame(draw);
    }

    // 4. 터미널 타이핑 — 줄마다 <span class="t-line"> 로 감싸고 CSS 가 순서대로 펼침
    function typing() {
        document.querySelectorAll('.terminal pre').forEach(function (pre) {
            pre.innerHTML = pre.innerHTML.split('\n').map(function (line, i) {
                return '<span class="t-line" style="--i:' + i + '">' + line + '</span>';
            }).join('\n');
        });
    }

    // 6. 입력 가능한 터미널 — <div class="terminal" data-shell>
    //    명령어: help, ls, cd <이름>, whoami, date, echo, clear, matrix, sudo
    //    ls / cd 대상은 페이지의 카드 링크(.course-card, .stack-card)에서 자동으로 만듭니다.
    function shell() {
        document.querySelectorAll('.terminal[data-shell]').forEach(function (term) {
            var pre = term.querySelector('pre');
            if (!pre) return;

            // 원래 마지막 줄("$ █")은 입력창으로 대체
            pre.innerHTML = pre.innerHTML.replace(/\n?[^\n]*t-cursor[^\n]*$/, '');
            var lineCount = pre.innerHTML.split('\n').length;

            var targets = {};
            document.querySelectorAll('a.course-card, a.stack-card').forEach(function (a) {
                var parts = a.getAttribute('href').split('/');
                var key = parts.length > 1 ? parts[parts.length - 2] : parts[0];
                var name = a.querySelector('.name');
                targets[key.toLowerCase()] = { href: a.href, label: name ? name.textContent : key };
            });
            var keys = Object.keys(targets);

            var row = document.createElement('label');
            row.className = 't-input';
            row.style.setProperty('--i', lineCount);
            row.innerHTML = '<span class="t-prompt">$</span><input type="text" spellcheck="false" autocomplete="off" aria-label="터미널 명령어 입력" placeholder="help 를 입력해 보세요">';
            term.appendChild(row);
            var hint = document.createElement('span');
            hint.className = 't-hint';
            hint.textContent = 'TYPE HERE';
            term.appendChild(hint);
            term.removeAttribute('aria-hidden');
            pre.setAttribute('aria-live', 'polite');

            var input = row.querySelector('input');
            var history = [], hIdx = 0;

            function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
            function print(html, cls) {
                pre.insertAdjacentHTML('beforeend', '<span class="t-out' + (cls ? ' ' + cls : '') + '">' + html + '</span>');
                pre.scrollTop = pre.scrollHeight;
            }

            var COMMANDS = {
                help: function () {
                    print('사용 가능한 명령어\n' +
                        '  <span class="t-key">ls</span>          이동할 수 있는 곳 보기\n' +
                        '  <span class="t-key">cd</span> <span class="t-str">&lt;이름&gt;</span>   해당 페이지로 이동\n' +
                        '  <span class="t-key">whoami</span>      나는 누구?\n' +
                        '  <span class="t-key">date</span>        현재 시각\n' +
                        '  <span class="t-key">echo</span> <span class="t-str">&lt;말&gt;</span>   따라 말하기\n' +
                        '  <span class="t-key">matrix</span>      배경 비 켜기/끄기\n' +
                        '  <span class="t-key">clear</span>       화면 지우기');
                },
                ls: function () {
                    print(keys.map(function (k) { return '<span class="t-key">' + esc(k) + '/</span>  <span class="t-com"># ' + esc(targets[k].label) + '</span>'; }).join('\n'));
                },
                cd: function (arg) {
                    var k = (arg || '').replace(/\/$/, '').toLowerCase();
                    if (!k) return print('사용법: cd &lt;이름&gt;  (ls 로 목록 확인)', 't-err');
                    if (k === '..' || k === '~') return print('여기가 최상위예요 :)', 't-com');
                    var t = targets[k];
                    if (!t) return print('cd: ' + esc(k) + ': 그런 곳이 없어요. ls 를 입력해 보세요', 't-err');
                    print('→ ' + esc(t.label) + ' 로 이동합니다...', 't-ok');
                    setTimeout(function () { location.href = t.href; }, 450);
                },
                whoami: function () {
                    print('pullcoder <span class="t-com"># 배운 것을 코드로 기록하는 학생 개발자</span>');
                },
                date: function () { print(esc(new Date().toLocaleString('ko-KR'))); },
                echo: function (arg) { print(esc(arg || '')); },
                clear: function () { pre.innerHTML = ''; },
                matrix: function () {
                    var cv = document.querySelector('.fx-rain');
                    if (!cv) return print('matrix: 이 환경에서는 꺼져 있어요', 't-err');
                    cv.hidden = !cv.hidden;
                    print('matrix ' + (cv.hidden ? 'OFF' : 'ON'), 't-ok');
                },
                sudo: function () { print('권한이 없습니다. 이 사건은 보고됩니다. 🚨', 't-err'); }
            };
            COMMANDS.dir = COMMANDS.ls;
            COMMANDS.cls = COMMANDS.clear;

            function run(raw) {
                var line = raw.trim();
                print('<span class="t-prompt">$</span> <span class="t-cmd">' + esc(line) + '</span>');
                if (!line) return;
                history.push(line); hIdx = history.length;
                var sp = line.indexOf(' ');
                var cmd = (sp < 0 ? line : line.slice(0, sp)).toLowerCase();
                var arg = sp < 0 ? '' : line.slice(sp + 1).trim();
                if (COMMANDS[cmd]) COMMANDS[cmd](arg);
                else if (targets[cmd.replace(/\/$/, '')]) COMMANDS.cd(cmd);   // 이름만 입력해도 이동
                else print(esc(cmd) + ': 명령어를 찾을 수 없어요. help 를 입력해 보세요', 't-err');
            }

            input.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') { run(input.value); input.value = ''; }
                else if (e.key === 'ArrowUp' && history.length) { hIdx = Math.max(0, hIdx - 1); input.value = history[hIdx]; e.preventDefault(); }
                else if (e.key === 'ArrowDown' && history.length) { hIdx = Math.min(history.length, hIdx + 1); input.value = history[hIdx] || ''; e.preventDefault(); }
                else if (e.key === 'Tab') {
                    // 자동완성: 명령어 또는 cd 대상
                    var m = input.value.match(/^(cd\s+)?(\S*)$/i);
                    if (!m) return;
                    var pool = m[1] ? keys : Object.keys(COMMANDS);
                    var hit = pool.filter(function (k) { return k.indexOf(m[2].toLowerCase()) === 0; });
                    if (hit.length === 1) input.value = (m[1] || '') + hit[0] + (m[1] ? '' : ' ');
                    else if (hit.length > 1) print(hit.join('  '), 't-com');
                    e.preventDefault();
                }
            });
            input.addEventListener('focus', function () { hint.remove(); }, { once: true });
            term.addEventListener('click', function () {
                if (!window.getSelection().toString()) input.focus({ preventScroll: true });
            });
        });
    }

    // 5. 스크롤 등장
    function reveal() {
        if (!('IntersectionObserver' in window)) return;
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
            });
        }, { threshold: .12 });
        document.querySelectorAll('main .section').forEach(function (el) {
            el.classList.add('reveal');
            io.observe(el);
        });
    }

    function init() {
        spotlight();
        shell();
        if (calm) return;
        if (finePointer) aura();
        rain();
        typing();
        reveal();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
