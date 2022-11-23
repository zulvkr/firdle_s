import { AnswerSchema } from '../plugins/schemas'
import dayjs from '../utils/dayjs'
import { normalizeKalimat } from './normalizeKalimat'
import { prisma } from './prisma'

export function getAnswerId() {
  const current = dayjs.utc()
  const startDateString = process.env.GAME_START_DATE || '2022-11-05'
  const startDate = dayjs.utc(startDateString)

  // use index 1
  return 1 + current.diff(startDate, 'day')
}

export async function findAnswer() {
  const answer = await prisma.firdleFiil.findUnique({
    where: {
      answerId: getAnswerId()
    },
    include: {
      TsulatsiMazid1Verb: true
    }
  })

  return answer?.TsulatsiMazid1Verb.verb
}

export function matchAnswer(answer1: string, answer2: string) {
  const answer1Arr = normalizeKalimat(answer1).split('')
  const answer2Arr = normalizeKalimat(answer2).split('')

  const resultArr: AnswerSchema['answer'] = answer1Arr.map((uChar, i) => {
    if (uChar === answer2Arr[i]) {
      return 'matched'
    }
    if (answer2Arr.includes(uChar)) {
      return 'misplaced'
    }
    return 'missed'
  })

  return resultArr
}
