import fp from 'fastify-plugin'

export default fp(async (fastify) => {
  fastify.addSchema( {
    $id: 'Count',
    type: 'object',
    properties: {
      count: {
        type: 'number'
      },
      value: {
        type: 'string'
      }
    }
  })

  fastify.addSchema( {
    $id: 'Status',
    type: 'object',
    properties: {
      status: {
        type: 'number'
      }
    }
  })
})
