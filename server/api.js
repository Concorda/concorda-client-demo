'use strict'

const ConcordaClient = require('concorda-client')

module.exports = function (server, options, next) {
  server.dependency('chairo')

  // Set up our seneca plugins
  var seneca = server.seneca

  seneca
    .use(ConcordaClient, {restrict: 'api'})
  next()
}

// Hapi uses this metadata.
module.exports.attributes = {
  name: 'concorda-client-api'
}
