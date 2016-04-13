'use strict'

var Hapi = require('hapi')
var Bell = require('bell')
var Chairo = require('chairo')
var Cookie = require('hapi-auth-cookie')
var Concorda = require('concorda')
var DotEnv = require('dotenv')

// load env config file
DotEnv.config({path: './config/production.env'})

// Options for our hapi plugins.
var opts = {
  server: {
    port: process.env.PORT || 3050
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
  {register: Chairo, options: opts.chairo}
]

// Register our plugins.
server.register(plugins, function (err) {
  endIfErr(err)


  server.seneca.use(Concorda,
    {
      mesh: {
        active: process.env.USE_MESH || false,
        auto: true
      },
      transport: {
        active: process.env.USE_TRANSPORT || false,
        type: process.env.TRANSPORT_TYPE || 'tcp'
      },
      auth: {
        restrict: '/api',
        password: process.env.COOKIE_PASSWORD || '12323433234ffdfrdssadfhsamqwr098yrd09r8mhmf9q84mfxkwedorgno438drn8473nd,mnjbrk'
      }
    })

  // Kick off the server.
  server.start(function (err) {
    endIfErr(err)

    server.seneca.log.info('Listening at: ', server.info.port)
  })
})
