const {merge}=require('webpack-merge')
const baseConfig=require('./webpack.base')
const OptimizeCssAssetsWebpackPlugin=require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin=require('terser-webpack-plugin')
// const BundlePluginAnalyzer=require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// 使用cross-env来获取环境变量
// const NODE_ENV=process.env.NODE_ENV;
// console.log('这个是什么环境呢',NODE_ENV);

// 使用yargs来获取环境变量
const argv=require('yargs').argv
console.log('这个是什么环境呢',argv);

const prodConfig={
    mode:"production",
    devtool:'none',
    optimization:{
        minimizer:[new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin(),
            // new BundlePluginAnalyzer()
        ]
    }
}
module.exports=merge(baseConfig,prodConfig)