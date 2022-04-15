import * as utils from './utils'

function reformat(str: string) {
  const table = utils.splitStringToTable(str)

  table[1] = table[1].map(function (cell) {
    return utils.padHeaderSeparatorString(cell, 0)
  })

  utils.fillInMissingColumns(table)

  const alignments = table[1].map(utils.getAlignment)
  const max_length_per_column = utils.getMaxLengthPerColumn(table)

  return table.map(function (row, row_index) {
    return '|' + row.map(function (cell, column_index) {
      const column_length = max_length_per_column[column_index]
      if (row_index === 1) {
        return utils.padHeaderSeparatorString(cell, column_length + 2)
      }
      return ' ' + utils.padStringWithAlignment(cell, column_length, alignments[column_index]) + ' '
    }).join('|') + '|'
  })
}

export function reformatReadmeDoc(str: string, formatString: string) {
  utils.setFormatString(formatString)
  let i = 0, j = 0, items = str.split('\n')
  let codeBlock = false
  for (; i < items.length;) {
    if (items[i].trimLeft().startsWith('```')) {
      codeBlock = !codeBlock
    }
    if (
      !codeBlock
      && items[i].trimLeft().startsWith('|')
      && (items[i].length - items[i].replace(/\|/g, '').length >= 2)
    ) {
      j = i
      while (j < items.length &&
      items[j].trimLeft().startsWith('|') &&
      (items[j].length - items[j].replace(/\|/g, '').length >= 2)) {
        j++
      }
      items = items.slice(0, i).concat(reformat(items.slice(i, j).join('\n'))).concat(items.slice(j))
      i = j
    } else {
      i++
    }
  }

  return items.join('\n')
}
