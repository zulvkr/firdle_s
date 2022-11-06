import fp from 'fastify-plugin'
import cors, { FastifyCorsOptions } from '@fastify/cors'

/**
 * This plugins handle CORS
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp<FastifyCorsOptions>(async fastify => {
  fastify.register(cors, {
    origin: process.env.CORS_ALLOW_ORIGIN
  })
})
