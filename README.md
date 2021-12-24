# reformat-markdown-cn

[![Version](https://img.shields.io/badge/npm-6+-green.svg)](https://www.npmjs.org/package/reformat-markdown-table)
[![node](https://img.shields.io/badge/node->_v14-green.svg)](https://nodejs.org/en/)
[![Build Status](https://img.shields.io/travis/dbrockman/reformat-markdown-table/master.svg?style=flat)](https://travis-ci.org/dbrockman/reformat-markdown-table)
[![Coverage Status](http://img.shields.io/coveralls/dbrockman/reformat-markdown-table.svg?style=flat)](https://coveralls.io/r/dbrockman/reformat-markdown-table?branch=master)


**特别声明：**

>因为，原仓库作者已经不维护了，所以在 npmjs.com 网站上重新发布项目，项目的名称为：reformat-markdown-table-cn。感谢原作者的贡献，本仓库保留原作者的所有提交。源仓库地址：https://github.com/dbrockman/reformat-markdown-table
>
>本仓库对原仓库做了以下两方面改进：
>1. 原仓库代码不支持中文，也就是说在 MarkDown 表格中包含中文时，不能很好的对齐；
>2. 原仓库代码不支持表格每行前后有空白的单元格；

**特别声明1：**

> 1. 在原有的基础上修改，可以匹配整个markdown，格式化表格
> 2. 新增匹配文件夹下的多个markdown文件，直接覆盖源文件
> 3. 自定义汉字对照数量，尽量解决不是等比字体的问题
> 。源仓库地址: https://github.com/wangding/reformat-markdown-table

例如，GFM MarkDown 表格代码如下：

```
## 标题

| 姓名 | 电话 | 邮箱 |
| --- | :---: | ---: |
| 王顶 | 13582027613 | 408542507@qq.com |
| 郭玉朝 | 13812347652 | baldy@163.com |
|  | abc | def
```

通过 reformat-markdown-cn 工具的处理之后：

```
## 标题

| 姓名   |     电话     |              邮箱 |
|-------|:-----------:|-----------------:|
| 王顶   | 13582027613 | 408542507@qq.com |
| 郭玉朝 | 13812347652 |    baldy@163.com |
|       |     abc     |              def |
```

## 终端使用

编辑一个 MarkDown 文件，该 Markdown 文件中只包含 GFM MarkDown 表格内容，运行下面的命令：

```bash

#格式化Markdown表格

npm i reformat-markdown-cn -g

reformat-markdown-cn -h

Usage: reformat-markdown-cn [options] <files|directories|globs>

Options:
  -V, --version          output the version number
  -R, --reformat [type]  check another rules and reformat markdown table, (default: {"0": 0, "1": 2, "2": 3, "3": 5})
  -C, --cat              only cat format markdown content (default: false)
  -h, --help             display help for command

#  1:2对应，合适等比字体
#  '{"0": 0, "1": 2}'
#  [默认] IDEA大致对应
#  '{"0": 0, "1": 2, "2": 3, "3": 5}'
#  自定义对应，按照需求自定义向后添加
#  '{"0": 0, "1": 2, "2": 3, "3": 5, "4": 7}'

cd bin

# 格式化一个文件
reformat-markdown-cn ./markdown/example.md 
# 格式化多个文件
reformat-markdown-cn ./markdown/**/*.md
# 自定义字符对应
reformat-markdown-cn ./markdown/example.md -R '{"0": 0, "1": 2}'
reformat-markdown-cn ./markdown/**/*.md -R '{"0": 0, "1": 2}'
# 终端输出内容，不会覆盖源文件
reformat-markdown-cn ./markdown/example.md -R '{"0": 0, "1": 2}' -C
reformat-markdown-cn ./markdown/**/*.md -R '{"0": 0, "1": 2}' -C
```

## 代码使用

```javascript
const { reformat } = require('reformat-markdown-cn')
const content = `
## 标题

| 姓名 | 电话 | 邮箱 |
| --- | :---: | ---: |
| 王顶 | 13582027613 | 408542507@qq.com |
| 郭玉朝 | 13812347652 | baldy@163.com |
|  | abc | def
`
const result = reformat(content)

console.log(result)
```


