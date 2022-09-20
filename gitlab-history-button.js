// ==UserScript==
// @name         GitLab History Button
// @namespace    https://gitlab.com
// @version      0.1
// @description  Show history button on project page
// @author       CSY54
// @include      https://gitlab.*
// @icon         https://gitlab.com/assets/favicon-72a2cad5025aa931d6ea56c3201d1f18e68a8cd39788c7c80d5b2b82aa5143ef.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const repoName = document.querySelector('.home-panel-title');
    if (!repoName) {
        return;
    }

    const path = window.location.pathname;
    const currentBranch = document.querySelector('.project-refs-form').querySelector('.dropdown-toggle-text').textContent;
    const historyPath = new URL(`${path}/-/commits/${currentBranch}/`, window.location.href).pathname
    const button = `<a href="${historyPath}" class="btn btn-default btn-md gl-button"><span class="gl-button-text">History</span></a>`
    document.querySelector('.tree-controls div').children[0].insertAdjacentHTML('beforebegin', button)
})();