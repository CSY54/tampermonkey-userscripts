// ==UserScript==
// @name         Colorize Verdict
// @namespace    https://oj.nctu.edu.tw/
// @version      0.1
// @description  Add verdict color on oj.nctu.edu.tw
// @author       CSY54
// @match        https://oj.nctu.edu.tw/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

/*
 * TODO:
 * - Add color on page load
 */

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
  }

  // TODO: add color after first request
  // window.onload = () => addColor();

  window.setInterval = (fn, tm) => {
    _setInterval(
      tm == 1e4 && !registered ? () => {
        registered = true;
        fn();
        addColor();
      } : fn(),
      tm
    );
  };
})();
