import fp from 'fastify-plugin'
import { FromSchema } from 'json-schema-to-ts'

const countSchema = {
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
} as const

export type Count = FromSchema<typeof countSchema>

const statusSchema = {
  $id: 'Status',
  type: 'object',
  properties: {
    code: {
      type: 'number',
      enum: [200, 1000]
    },
    detail: {
      type: 'string'
    }
  }
} as const

export type Status = FromSchema<typeof statusSchema>

const almaanySearchSchema = {
  $id: 'AlmaanySearch',
  type: 'object',
  properties: {
    matchedResult: {
      type: 'string'
    },
    matchedResultHTML: {
      type: 'string'
    },
    resultDetails: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  }
} as const

export type AlmaanySearchSchema = FromSchema<typeof almaanySearchSchema>

const answerSchema = {
  $id: 'Answer',
  type: 'object',
  properties: {
    answer: {
      type: 'array',
      minitems: 4,
      maxitems: 4,
      items: {
        type: 'string',
        enum: ['matched', 'misplaced', 'missed']
      }
    },
  }
} as const

export type AnswerSchema = FromSchema<typeof answerSchema>

const metaAnswerSchema = {
  $id: 'MetaAnswer',
  type: 'object',
  properties: {
    answerId: {
      type: 'number',
    },
    expTime: {
      type: 'string',
    }
  }
} as const

export type InfoAnswerSchema = FromSchema<typeof metaAnswerSchema>

export default fp(async fastify => {
  fastify.addSchema(countSchema)
  fastify.addSchema(statusSchema)
  fastify.addSchema(almaanySearchSchema)
  fastify.addSchema(answerSchema)
  fastify.addSchema(metaAnswerSchema)
})
