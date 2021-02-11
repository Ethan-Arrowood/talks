import { FastifyPluginAsync } from 'fastify'
import { AddUserRequestSchema } from '../common/schemas'

export const createServer: FastifyPluginAsync = async (fastify) => {
  fastify.post<{ Body: AddUserRequestSchema }>(
    '/add-user',
    { schema: { body: AddUserRequestSchema } },
    async (request, response) => {
      const { body: { user } } = request
      fastify.log.info(user)
      const dbResponse = await Promise.resolve({ message: `User ${user.id} added successfully!`})
      response.send(JSON.stringify(dbResponse))
    }
  )
}