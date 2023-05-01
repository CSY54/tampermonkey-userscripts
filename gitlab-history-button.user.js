// ==UserScript==
// @name         GitLab History Button
// @namespace    https://gitlab.com
// @version      0.2
// @description  Show history button on project page
// @author       CSY54
// @include      https://gitlab.*
// @icon         https://gitlab.com/assets/favicon-72a2cad5025aa931d6ea56c3201d1f18e68a8cd39788c7c80d5b2b82aa5143ef.png
// @grant        none
// @updateURL    https://github.com/CSY54/tampermonkey-userscripts/raw/master/gitlab-history-button.user.js
// @downloadURL  https://github.com/CSY54/tampermonkey-userscripts/raw/master/gitlab-history-button.user.js
// ==/UserScript==

(async function() {
    'use strict';

    const repoName = document.querySelector('.home-panel-title');
    if (!repoName) {
        return;
    }

    async function until(cb) {
        const RETRY_LIMIT = 60;
        let retryCount = 0;
        return new Promise((res, rej) => {
            const id = setInterval(() => {
                if (cb()) {
                    clearInterval(id);
                    res();
                }

                retryCount++;
                if (retryCount > RETRY_LIMIT) {
                    clearInterval(id);
                    rej();
                }
            }, 1000);
        });
    }

    until(() => {
        try {
            return document.querySelector('.tree-ref-holder button').textContent.trim() !== '';
        } catch {
            return false;
        }
    }).then(() => {
        const path = window.location.pathname;
        const currentBranch = document.querySelector('.tree-ref-holder button').textContent.trim()
        const historyPath = new URL(`${path}/-/commits/${currentBranch}/`, window.location.href).pathname
        const button = `<a href="${historyPath}" class="btn btn-default btn-md gl-button"><span class="gl-button-text">History</span></a>`
        document.querySelector('.tree-controls > div').children[1].insertAdjacentHTML('beforebegin', button)
    }).catch(() => {})
})();
