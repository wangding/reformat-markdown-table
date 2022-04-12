// 汉字数量对应空格数量
let format = {
  '0': 0,
  '1': 2,
  '2': 3,
  '3': 5,
} as any
let formatKeys = Object.keys(format)

export function splitStringToTable(str: string) {
  return trim(String(str)).split('\n').map(function (row) {
    row = row.replace(/^\s*\|/, '')
    row = row.replace(/\|\s*$/, '')
    return row.split('|').map(trim)
  })
}

export function getMaxLengthPerColumn(table: string[][]) {
  return table[0].map(function (str, column_index) {
    return getMaxLengthOfColumn(getColumn(table, column_index))
  })
}

export function getMaxLengthOfColumn(array: string[]) {
  return array.reduce(function (max, item) {
    return Math.max(max, getItemLength(item))
  }, 0)
}

export function getItemLength(str: string) {
  const acc = str.split('').reduce(function (acc, char) {
    if (char.charCodeAt(0) >= 0 && char.charCodeAt(0) <= 128) {
      acc.len++
    } else {
      acc.chineseLen++
    }

    return acc
  }, {
    len: 0,
    chineseLen: 0,
  })

  // 计算中文需要预留的长度，以最大的数量分割，计算整倍长度，然后加上预留剩余预留长度
  acc.len += Math.floor(acc.chineseLen / (formatKeys.length - 1)) *
  format[(formatKeys as any)[formatKeys.length - 1] as any] as number +
  format[acc.chineseLen % (formatKeys.length - 1) + ''] as number
  return acc.len
}

export function getMaxLength(array: string[][]) {
  return array.reduce(function (max, item) {
    return Math.max(max, item.length)
  }, 0)
}

export function padHeaderSeparatorString(str: string, len: number) {
  switch (getAlignment(str)) {
    case 'l':
      return repeatStr('-', Math.max(3, len))
    case 'c':
      return ':' + repeatStr('-', Math.max(3, len - 2)) + ':'
    case 'r':
      return repeatStr('-', Math.max(3, len - 1)) + ':'
  }
}

export function getAlignment(str: string) {
  if (str[str.length - 1] === ':') {
    return str[0] === ':' ? 'c' : 'r'
  }
  return 'l'
}

export function fillInMissingColumns(table: string[][]) {
  const max = getMaxLength(table)
  table.forEach(function (row: string[], i: number) {
    while (row.length < max) {
      row.push(i === 1 ? '---' : '')
    }
  })
}

export function getColumn(table: string[][], column_index: number) {
  return table.map(function (row: string[]) {
    return row[column_index]
  })
}

export function trim(str: string) {
  return str.trim()
}

export function padStringWithAlignment(str: string, len: number, alignment: string) {
  switch (alignment) {
    case 'l':
      return padRight(str, len)
    case 'c':
      return padLeftAndRight(str, len)
    case 'r':
      return padLeft(str, len)
  }
}

export function padLeft(str: string, len: number): string {
  return getPadding(len - getItemLength(str)) + str
}

export function padRight(str: string, len: number): string {
  return str + getPadding(len - getItemLength(str))
}

export function padLeftAndRight(str: string, len: number): string {
  const l = (len - getItemLength(str)) / 2
  return getPadding(Math.ceil(l)) + str + getPadding(Math.floor(l))
}

export function getPadding(len: number): string {
  return repeatStr(' ', len)
}

export function repeatStr(str: string, count: number): string {
  return count > 0 ? Array(count + 1).join(str) : ''
}

export function setFormatString(formatString: string) {
  if (formatString) {
    try {
      format = JSON.parse(formatString)
      formatKeys = Object.keys(format)

      for (let i = 0; i < formatKeys.length; i++) {
        if (!formatKeys.includes(i.toString())) {
          console.log('Correspondence between the number of characters is wrong')
          process.exit()
        }
      }
    } catch (e) {
      if (e instanceof SyntaxError) {
        console.log('not a json string', formatString)
        process.exit()
      }
      throw e
    }
  }
}
