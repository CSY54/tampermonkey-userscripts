// ==UserScript==
// @name         e3 Course Structure Modifier
// @namespace    https://e3.nycu.edu.tw/
// @version      0.1
// @description  better, lol
// @author       CSY54
// @match        https://e3.nycu.edu.tw/my/
// @updateURL    https://github.com/CSY54/nctu-tampermonkey-userscript/raw/master/e3-course-structure-modifier.user.js
// @downloadURL  https://github.com/CSY54/nctu-tampermonkey-userscript/raw/master/e3-course-structure-modifier.user.js
// ==/UserScript==

/**
 * Modify the structure of course list from:
 *
 * My Courses
 *     【109 Autumn】0000 Course 00
 *     【109 Autumn】0001 Course 01
 *     【109 Autumn】0002 Course 02
 *     ---
 *     【109 Spring】0100 Course 10
 *     【109 Spring】0101 Course 11
 *     【109 Spring】0102 Course 12
 *     ---
 *      General A
 *      General B
 *
 * Into:
 *
 * 109 Spring
 *     0100 Course 10
 *     0101 Course 11
 *     0102 Course 12
 *
 * 109 Autumn
 *     0000 Course 00
 *     0001 Course 01
 *     0002 Course 02
 *
 * Other
 *     General A
 *     General B
 */

(function() {
  'use strict';

  const data = [...document.querySelectorAll('#layer2_right_current_course_left .layer2_right_current_course_stu_link .course-link')]
    .map((e) => {
      const {
        semester,
        course
      } = /^ +(【(?<semester>\d{3} (Autumn|Spring))】)?(?<course>(\d{4})? ?.*) +$/.exec(e.innerText).groups;

      return {
        href: e.href,
        semester,
        course: course.trim(),
      };
    })
    .reduce((acc, { href, semester = 'Other', course }) => {
      if (!(semester in acc)) {
        acc[semester] = [];
      }

      acc[semester].push({ href, course });

      return acc;
    }, {});

  const sortedKey = Object.keys(data).reverse();
  sortedKey.push(sortedKey.shift());

  const genDOM = (data, key) => key
    .map((key) => {
      const innerHTML = data[key]
        .map(({ href, course }) => {
          const a = document.createElement('a');
          a.href = href;
          a.classList.add('course-link');
          a.textContent = `${'\u00A0'.repeat(4)}${course}${'\u00A0'.repeat(4)}`;

          const div = document.createElement('div');
          div.classList.add('layer2_right_current_course_stu_link');
          div.appendChild(a);

          return div;
        });

      const title = document.createElement('div');
      title.classList.add('layer2_left_caption');
      title.textContent = key;

      const wrapper = document.createElement('div');
      wrapper.style.marginBottom = '1.5rem';
      wrapper.appendChild(title);
      wrapper.append(...innerHTML);

      return wrapper;
    });

  const container = document.querySelector('.layer2_left #layer2_right_current_course_left');
  container.innerHTML = '';
  container.append(...genDOM(data, sortedKey));

  const container2 = document.querySelector('.layer2_right #layer2_right_current_course_stu');
  container2.innerHTML = '';
  container2.append(...genDOM(data, sortedKey));
})();
