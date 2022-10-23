const path=require('path')
const Webpack=require('webpack')
const {merge}=require('webpack-merge')
const baseConfig=require('./webpack.base')
const devConfig={
    mode:"development",
    devtool:'cheap-module-eval-source-map',
    plugins:[
        new Webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        contentBase:path.join(__dirname,'dist'),
        port:9000,
        hot:true 
    }

}

module.exports=merge(baseConfig,devConfig)