import { FastifyPluginAsync } from 'fastify'
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import {
  fullMatchAnswerSchema,
  fullMetaAnswerSchema,
  fullAnswerAnswerSchema
} from './schema'
import {
  MatchAnswerSchema,
  MetaAnswerSchema,
  AnswerAnswerSchema,
  Status
} from '../../plugins/schemas'
import { findAnswer, getAnswerId, matchAnswer } from '../../services/answer'
import dayjs from 'dayjs'

const answerRouter: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify
    .withTypeProvider<JsonSchemaToTsProvider>()
    .get(
      '/match',
      { schema: fullMatchAnswerSchema },
      async function (
        request,
        reply
      ): Promise<{
        status: Status
        data: MatchAnswerSchema
      }> {
        const userAnswer = request.query.value
        const systemAnswer = await findAnswer()

        let code: Status['code'] = 200

        if (!systemAnswer) {
          code = 1000
          return {
            status: {
              code
            },
            data: {}
          }
        }

        const answerMatch = matchAnswer(userAnswer, systemAnswer)

        return {
          status: {
            code
          },
          data: {
            answerMatch
          }
        }
      }
    )

  fastify
    .withTypeProvider<JsonSchemaToTsProvider>()
    .get(
      '/meta',
      { schema: fullMetaAnswerSchema },
      async function (
        request,
        reply
      ): Promise<{
        status: Status
        data: MetaAnswerSchema
      }> {
        return {
          status: {
            code: 200
          },
          data: {
            answerId: getAnswerId(),
            expTime: dayjs.utc().endOf('day').toJSON()
          }
        }
      }
    )

  fastify
    .withTypeProvider<JsonSchemaToTsProvider>()
    .get(
      '/answer',
      { schema: fullAnswerAnswerSchema },
      async function (
        request,
        reply
      ): Promise<{
        status: Status
        data: AnswerAnswerSchema
      }> {
        const systemAnswer = await findAnswer()

        let code: Status['code'] = 200

        if (!systemAnswer) {
          code = 1000
          return {
            status: {
              code
            },
            data: {}
          }
        }

        const answer = systemAnswer

        return {
          status: {
            code
          },
          data: {
            answer
          }
        }
      }
    )
}

export default answerRouter
