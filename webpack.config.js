const { resolve } = require('path');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const cssMinimazerWebpackPlugin = require('css-minimizer-webpack-plugin');
const terserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'asssts/images/[hash][ext][query]'
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@images': path.resolve(__dirname, 'src/assets/images/')
        }
    },
//sección de MODULOS
    module:{
        //Sección de REGLAS de los MODULOS
        rules: [
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },
        {
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        },
        {
            test: /\.png$/,
            type: 'asset/resource'
        },
        {
            test: /\.(woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: "application/font-woff",
                    name: "[name].[contenthash].[ext]",
                    outputPath: "./assets/fonts/",
                    publicPath: "../assets/fonts/",
                    esModule: false,
                }
            }
               
        }
    ]  
    },
    //Sección de PLUGINS
    plugins:[
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename:'./index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'assets/images'),
                    to:'assets/images'
                }
            ]
        })        
    ],
    //Seccion de OPTIMIZACIÓN
    optimization: {
        minimize: true,
        minimizer: [
            new cssMinimazerWebpackPlugin(),
            new terserWebpackPlugin()
        ]
    }
}