import fp from 'fastify-plugin'
import swagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'


/**
 * This plugins create swagger documentation
 *
 * @see https://github.com/fastify/fastify-swagger
 * @see https://github.com/fastify/fastify-swagger-ui
 */
export default fp<FastifyDynamicSwaggerOptions>(async (fastify, opts) => {
  if (process.env.NODE_ENV === 'production') {
    return
  }

  const servers = [
    {
      url: `http://${process.env.FASTIFY_ADDRESS}:${process.env.FASTIFY_PORT}`,
      description: 'Local development server'
    },
  ]

  if (process.env.SWAGGER_BASE_URL) {
    servers.push({
      url: process.env.SWAGGER_BASE_URL,
      description: 'Local development server'
    })
  }

  fastify.register(swagger, {
    openapi: {
      info: {
        title: 'Firdle API',
        version: '0.1.0'
      },
      servers
    }
  })

  fastify.register(swaggerUi, {
    routePrefix: 'docs',
    uiConfig: {
      // docExpansion: 'full',
      deepLinking: false,
    },
    logLevel: 'info'
  })
})
