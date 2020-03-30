// next.config.js
//const withTypescript = require('@zeit/next-typescript')
//module.exports = withTypescript()

//const withTypescript = require('@zeit/next-typescript')
//module.exports = withTypescript({
//  webpack(config, options) {
//    return config
//  }
//})



const path = require("path");
const Dotenv = require("dotenv-webpack");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const withCss = require('@zeit/next-css')

module.exports = {
  poweredByHeader: false,
};

module.exports = {
  webpack: config => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];

    return config;
  }
};

/* eslint-disable */

module.exports = withCss({
  webpack: (config, { isServer }) => {
    config.plugins = config.plugins || [];
    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]
    config.plugins = [
      ...config.plugins,

      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }
    return config
  },
})
