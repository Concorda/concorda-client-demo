'use strict'

var Hapi = require('hapi')
var Bell = require('bell')
var Chairo = require('chairo')
var Cookie = require('hapi-auth-cookie')
var API = require('./server/api')

// Options for our hapi plugins.
var opts = {
  server: {
    port: process.env.PORT || 3000
  },
  chairo: {
    timeout: 2000,
    secure: true,
    log: {level: 'INFO'}
  }
}

// Log and end the process on err.
function endIfErr (err) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
}

// Create our server.
var server = new Hapi.Server({ debug: { request: ['error'] } })
server.connection({port: opts.server.port})

// Declare our Hapi plugin list.
var plugins = [
  {register: Bell},
  {register: Cookie},
  {register: Chairo, options: opts.chairo},
  {register: API}
]

// Register our plugins.
server.register(plugins, function (err) {
  endIfErr(err)

  // Kick off the server.
  server.start(function (err) {
    endIfErr(err)

    server.seneca.log.info('Listening at: ', server.info.port)
  })
})
