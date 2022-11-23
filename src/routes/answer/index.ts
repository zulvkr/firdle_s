import { FastifyPluginAsync } from 'fastify'
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import { fullAnswerSchema, fullMetaAnswerSchema } from './schema'
import {
  AnswerSchema,
  InfoAnswerSchema as MetaAnswerSchema,
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
      '/',
      { schema: fullAnswerSchema },
      async function (
        request,
        reply
      ): Promise<{
        status: Status
        data: AnswerSchema
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

        const answer = matchAnswer(userAnswer, systemAnswer)

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
}

export default answerRouter
