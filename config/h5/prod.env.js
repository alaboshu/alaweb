'use strict'
module.exports = {
  NODE_ENV: '"production"',
  CLIENT_URL: process.env.Url && `"${process.env.Url}"`,
  CLIENT_ID: process.env.Id && `"${process.env.Id}"`,
  CLIENT_KEY: process.env.Key && `"${process.env.Key}"`
}
