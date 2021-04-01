const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { ProgressPlugin, node } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (_, argv) => {

    const stats = {
        electronOpened: false,
        nodeModules: {}
    }

    fs.readdirSync('node_modules')
        .filter((name) => ['.bin'].indexOf(name) === -1)
        .forEach((mod) => stats.nodeModules[mod] = 'commonjs ' + mod);

    return {

        entry: path.resolve(__dirname, 'src'),
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'app'),
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'public', 'index.html'),
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: path.resolve(__dirname, 'electron'), to: path.resolve(__dirname, 'app') }
                ]
            }),
            new ProgressPlugin((percentage) => {
                if (percentage === 1 && !stats.electronOpened && argv.mode !== 'production') {
                    stats.electronOpened = true;
                    exec(`npx electron ${path.resolve(__dirname, 'electron', 'main.js')}`).on('close', () => {
                        process.exit();
                    });
                }
            })
        ],
        module: {
            rules: [
                {
                    test: /\.jsx?$/i,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.css$/i,
                    exclude: /node_modules/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    exclude: /node_modules/,
                    loader: 'file-loader'
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'app'),
            port: 5000,
            historyApiFallback: true
        },
        externals: stats.nodeModules,
        target: 'node'
    }
}