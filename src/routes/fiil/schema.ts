export const fullCountFiilSchema = {
  tags: ['Fiil'],
  querystring: {
    type: 'object',
    properties: {
      value: {
        type: 'string',
      }
    },
    required: ['value']
  } as const,
  response: {
    200: {
      description: 'Successful Response',
      type: 'object',
      properties: {
        status: { $ref: 'Status#' },
        data: { $ref: 'Count#' }
      }
    }
  }
}

export const fullFiilSchema = {
  tags: ['Fiil'],
  querystring: {
    type: 'object',
    properties: {
      value: {
        type: 'string',
      }
    },
    required: ['value']
  } as const,
  response: {
    200: {
      description: 'Successful Response',
      type: 'object',
      properties: {
        status: { $ref: 'Status#' },
        data: { $ref: 'AlmaanySearch#' }
      }
    }
  }
}
