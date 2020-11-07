// ==UserScript==
// @name         Dark Theme
// @namespace    https://e3new.nctu.edu.tw/
// @version      0.1
// @description  dark theme!
// @author       CSY54
// @include      https://e3new.nctu.edu.tw/*
// @exclude      https://e3new.nctu.edu.tw/pluginfile.php/*
// @grant        GM_addStyle
// ==/UserScript==

/*
 * Known issue:
 * - Video thumbnail got inverted
 */

(function() {
  'use strict';

  const styleText = `
    html {
      background: #000;
      filter: invert(0.9) hue-rotate(180deg) !important;
    }

    html,
    .layer2_left_caption,
    .buttoncaptiona,
    .btn2018_sp_caption,
    .course-link:hover,
    .course-link,
    .cal_title .caption,
    .cal_title .caption2,
    .BarCard-item a,
    *[class*="cal_"],
    *[class*="BarCard-"] {
      font-family: "Noto Sans TC", PingFangTC, "Microsoft JhengHei", "PT Sans", Arial, Helvetica, sans-serif !important;
    }

    img, iframe, *[style*="color:#c0c0c0"] {
      filter: invert(1.1) hue-rotate(180deg) !important;
    }

    .btn-group.dropup {
      margin-top: -20px;
    }

    footer {
      display: none;
    }
    `

  // add global style
  // Can't use GM_addStyle() since some font-family attributes are !important
  // GM_addStyle(styleText);

  // fuck those !important ==
  const style = document.createElement('style')
  style.textContent = styleText;
  document.body.appendChild(style);
})();
