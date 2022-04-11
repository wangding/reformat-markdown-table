import 'should'
import * as utils from '../lib/utils'

describe('utils', function () {
  describe('splitStringToTable', function () {
    it('should split input string to a 2D array', function () {
      const input = [
          '| Header 1 |   Header 2   | Header 3|H|',
          '| --- | --- | :---: | :---: |',
          '| aaa |bbb| ccc | ddd |',
          '   |   eee |fff',
        ].join('\n'),
        output = [
          ['Header 1', 'Header 2', 'Header 3', 'H'],
          ['---', '---', ':---:', ':---:'],
          ['aaa', 'bbb', 'ccc', 'ddd'],
          ['eee', 'fff'],
        ]

      utils.splitStringToTable(input).should.eql(output)
    })
  })
})
