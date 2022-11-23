import { normalizeVerb } from '../utils/helper'

export function normalizeKalimat(kalimat: string) {
  return normalizeVerb(kalimat, {
    alef: false,
    alefMadda: true,
    hamza: true,
    inputHasShadda: true,
    lamAlef: true,
    shadda: true,
  })
}
