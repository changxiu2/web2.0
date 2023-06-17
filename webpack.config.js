// 引入html-webpack-plugin插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入path模块
const path = require('path');
// 引入mini-css-extract-plugin插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 引入webpackbar插件
const WebpackBar = require('webpackbar');



module.exports = {
    // 出口
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:"main.[hash:8].js",//
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[MiniCssExtractPlugin.loader,"css-loader","postcss-loader",],
            },
            {
                test:/\.less$/,
                // "postcss-loader"执行在css之前，less之后
                use:[MiniCssExtractPlugin.loader,"css-loader","postcss-loader","less-loader"],
            },
            {
                // 导入字体图标/自定义字体
                test: /\.(woff | eot | ttf | otf | svg)$/,//字体的格式
                type: 'asset/resource',
            }
        ],
    },
    // 使环境变量不是一个固定的值，通过刚才写的判断来改变
    mode:process.env.NODE_ENV, 
    // 配置路径   设置路径别名src目录的别名为@符号
    resolve:{
        alias:{
            // 用完整路径替换@
            "@":path.resolve(__dirname,"./src"),
        },
    },
    externals:{
        jquery:'jQuery',//模块名：自己起的名
        lodash:'_',
    },
    devServer:{
        open:true,
        // 配置前端请求代理
        proxy:{//设置代理
            // 在开发环境下面代理的目标是http://127.0.0.1:3000

            // 在生产环境下面代理的目标是http://api.cc0820.top:3000

            "^/api":{ //以api开头 起到一个标识的作用
            target:process.env.NODE_ENV === "development" 
                ? "http://127.0.0.1:3000" 
            : process.env.NODE_ENV === "production" 
                ? "http://api.cc0820.top:3000" 
            : "",  //判断环境变量是什么模式下的
                pathRewrite:{"/api":""},  //路径重写
            },
            // 多个地址的写法
            "^/api1":{ //以api1开头 起到一个标识的作用  
                target:"http://127.0.0.1:3001",
                    pathRewrite:{"/api1":""},  //路径重写
            }
        },
        // 关闭错误警告的蒙版  新写入的
        client:{
            overlay:false,
        },
    },
    // 插件
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            title:'Yes !!',
            cdn:{
                script:[
                    "https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.min.js",
                    "https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.min.js"
                ],
                style:[],
            }
        }),
        new MiniCssExtractPlugin({
            filename:"main.[contenthash:8].css",
        }),
        new WebpackBar(),
    ],
    
};

// CDN (内容分发网络 Content Deliver Network)
// 内容分发网络系统由若干服务器节点构成
// 全球都会部署服务器(云南 湖北 )