const { VueLoaderPlugin} = require('vue-loader')
const path = require('path');



module.exports = [
  {
    entry: './src/auth.js',
    output: {
        path: __dirname + '/dist',
        filename: 'auth-bundle.js'
    },
    module: {
        rules: [
            {
                test:  /\.js$/,
                exclude: [/node_modules/, '/main.js'],
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                oneOf: [
                  // this matches `<style module>`
                  {
                    resourceQuery: /module/,
                    use: [
                      'vue-style-loader',
                      {
                        loader: 'css-loader',
                        options: {
                          modules: true,
                          localIdentName: '[local]_[hash:base64:5]'
                        }
                      }
                    ]
                  },
                  // this matches plain `<style>` or `<style scoped>`
                  {
                    use: [
                      'vue-style-loader',
                      'css-loader'
                    ]
                  }
                ]
              }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
  },
  {
    entry: './src/cashier.js',
    output: {
        path: __dirname + '/dist',
        filename: 'cashier-bundle.js'
    },
    module: {
        rules: [
            {
                test:  /\.js$/,
                exclude: [/node_modules/, '/main.js'],
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                oneOf: [
                  // this matches `<style module>`
                  {
                    resourceQuery: /module/,
                    use: [
                      'vue-style-loader',
                      {
                        loader: 'css-loader',
                        options: {
                          modules: true,
                          localIdentName: '[local]_[hash:base64:5]'
                        }
                      }
                    ]
                  },
                  // this matches plain `<style>` or `<style scoped>`
                  {
                    use: [
                      'vue-style-loader',
                      'css-loader'
                    ]
                  }
                ]
              }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
  },
  {
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test:  /\.js$/,
                exclude: [/node_modules/, '/main.js'],
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                oneOf: [
                  // this matches `<style module>`
                  {
                    resourceQuery: /module/,
                    use: [
                      'vue-style-loader',
                      {
                        loader: 'css-loader',
                        options: {
                          modules: true,
                          localIdentName: '[local]_[hash:base64:5]'
                        }
                      }
                    ]
                  },
                  // this matches plain `<style>` or `<style scoped>`
                  {
                    use: [
                      'vue-style-loader',
                      'css-loader'
                    ]
                  }
                ]
              }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],

    // devServer: {
    //   contentBase: path.join(__dirname, 'dist'),
    //   filename: 'bundle.js',
    //   compress: true,
    //   port: 8080
    // }
}];