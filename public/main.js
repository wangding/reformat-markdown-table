'use strict';

var reformatBtn, mdTable,
    reformat = require('../lib/reformat-table.js');

/*eslint-env browser*/
/* global $forkMeGH, $bszPageFooter */
window.onload = function() {
  reformatBtn = document.getElementById('reformat-btn');
  mdTable = document.getElementById('md-table');
  $forkMeGH.show('https://github.com/wangding/reformat-markdown-table');
  $bszPageFooter.show('body');

  reformatBtn.onclick = function() {
    mdTable.value = reformat(mdTable.value);
  };
};
