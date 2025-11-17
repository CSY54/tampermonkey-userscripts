// ==UserScript==
// @name         Colorize Verdict
// @namespace    https://formosa.oj.cs.nycu.edu.tw/
// @version      0.2
// @description  Add verdict color on Formosa OJ
// @author       CSY54
// @match        https://formosa.oj.cs.nycu.edu.tw/*
// @grant        none
// @run-at       document-start
// @updateURL    https://github.com/CSY54/tampermonkey-userscripts/raw/master/formosa-oj-verdict-color.user.js
// @downloadURL  https://github.com/CSY54/tampermonkey-userscripts/raw/master/formosa-oj-verdict-color.user.js
// ==/UserScript==

;(() => {
  const style = document.createElement('style')
  // taken from uHunt
  style.textContent = `
    [class*=verdict-] { font-weight: bold; }
    .verdict-AC { color: #00AA00; }
    .verdict-WA { color: #FF0000; }
    .verdict-CE	{ color: #AAAA00; }
    .verdict-RE { color: #00AAAA; }
    .verdict-TLE {color: #0000FF; }
    .verdict-Pending { color: #000000; }
  `
  document.head.appendChild(style)

  const addColorByQuerySelector = (querySelector) => {
    const submissions = document.querySelectorAll(querySelector)

    submissions.forEach((el) => {
      el.classList.add(`verdict-${el.innerText}`)
    })

    return submissions.length !== 0
  }

  const getVerdictQuerySelectorByRequestUrl = (url) => {
    // single submission
    if (/\/submissions\/\d+\//.test(url)) {
      return '.panel:nth-child(2) tr td:nth-child(6), .panel:nth-child(3) tr td:nth-child(4)'
    }

    // submissions
    if (/\/submissions\//.test(url)) {
      return '.panel:nth-child(2) tr td:nth-child(6)'
    }

    return undefined
  }

  const _fetch = fetch
  window.fetch = async (...args) => {
    const res = await _fetch(...args)

    if (!/submissions/.test(window.location.href)) {
      return res
    }

    return new Promise((resolve) => {
      const verdictQuerySelector = getVerdictQuerySelectorByRequestUrl(res.url)

      // only apply in submission-related pages
      if (!verdictQuerySelector) {
        resolve(res)

        return
      }

      addColorByQuerySelector(verdictQuerySelector)

      const intervalId = setInterval(() => {
        if (addColorByQuerySelector(verdictQuerySelector)) {
          clearInterval(intervalId)
        }
      }, 250)

      resolve(res)
    })
  }
})()
