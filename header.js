(function () {
    var css = `
        .site-header {
            background: #2c3e50;
            color: white;
            padding: 0.75rem 1.5rem;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        .site-header .header-inner {
            max-width: 1000px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .site-header .back-btn {
            color: #bdc3c7;
            text-decoration: none;
            font-size: 14px;
            white-space: nowrap;
            padding: 4px 12px;
            border: 1px solid #7f8c8d;
            border-radius: 4px;
            transition: color 0.2s, border-color 0.2s;
            flex-shrink: 0;
        }
        .site-header .back-btn:hover {
            color: white;
            border-color: white;
        }
        .site-header nav {
            flex: 1;
        }
        .site-header nav ul {
            display: flex;
            justify-content: center;
            list-style: none;
            margin: 0;
            padding: 0;
            flex-wrap: wrap;
            gap: 0 24px;
        }
        .site-header nav a {
            color: white;
            text-decoration: none;
            font-weight: bold;
            font-size: 15px;
            transition: color 0.2s;
        }
        .site-header nav a:hover {
            color: #5dade2;
        }
        .site-header nav .nav-soon {
            color: #7f8c8d;
            cursor: default;
            font-weight: bold;
            font-size: 15px;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .site-header nav .soon-badge {
            display: inline-block;
            font-size: 9px;
            font-weight: normal;
            background: rgba(255,255,255,0.15);
            color: #bdc3c7;
            padding: 2px 6px;
            border-radius: 10px;
            letter-spacing: 0;
        }
        @media (max-width: 600px) {
            .site-header {
                padding: 0.6rem 0.8rem;
            }
            .site-header nav ul {
                gap: 0 12px;
            }
            .site-header nav a {
                font-size: 13px;
            }
            .site-header .back-btn {
                font-size: 12px;
                padding: 3px 8px;
            }
            .site-header nav .nav-soon {
                font-size: 13px;
            }
        }
    `;

    function injectCSS() {
        var style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    window.loadHeader = function (options) {
        options = options || {};
        var base = options.base !== undefined ? options.base : '';
        var isHome = options.isHome !== undefined ? options.isHome : false;

        injectCSS();

        var backBtn = isHome
            ? ''
            : '<a href="#" onclick="history.back(); return false;" class="back-btn">&#8592; 이전</a>';

        var navItems = isHome
            ? '<li><a href="' + base + 'index.html#intro">소개</a></li>' +
              '<li><a href="' + base + 'index.html#tech-stack">기술 스택</a></li>' +
              '<li><a href="' + base + 'index.html#gallery">갤러리</a></li>' +
              '<li><a href="' + base + 'index.html#server-security">보안 소개</a></li>' +
              '<li><a href="' + base + 'index.html#sns-links">SNS</a></li>'
            : '<li><a href="' + base + 'index.html">메인화면</a></li>' +
              '<li><a href="' + base + 'html/HtmlList.html">HTML</a></li>' +
              '<li><span class="nav-soon">CSS<span class="soon-badge">준비 중</span></span></li>' +
              '<li><span class="nav-soon">JavaScript<span class="soon-badge">준비 중</span></span></li>';

        var html =
            '<header class="site-header">' +
                '<div class="header-inner">' +
                    backBtn +
                    '<nav>' +
                        '<ul>' + navItems + '</ul>' +
                    '</nav>' +
                '</div>' +
            '</header>';

        document.body.insertAdjacentHTML('afterbegin', html);
    };
})();
