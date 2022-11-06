import { FastifyPluginAsync } from 'fastify'
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import { countSchema, schema } from './schema'

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.addSchema(countSchema)

  fastify
    .withTypeProvider<JsonSchemaToTsProvider>()
    .get('/', { schema }, async function (request, reply) {
      request.query.value
      return { count: 0 }
    })
}

export default example
