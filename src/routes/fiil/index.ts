import { FastifyPluginAsync } from 'fastify'
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import { fullCountFiilSchema, fullFiilSchema } from './schema'
import { AlmaanySearchSchema, Count, Status } from '../../plugins/schemas'
import { prisma } from '../../services/prisma'

const fiilRouter: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify
    .withTypeProvider<JsonSchemaToTsProvider>()
    .get(
      '/count',
      { schema: fullCountFiilSchema },
      async function (
        request,
        reply
      ): Promise<{
        status: Status
        data: Count
      }> {
        const fiil = request.query.value

        const countResult = await prisma.firdleFiil.count({
          where: {
            TsulatsiMazid1Verb: {
              verb: fiil
            }
          }
        })

        return {
          status: {
            code: 200
          },
          data: {
            count: countResult,
            value: fiil
          }
        }
      }
    )

  fastify
    .withTypeProvider<JsonSchemaToTsProvider>()
    .get(
      '/',
      { schema: fullFiilSchema },
      async function (
        request,
        reply
      ): Promise<{
        status: Status
        data: AlmaanySearchSchema
      }> {
        const fiil = request.query.value

        const almaanySearchResult = await prisma.firdleFiil.findFirst({
          where: {
            TsulatsiMazid1Verb: {
              verb: fiil
            }
          },
          include: {
            AlmaanySearch: {
              include: {
                searchDetails: true
              }
            }
          }
        })

        return {
          status: {
            code: 200
          },
          data: {
            matchedResult: almaanySearchResult?.AlmaanySearch.matchedResult,
            matchedResultHTML:
              almaanySearchResult?.AlmaanySearch.matchedResultHTML,
            resultDetails: almaanySearchResult?.AlmaanySearch.searchDetails.map(
              val => val.detail
            )
          }
        }
      }
    )
}

export default fiilRouter
