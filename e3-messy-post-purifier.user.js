// ==UserScript==
// @name         e3 messy post purifier
// @namespace    https://e3.nycu.edu.tw/
// @version      0.1
// @description  omg
// @author       CSY54
// @match        https://e3.nycu.edu.tw/mod/forum/view.php*
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

  const e = document.getElementById('intro')
  e.parentNode.replaceChild(purifyDOM(e), e)
})();
