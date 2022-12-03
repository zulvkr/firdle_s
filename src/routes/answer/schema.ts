export const fullMatchAnswerSchema = {
  tags: ['Answer'],
  querystring: {
    type: 'object',
    properties: {
      value: {
        type: 'string'
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
        data: { $ref: 'MatchAnswer#' }
      }
    }
  }
}

export const fullAnswerAnswerSchema = {
  tags: ['Answer'],
  response: {
    200: {
      description: 'Successful Response',
      type: 'object',
      properties: {
        status: { $ref: 'Status#' },
        data: { $ref: 'AnswerAnswer#' }
      }
    }
  }
}

export const fullMetaAnswerSchema = {
  tags: ['Answer'],
  response: {
    200: {
      description: 'Successful Response',
      type: 'object',
      properties: {
        status: { $ref: 'Status#' },
        data: { $ref: 'MetaAnswer#' }
      }
    }
  }
}
