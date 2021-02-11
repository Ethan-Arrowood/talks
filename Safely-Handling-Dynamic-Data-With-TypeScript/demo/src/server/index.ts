import { createServer } from './server'
import fastify from 'fastify'
import { PORT } from '../common/env'

async function run () {
  const app = fastify()
  app.register(createServer)

  try {
    await app.ready()
    await app.listen(PORT)
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

run()