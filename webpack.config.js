const path=require('path')
const HtmlWebapckPlugin=require('html-webpack-plugin')
const {CleanWebpackPlugin}=require('clean-webpack-plugin')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
const Webpack=require('webpack')
module.exports={
    mode:'development',  //开发环境
    //开发环境cheap-module-eval-source-map，生产环境cheap-module-source-map或者none
    devtool:'cheap-module-eval-source-map',
    entry:{
       index:path.resolve(__dirname,'./src/index.js'),
    //    demo:path.resolve(__dirname,'./src/demo.js')  //多入口
    },
    output:{
        filename:'[name].[hash:8].js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
      rules:[
        {
           test:/\.js$/i,
           loader:'babel-loader',
           exclude:/node_modules/
        },
        {
            test:/\.css$/,  //匹配css文件
            use:[      //直接使用loader,垂直方向写执行的顺序是从下到上； ['style-loader','css-loader','postcss-loader']-->从右往左执行          
                MiniCssExtractPlugin.loader,
                'css-loader',
                {         //配置postcss-loader有两种方式，方式一全部在webapck.config.js中配置，如下：
                    loader:"postcss-loader",
                    options:{
                       plugins:[require('autoprefixer')]
                    }
                }
            ]
        },
        {
            test:/\.less$/,
            use:[ MiniCssExtractPlugin.loader,'css-loader','less-loader','postcss-loader']
        },
        {
            test:/\.scss$/,
            use:['style-loader','css-loader','sass-loader','postcss-loader']
        },
        // 处理图片的
        {
            test:/\.(png|jpe?g|gif)$/i,  //匹配图片格式的文件
            use:[
                {
                    loader:'url-loader',
                    options:{
                        name:"[name].[hash:8].[ext]",  //输出的文件名 hash:8就是随机生成hash值
                        outputPath:"images",  //配置输出后的文件所放的文件夹的地方 dist/images/lufei.jpeg
                        limit:10240   //限制图片的大小，如果小于这个值就使用url-loader转化为base64格式，如果是大于这个值就会使用file-loader直接返回文件路径
                    }
                }
            ]
        }
      ]
    },
    plugins:[
        new HtmlWebapckPlugin({
            // 模板html的位置，如果不配置这一项，也会生成一个html文件，但是内容是空的；
            // 所以项目中一定会配置这一项
            template:"./src/index.html",
            filename:'index.html',
            chunks:['index']  //与入口文件写的模块名要一样
        }),
        // new HtmlWebapckPlugin({
        //     template:"./src/demo.html",
        //     filename:'demo.html',
        //     chunks:['demo']
        // }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({  //可以不配置，可以指定打包输出css的文件名
            filename:'[name].css'
        }),
        new Webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        contentBase:path.join(__dirname,'dist'),
        port:9000,
        hot:true 
    }
}