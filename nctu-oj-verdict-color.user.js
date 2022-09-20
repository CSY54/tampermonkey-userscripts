// ==UserScript==
// @name         Colorize Verdict
// @namespace    https://oj.nctu.edu.tw/
// @version      0.1
// @description  Add verdict color on oj.nctu.edu.tw
// @author       CSY54
// @match        https://oj.nctu.edu.tw/*
// @grant        none
// @run-at       document-start
// @updateURL    https://github.com/CSY54/tampermonkey-userscripts/raw/master/nctu-oj-verdict-color.user.js
// @downloadURL  https://github.com/CSY54/tampermonkey-userscripts/raw/master/nctu-oj-verdict-color.user.js
// ==/UserScript==

(function() {
  'use strict';

  const _setInterval = setInterval;
  let registered = false;

  // taken from uHunt
  const styleText = `
    [class*=verdict-] { font-weight: bold; }
    .verdict-AC { color: #00AA00; }
    .verdict-WA { color: #FF0000; }
    .verdict-CE	{ color: #AAAA00; }
    .verdict-RE { color: #00AAAA; }
    .verdict-TLE {color: #0000FF; }
    .verdict-Pending { color: #000000; }
  `;

  const style = document.createElement('style');
  style.textContent = styleText;
  document.head.appendChild(style);

  const addColor = () => {
    const submissions = document.querySelectorAll('tr td:nth-child(6)');

    submissions.forEach((el) => {
      el.classList.add(`verdict-${el.innerText}`);
    });
  };

  const _fetch = fetch;
  window.fetch = (...args) => {
    return _fetch(...args).then((res) => {
      return new Promise((resolve, reject) => {
        if (/^https:\/\/api.oj.nctu.edu.tw\/submissions/.test(res.url)) {
          // add color after rendered
          setTimeout(() => {
            addColor();
          }, 250);
        }

        resolve(res);
      });
    });
  };
})();
