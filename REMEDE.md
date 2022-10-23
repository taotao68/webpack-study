webpack模块：
- ES2015的import语句
- Commonjs reuqire语句
- ADM define和require语句
- CSS/SCSS/LESS文件的import
- 样式或者html文件的图片/字体文件
- ......

webpack构建过程：

代码转换、文件优化、代码分割、模块合并、自动刷新、代码校验、自动发布.....

核心概念：
- loader、plugins、Entry、Output、SourceMap、DevServer、Hmr、Babel
- TreeShaking、环境区分、CodeSpilting、打包分析、代码分割、环境变量的使用

1。环境的搭建

当我们不知道可以安装哪些版本的时候，可以通过命令：npm info webapck，
来查看版本

nrm 可以查看想要通过那种方式安装包  npm  i nrm -g
nrm use taobao  切换使用哪个源
nrm test taobao 查看源的网速
如果安装失败的话  推荐使用国内镜像源  使用nrm进行切换

-----------------------------------

Hash: 350941fff681de58e220   hash值，对应每一次打包的唯一值
Version: webpack 4.16.1   webpack版本
Time: 191ms    打包编译的时间
Built at: 2022/10/21 22:38:42   打包开始的时间

    Asset       Size  Chunks             Chunk Names
bundle.js  977 bytes       0  [emitted]  main

Entrypoint main = bundle.js
[0] ./src/index.js + 1 modules 92 bytes {0} [built]
    | ./src/index.js 35 bytes [built]
    | ./src/list.js 57 bytes [built]

    --------
    sourcemap

    --------HMR 
    热更新
    使用步骤：
    使用webpack-dev-server作为服务器启动
    devServer配置 hot:true
    plugins hotModuleReplacementPLugin
    js模块中增加module.hot.accept增加hmr代码

    --------
    babel  js 编译器
    npm i babel-loader @babel/core @babel/preset-env -D

    已经使用了@babel/preset-env  ES6+语法转换  ？

标准引入的语法：箭头函数，Let，const等是可以转换的
表追引入的全局变量，部分原生对象新增的原型链上的方法不可以转化  promise.symbol,set ,map等

还需要@babel/polyfill插件来帮忙   全局变量的方式注入，开发项目使一般是没有影响的  但是当开发类库，UI组件时，可能会造成全局变量的污染   配套的必须有core-js@3
这个时候可以用 @babel/plugin-transform-runtime  来代替，以闭包的方式注入，保证全局环境不被污染  这个也是有配套的@babel/runtime-corejs3

---------


区分开发环境和生产环境
开发环境：
   devServer
   sourceMap
   接口代理，proxy
   热更新 HMR
   ....
生产环境：
 treeShaking
 代码压缩
 提取公共代码
共同点：
   同样的入口
   部分相同的代码处理

方案：
   webpack.dev.js    开发环境的
   webpack.prod.js   生产环境的
   webpack.base.js  开发环境和生产环境公用的代码
   借助一个工具： webpack-merge


   -------
   打包优化  
   引入第三方库时，打包后体积较大的配置：
   1.多入口配置：entry多入口    一般是配合 webpack.proviePlugin 使用
   2.抽取公共代码： splitchunksPlugins     
   optimization:{
        splitChunks:{
            chunks:'all'
        }
    },
   3.动态加载：按需加载，懒加载   @babel/plugin-syntax-dynamic-import使用


   --------------
   css  文件代码分割
   mini-css-extract-plugin   只是在生产环境下使用的抽离css文件,link的方式引入
   压缩css文件
   optimize-css-assets-webpack-plugin  也是在生产环境下配置

   配置代码分割压缩css代码 optimization:要注意的是影响到js代码的压缩，需要手动配置  terser-webpack-plugin

   ------

   代码包分析工具
   webpack-bundle-analyzer


   ---------

   开发环境生产环境的区分

   安装  yargs  npm i yargs
