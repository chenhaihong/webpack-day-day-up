# webpack-day-day-up

学习写一个简单的 webpack，用到了 babel，

- @babel/parser，获取 js 代码的语法树
- @babel/core
  - traverse，这里用来查找文件的依赖项
  - transformFromAst + @babel/preset-env，用来转换语法
