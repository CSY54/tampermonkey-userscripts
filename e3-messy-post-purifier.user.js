// ==UserScript==
// @name         e3 messy post purifier
// @namespace    https://e3.nycu.edu.tw/
// @version      0.2
// @description  omg
// @author       CSY54
// @match        https://e3.nycu.edu.tw/theme/dcpc/news/news_view.php*
// @match        https://e3.nycu.edu.tw/mod/forum/view.php*
// @match        https://e3.nycu.edu.tw/mod/dcpcforum/view.php*
// @match        https://e3.nycu.edu.tw/mod/dcpcforum/discuss.php*
// @match        https://e3.nycu.edu.tw/mod/dcpcforum/index.php*
// @match        https://e3.nycu.edu.tw/course/view.php*
// @match        https://e3.nycu.edu.tw/mod/folder/view.php*
// @updateURL    https://github.com/CSY54/tampermonkey-userscripts/raw/master/e3-messy-post-purifier.user.js
// @downloadURL  https://github.com/CSY54/tampermonkey-userscripts/raw/master/e3-messy-post-purifier.user.js
// ==/UserScript==

(function () {
  'use strict';

  function purifyDOM(node) {
    const res = document.createElement(node.tagName)
    node.classList.forEach((className) => {
      res.classList.add(className)
    })
    for (const childNode of node.childNodes) {
      switch (childNode.nodeType) {
        case Node.TEXT_NODE: {
          const curNode = document.createTextNode(childNode.textContent)
          res.appendChild(curNode)
          break
        }

        case Node.ELEMENT_NODE: {
          if (childNode.tagName === 'IMG') {
            res.appendChild(childNode)
            break
          }
          const curNode = purifyDOM(childNode)
          res.appendChild(curNode)
          break
        }

        default:
          console.info('ignore node:', childNode)
      }
    }
    return res;
  }

  const elements = document.querySelectorAll('div.no-overflow')
  for (const e of elements) {
    e.parentNode.replaceChild(purifyDOM(e), e)
  }
})();
