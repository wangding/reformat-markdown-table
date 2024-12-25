(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var utils = require('./utils.js');


module.exports = reformat;


function reformat(str) {
  var table = utils.splitStringToTable(str),
      alignments,
      max_length_per_column;

  table[1] = table[1].map(function(cell) {
    return utils.padHeaderSeparatorString(cell, 0);
  });

  utils.fillInMissingColumns(table);

  alignments = table[1].map(utils.getAlignment);
  max_length_per_column = utils.getMaxLengthPerColumn(table);

  return table.map(function(row, row_index) {
    return '|' + row.map(function(cell, column_index) {
      var column_length = max_length_per_column[column_index];
      if (row_index === 1) {
        return utils.padHeaderSeparatorString(cell, column_length + 2);
      }
      return ' ' + utils.padStringWithAlignment(cell, column_length, alignments[column_index]) + ' ';
    }).join('|') + '|';
  }).join('\n') + '\n';
}

},{"./utils.js":2}],2:[function(require,module,exports){
'use strict';

exports.splitStringToTable = splitStringToTable;
exports.getMaxLengthPerColumn = getMaxLengthPerColumn;
exports.getMaxLength = getMaxLength;
exports.padHeaderSeparatorString = padHeaderSeparatorString;
exports.getAlignment = getAlignment;
exports.fillInMissingColumns = fillInMissingColumns;
exports.getColumn = getColumn;
exports.trim = trim;
exports.padStringWithAlignment = padStringWithAlignment;
exports.padLeft = padLeft;
exports.padRight = padRight;
exports.padLeftAndRight = padLeftAndRight;
exports.getPadding = getPadding;
exports.repeatStr = repeatStr;


function splitStringToTable(str) {
  return trim(String(str)).split('\n').map(function(row) {
    row = row.replace(/^\s*\|/, '');
    row = row.replace(/\|\s*$/, '');
    return row.split('|').map(trim);
  });
}


function getMaxLengthPerColumn(table) {
  return table[0].map(function(str, column_index) {
    return getMaxLengthOfColumn(getColumn(table, column_index));
  });
}


function getMaxLengthOfColumn(array) {
  return array.reduce(function(max, item) {
    return Math.max(max, getItemLength(item));
  }, 0);
}


function getItemLength(str) {
   var len = 0, i;
   for(i = 0; i < str.length; i++) {
     len += (str.charCodeAt(i) >= 0 && str.charCodeAt(i) <= 128) ? 1 : 2;
   }
   return len;
}


function getMaxLength(array) {
  return array.reduce(function(max, item) {
    return Math.max(max, item.length);
  }, 0);
}


function padHeaderSeparatorString(str, len) {
  switch (getAlignment(str)) {
    case 'l': return repeatStr('-', Math.max(3, len));
    case 'c': return ':' + repeatStr('-', Math.max(3, len - 2)) + ':';
    case 'r': return repeatStr('-', Math.max(3, len - 1)) + ':';
  }
}


function getAlignment(str) {
  if (str[str.length - 1] === ':') {
    return str[0] === ':' ? 'c' : 'r';
  }
  return 'l';
}


function fillInMissingColumns(table) {
  var max = getMaxLength(table);
  table.forEach(function(row, i) {
    while (row.length < max) {
      row.push(i === 1 ? '---' : '');
    }
  });
}


function getColumn(table, column_index) {
  return table.map(function(row) {
    return row[column_index];
  });
}


function trim(str) {
  return str.trim();
}


function padStringWithAlignment(str, len, alignment) {
  switch (alignment) {
    case 'l': return padRight(str, len);
    case 'c': return padLeftAndRight(str, len);
    case 'r': return padLeft(str, len);
  }
}


function padLeft(str, len) {
  return getPadding(len - getItemLength(str)) + str;
}


function padRight(str, len) {
  return str + getPadding(len - getItemLength(str));
}


function padLeftAndRight(str, len) {
  var l = (len - getItemLength(str)) / 2;
  return getPadding(Math.ceil(l)) + str + getPadding(Math.floor(l));
}


function getPadding(len) {
  return repeatStr(' ', len);
}


function repeatStr(str, count) {
  return count > 0 ? Array(count + 1).join(str) : '';
}

},{}],3:[function(require,module,exports){
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

},{"../lib/reformat-table.js":1}]},{},[3]);
