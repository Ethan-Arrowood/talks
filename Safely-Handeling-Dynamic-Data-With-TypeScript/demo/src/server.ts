import type { FastifyPluginAsync } from 'fastify'
import { Static, Type } from '@sinclair/typebox'

const BodySchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  employed: Type.Optional(Type.Boolean()),
  company: Type.Optional(Type.String()),
  age: Type.Optional(Type.Number()),
  projects: Type.Optional(
    Type.Array(Type.String())
  )
})

type TBodySchema = Static<typeof BodySchema>;

const createServer: FastifyPluginAsync = async (fastify) => {
  fastify.post<{
    Body: TBodySchema
  }>(
    '/add-user',
    { schema: { body: BodySchema } },
    async (request, reply) => {
      const { body } = request
      body.name
      body.age
    }
  )
}

export default createServer