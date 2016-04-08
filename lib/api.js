'use strict'

const ConcordaClient = require('concorda-client')

module.exports = function (server, options, next) {
  server.dependency('chairo')

  // Set up our seneca plugins
  var seneca = server.seneca

  seneca
    .use(ConcordaClient, {
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
      }
    )

  function demoService (msg, response) {

    console.log(JSON.stringify(msg.req$.seneca.user))

    response(null, {ok: true, message: 'Protected service. This server is accessed now by ' + msg.req$.seneca.user.email})
  }

  seneca
    .add('role: concordaDemo, cmd: demoService', demoService)

  seneca.act({
    role: 'web', use: {
      name: 'concordaDemo',
      prefix: '/api',
      pin: {role: 'concordaDemo', cmd: '*'},
      map: {
        demoService: {GET: true, alias: 'service'}
      }
    }
  })

  next()
}

// Hapi uses this metadata.
module.exports.attributes = {
  name: 'concorda-client-api'
}
