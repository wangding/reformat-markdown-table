import { reformatReadmeDoc } from '../lib/reformat-table'
import 'should'

describe('reformat-table', function () {
  it('should reformat a markdown table 1', function () {
    const input = [
        '| Header 1 |   Header 2   | Header 3|H|',
        '| --- | --- | :---: | :---: |',
        '| aaa |bbb| cccc | ddd |',
        '   |   eee |fff',
        '```',
        '| Header 1 |   Header 2   | Header 3|H|',
        '```',
      ].join('\n'),
      output = [
        '| Header 1 | Header 2 | Header 3 |   H   |',
        '|----------|----------|:--------:|:-----:|',
        '| aaa      | bbb      |   cccc   |  ddd  |',
        '| eee      | fff      |          |       |',
        '```',
        '| Header 1 |   Header 2   | Header 3|H|',
        '```'
      ].join('\n')

    reformatReadmeDoc(input, '').should.eql(output)
  })

  it('should reformat a markdown table 2', function () {
    const input = [
        '| 姓名 | 电话 | 邮箱 |',
        '| --- | :---: | ---: |',
        '| 王顶 | 13582027613 | 408542507@qq.com |',
        '| 郭玉朝 | 15703277652 | baldy@163.com |',
        '|  | abc | def',
      ].join('\n'),
      output = [
        '| 姓名   |     电话     |              邮箱 |',
        '|-------|:-----------:|-----------------:|',
        '| 王顶   | 13582027613 | 408542507@qq.com |',
        '| 郭玉朝 | 15703277652 |    baldy@163.com |',
        '|       |     abc     |              def |',
      ].join('\n')

    reformatReadmeDoc(input, '').should.eql(output)
  })

  it('should reformat a markdown table 3', function () {
    const input = [
        '## 标题',
        '',
        '| 姓名 | 电话 | 邮箱 |',
        '| --- | :---: | ---: |',
        '| 王顶 | 13582027613 | 408542507@qq.com |',
        '| 郭玉朝 | 15703277652 | baldy@163.com |',
        '|  | abc | def',
      ].join('\n'),
      output = [
        '## 标题',
        '',
        '| 姓名   |     电话    |             邮箱 |',
        '|--------|:-----------:|-----------------:|',
        '| 王顶   | 13582027613 | 408542507@qq.com |',
        '| 郭玉朝 | 15703277652 |    baldy@163.com |',
        '|        |     abc     |              def |',
      ].join('\n')

    reformatReadmeDoc(input, '{"0": 0, "1": 2}').should.eql(output)
  })

})
