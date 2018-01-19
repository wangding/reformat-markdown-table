'use strict';

var reformatBtn, mdTable,
    reformat = require('../lib/reformat-table.js');

/*eslint-env browser*/
window.onload = function() {
  reformatBtn = document.getElementById('reformat-btn');
  mdTable = document.getElementById('md-table');

  reformatBtn.onclick = function() {
    mdTable.value = reformat(mdTable.value);
  };
};
