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
            : '<a href="' + base + 'index.html" class="back-btn">&#8592; 이전</a>';

        var html =
            '<header class="site-header">' +
                '<div class="header-inner">' +
                    backBtn +
                    '<nav>' +
                        '<ul>' +
                            '<li><a href="' + base + 'index.html#security">보안 소개</a></li>' +
                            '<li><a href="' + base + 'index.html#class">수업 정보</a></li>' +
                            '<li><a href="' + base + 'index.html#gallery">갤러리</a></li>' +
                        '</ul>' +
                    '</nav>' +
                '</div>' +
            '</header>';

        document.body.insertAdjacentHTML('afterbegin', html);
    };
})();
