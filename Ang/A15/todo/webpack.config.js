module.exports = {
    entry:  './app/app.js',
    output: {
        path:     './app/builds',
        filename: 'bundle.js',
    },

    module: {
        // loaders: [
        //     {
        //         test:   /\.js/,
        //         loader: 'babel',
        //         include: __dirname + './app',

        //     }
        // ],
        loaders: [{
          // JS LOADER
          // Reference: https://github.com/babel/babel-loader
          // Transpile .js files using babel-loader
          // Compiles ES6 and ES7 into ES5 code
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/        
        }]
    }
};

