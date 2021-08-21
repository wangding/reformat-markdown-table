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
exports.setFormatString = setFormatString;

// 汉字数量对应空格数量
var format = {
  '0': 0,
  '1': 2,
  '2': 3,
  '3': 5
}, formatKeys = Object.keys(format);

function splitStringToTable(str) {
  return trim(String(str)).split('\n').map(function (row) {
    row = row.replace(/^\s*\|/, '');
    row = row.replace(/\|\s*$/, '');
    return row.split('|').map(trim);
  });
}

function getMaxLengthPerColumn(table) {
  return table[0].map(function (str, column_index) {
    return getMaxLengthOfColumn(getColumn(table, column_index));
  });
}

function getMaxLengthOfColumn(array) {
  return array.reduce(function (max, item) {
    return Math.max(max, getItemLength(item));
  }, 0);
}

function getItemLength(str) {
  const acc = str.split('').reduce(function (acc, char) {
    if (char.charCodeAt(0) >= 0 && char.charCodeAt(0) <= 128) {
      acc.len++;
    }
    else {
      acc.chineseLen++;
    }

    return acc;
  }, {
    len: 0,
    chineseLen: 0
  });

  // 计算中文需要预留的长度，以最大的数量分割，计算整倍长度，然后加上预留剩余预留长度
  acc.len += Math.floor(acc.chineseLen / (formatKeys.length - 1)) * format[formatKeys[formatKeys.length - 1]] +
    format[acc.chineseLen % (formatKeys.length - 1) + ''];
  return acc.len;
}

function getMaxLength(array) {
  return array.reduce(function (max, item) {
    return Math.max(max, item.length);
  }, 0);
}

function padHeaderSeparatorString(str, len) {
  switch (getAlignment(str)) {
    case 'l':
      return repeatStr('-', Math.max(3, len));
    case 'c':
      return ':' + repeatStr('-', Math.max(3, len - 2)) + ':';
    case 'r':
      return repeatStr('-', Math.max(3, len - 1)) + ':';
  }
}

function getAlignment(str) {
  if (str[str.length - 1] === ':') {
    return str[0] === ':' ? 'c' : 'r';
  }
  return 'l';
}

function fillInMissingColumns(table) {
  const max = getMaxLength(table);
  table.forEach(function (row, i) {
    while (row.length < max) {
      row.push(i === 1 ? '---' : '');
    }
  });
}

function getColumn(table, column_index) {
  return table.map(function (row) {
    return row[column_index];
  });
}

function trim(str) {
  return str.trim();
}

function padStringWithAlignment(str, len, alignment) {
  switch (alignment) {
    case 'l':
      return padRight(str, len);
    case 'c':
      return padLeftAndRight(str, len);
    case 'r':
      return padLeft(str, len);
  }
}

function padLeft(str, len) {
  return getPadding(len - getItemLength(str)) + str;
}

function padRight(str, len) {
  return str + getPadding(len - getItemLength(str));
}

function padLeftAndRight(str, len) {
  const l = (len - getItemLength(str)) / 2;
  return getPadding(Math.ceil(l)) + str + getPadding(Math.floor(l));
}

function getPadding(len) {
  return repeatStr(' ', len);
}

function repeatStr(str, count) {
  return count > 0 ? Array(count + 1).join(str) : '';
}

function setFormatString(formatString) {
  if (formatString) {
    try {
      format = JSON.parse(formatString);
      formatKeys = Object.keys(format);

      for (let i = 0; i < formatKeys.length; i++) {
        if (!formatKeys.includes(i.toString())) {
          console.log('Correspondence between the number of characters is wrong');
          process.exit();
        }
      }
    }
    catch (e) {
      if (e instanceof SyntaxError) {
        console.log('not a json string', formatString);
        process.exit();
      }
      throw e
    }
  }
}
