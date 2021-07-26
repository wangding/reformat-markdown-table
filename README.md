# reformat-markdown-table

[![Version](http://img.shields.io/npm/v/reformat-markdown-table.svg?style=flat)](https://www.npmjs.org/package/reformat-markdown-table)
[![Build Status](https://img.shields.io/travis/dbrockman/reformat-markdown-table/master.svg?style=flat)](https://travis-ci.org/dbrockman/reformat-markdown-table)
[![Coverage Status](http://img.shields.io/coveralls/dbrockman/reformat-markdown-table.svg?style=flat)](https://coveralls.io/r/dbrockman/reformat-markdown-table?branch=master)
[![Dependency Status](https://david-dm.org/dbrockman/reformat-markdown-table.svg?style=flat)](https://david-dm.org/dbrockman/reformat-markdown-table)
[![devDependency Status](https://david-dm.org/dbrockman/reformat-markdown-table/dev-status.svg?style=flat)](https://david-dm.org/dbrockman/reformat-markdown-table#info=devDependencies)


**特别声明：**

>因为，原仓库作者已经不维护了，所以在 npmjs.com 网站上重新发布项目，项目的名称为：reformat-markdown-table-cn。感谢原作者的贡献，本仓库保留原作者的所有提交。源仓库地址：https://github.com/dbrockman/reformat-markdown-table
>
>本仓库对原仓库做了以下两方面改进：
>1. 原仓库代码不支持中文，也就是说在 MarkDown 表格中包含中文时，不能很好的对齐；
>2. 原仓库代码不支持表格每行前后有空白的单元格；

**特别声明1：**

> 1. 在原有的基础上修改，可以匹配整个markdown，格式化表格
> 2. 自定义汉字对照数量，尽量解决不是等比字体的问题
> 。源仓库地址: https://github.com/wangding/reformat-markdown-table

例如，GFM MarkDown 表格代码如下：

```
| 姓名 | 电话 | 邮箱 |
| --- | :---: | ---: |
| 王顶 | 13582027613 | 408542507@qq.com |
| 郭玉朝 | 13812347652 | baldy@163.com |
|  | abc | def
```

通过 reformat-markdown-table-cn 工具的处理之后：

```
| 姓名   |     电话     |              邮箱 |
|-------|:-----------:|-----------------:|
| 王顶   | 13582027613 | 408542507@qq.com |
| 郭玉朝 | 13812347652 |    baldy@163.com |
|       |     abc     |              def |
```

## 使用

编辑一个 MarkDown 文件，该 Markdown 文件中只包含 GFM MarkDown 表格内容，假设文件名为：table.md，运行下面的命令：

```bash

#格式化Markdown表格
#
#-h 帮助
#-v 自定义对照，格式如下
#  中文汉字数量对照英文字符数量
#  1:2对应，合适等比字体
#  '{"0": 0, "1": 2}'
#  IDEA大致对应
#  '{"0": 0, "1": 2, "2": 3, "3": 5}'
#  自定义对应
#  '{"0": 0, "1": 2, "2": 3, "3": 5, "4": 7}'

cat table.md | reformat-markdown-table-cn -v '{"0": 0, "1": 2}'
cat table.md | reformat-markdown-table-cn -v '{"0": 0, "1": 2, "2": 3, "3": 5}'

# or

cat table.md | reformat-markdown-table-cn > table2.md
cat table.md | reformat-markdown-table-cn -v '{"0": 0, "1": 2}' > table2.md
cat table.md | reformat-markdown-table-cn -v '{"0": 0, "1": 2, "2": 3, "3": 5}' > table2.md
```



