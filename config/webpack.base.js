//nodejs中内置的path，来获取文件的路径
const path=require('path')
//根据目标html模板，自动生成html文件，并且会把打包后的js,css文件引入
const HtmlWebpackPlugin =require('html-webpack-plugin')
//清除每次打包生成的dist文件夹
const {CleanWebpackPlugin}=require('clean-webpack-plugin')
//将css单独提出去，并且以link的方式注入到html文件中的插件
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
const Webpack= require('webpack')

// 获取环境变量
const argv=require('yargs').argv
const moduleFlag=argv.env==='production'?true:false

module.exports={
    //不要写模式mode
    //入口文件
    entry:{
       index:'./src/index.js',
    //    jquery:"jquery"
    },
    // 打包后输出的文件地址以及名称
    output:{
        filename:moduleFlag?'[name].[hash:8].js':'bundle.js',
        path:path.resolve(__dirname,'../dist')
    },
    optimization:{
       splitChunks:{
        chunks: 'all',  //initial async all 三个值选择
        // minSize: 30000,  //拆分代码的最小大小，默认是30000
        // maxSize: 0,   //拆分前代码最大是多大
        // minChunks: 1, //表示被引用的次数，默认是1
        // maxAsyncRequests: 5,  //最大的按需异步加载次数
        // maxInitialRequests: 3,  //最大的初始化加载次数
        // automaticNameDelimiter: '~', //生成文件名中的分割符，默认是~
        // automaticNameMaxLength: 30,
        // name: true,  //true 表示用自动生成的文件名命名
        name:false,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,  //匹配node_modules目录下的文件
            priority: -10, //优先级
            filename:"jquery.js"  //自定义打包后的名字
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true  //是指模块被打包过了，就不用再打包了，复用之前的
          }
       }
    }
},
    module:{
        rules:[
           //处理js的loader
            {
                test:/\.js$/,
                loader:"babel-loader",
                exclude:/node_modules/
            },
            //处理图片的
            {
                test:/\.(png|jpeg|gif)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        name:'[name].[hash:8].[ext]',
                        outputPath:'assets',
                        limit:2048,
                    }
                }
            },
            //处理字体的
            {
                test:/\.ttf$/,
                use:{
                    loader:'file-loader',
                    options:{
                        name:'[name].[hash:8].[ext]',
                        outputPath:'font'
                    }
                }
            },
            //处理样式css的
             {
            test:/\.css$/,  //匹配css文件
            use:[      //直接使用loader,垂直方向写执行的顺序是从下到上； ['style-loader','css-loader','postcss-loader']-->从右往左执行          
                MiniCssExtractPlugin.loader,
                'css-loader',
                {  
                    loader:"postcss-loader",
                    options:{
                       plugins:[require('autoprefixer')]
                    }
                }
            ]
        },
        {
            test:/\.less$/,
            use:[MiniCssExtractPlugin.loader,'css-loader','less-loader','postcss-loader']
        }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./src/index.html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({  //可以不配置，可以指定打包输出css的文件名
            filename:'[name].css'
        }),
        // new Webpack.ProvidePlugin({
        //     $:"jquery"
        // })
    ],
}