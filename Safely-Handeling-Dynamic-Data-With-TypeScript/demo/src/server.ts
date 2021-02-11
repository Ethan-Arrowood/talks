import type { FastifyPluginAsync } from 'fastify'

const createServer: FastifyPluginAsync = async (server) => {
  server.route({
    url: '/',
    method: 'POST',
    handler: async (request, reply) => {

    }
  })
}

export default createServer