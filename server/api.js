'use strict'

const ConcordaClient = require('concorda-client')

module.exports = function (server, options, next) {
  server.dependency('chairo')

  // Set up our seneca plugins
  var seneca = server.seneca

  seneca
    .use(ConcordaClient, {restrict: '/api'})


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
