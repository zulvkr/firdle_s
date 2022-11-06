export const countSchema = {
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
}

export const schema = {
  tags: ['Fiil'],
  querystring: {
    type: 'object',
    properties: {
      value: {
        type: 'string'
      }
    }
  } as const,
  response: {
    200: {
      description: 'Successful Response',
      $ref: 'Count#'
    }
  }
}