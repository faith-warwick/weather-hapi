require('babel-polyfill')
const ENV = process.env.NODE_ENV = process.env.NODE_ENV || 'development'

let Server
if (ENV !== 'production') {
  require('babel-register')
  Server = require('./src').default
} else {
  Server = require('./build').default
}

const start = async () => {
  const server = await Server()
  await server.start()
  console.log('Server started at: ' + server.info.uri)
}

start()
  .catch(console.err)
