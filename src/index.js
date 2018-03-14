import { Server } from 'hapi'
import SetupPlugins from './configuration/plugins'

const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 5000

/**
 * Sets up the server with plugins and defaults
 *
 * Doesn't start the server
 *
 * @returns {Promise<Server>}
 */
export default async () => {

  const options = {
    router: {
      isCaseSensitive: false,
    },
    routes: {
      cors: true,
    },
  }

  if (env !== 'testing') {
    options.port = port
  }

  const server = new Server(options)

  await SetupPlugins(server)
  await server.initialize()

  return server
}
