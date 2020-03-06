const {parsed: localEnv } = require('dotenv').config()
const withCSS = require('@zeit/next-css');
const withSASS = require('@zeit/next-sass');
const withImages = require('next-images')
const webpack = require('webpack')

const path = require('path')
const isDev = process.env.NODE_ENV === 'dev'

const config = {
  webpack: config => {
    // config.resolve.alias['jquery'] = "jquery/src/jquery"
    config.plugins.push(
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jquery': 'jquery',
        })
    )
    config.resolve.alias['~'] = path.resolve(__dirname);
    config.resolve.alias['@static'] = path.resolve(`${__dirname}/public`);
    config.resolve.alias['@component'] = path.resolve(`${__dirname}/components`);
    return config;
  },
  env: localEnv
}

module.exports = withCSS(withSASS(withImages(config)))