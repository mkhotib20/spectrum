require('dotenv').config()
const path = require('path');


module.exports = {
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    BACKEND_URL: process.env.BACKEND_URL,
  },
  webpack: config => {
    config.resolve.alias['~'] = path.resolve(__dirname);
    return config;
  }
}