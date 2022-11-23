import {
  ALEF,
  ALEFAT,
  ALEF_MADDA,
  HAMZA,
  HAMZAT,
  LAM_ALEF,
  LAM_ALEF_HAMZA_ABOVE,
  LAM_ALEF_HAMZA_BELOW,
  LAM_ALEF_MADDA_ABOVE,
  SHADDA,
  SIMPLE_ALEF_MADDA,
  SIMPLE_LAM_ALEF,
  SIMPLE_LAM_ALEF_HAMZA_ABOVE,
  SIMPLE_LAM_ALEF_HAMZA_BELOW,
  SIMPLE_LAM_ALEF_MADDA_ABOVE,
  HARAKAT,
  TASHKEEL,
  CONSONANTS,
  LETTERS,
  HAH,
  YEH
} from './constants'

export function stripHarakat(string: string) {
  return string
    .split('')
    .filter(char => !HARAKAT.includes(char))
    .join('')
}

export function stripTashkeel(string: string) {
  return string
    .split('')
    .filter(char => !TASHKEEL.includes(char))
    .join('')
}

export function normalizeHamza(string: string) {
  return string
    .split('')
    .map(char => {
      if (HAMZAT.includes(char)) {
        return HAMZA
      }
      return char
    })
    .join('')
}

export function normalizeLamAlef(string: string) {
  return string
    .split('')
    .map(char => {
      if (char === LAM_ALEF) {
        return SIMPLE_LAM_ALEF
      }
      if (char === LAM_ALEF_HAMZA_ABOVE) {
        return SIMPLE_LAM_ALEF_HAMZA_ABOVE
      }
      if (char === LAM_ALEF_HAMZA_BELOW) {
        return SIMPLE_LAM_ALEF_HAMZA_BELOW
      }
      if (char === LAM_ALEF_MADDA_ABOVE) {
        return SIMPLE_LAM_ALEF_MADDA_ABOVE
      }
      return char
    })
    .join('')
}

export function normalizeAlefMadda(string: string) {
  return string
    .split('')
    .map(char => {
      if (char === ALEF_MADDA) {
        return SIMPLE_ALEF_MADDA
      }
      return char
    })
    .join('')
}

export function normalizeAlef(string: string) {
  return string
    .split('')
    .map(char => {
      if (ALEFAT.includes(char)) {
        return ALEF
      }
      return char
    })
    .join('')
}

export function normalizeShadda(string: string) {
  const arr = string.split('')
  // start from second character
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === SHADDA) {
      arr[i] = arr[i - 1]
    }
  }
  return arr.join('')
}

export function shaddaKnownPattern(string: string) {
  /**
   * Give shadda to known pattern
   * 1. Two characters verb, example: MEEM + DAL
   * 2. Known shadda pattern ALEF_HAMZA_ABOVE + SEEN + SEEN
   * 3. except HAH + YEH + YEH
   * TODO: Check Tafaala, Ifalalla, Amadda
   */
  
  const arr = string.split('')

  // 1
  if (arr.length === 2) {
    return [...arr, SHADDA].join('')
  } 
  
  // 2
  if (arr.length > 2) {
    const consonants = `[${CONSONANTS.join('')}]`
    const letters = `[${LETTERS.join('')}]`
    const repeatedChar = new RegExp(`^${letters}(${consonants})\\1$`)  
    if (repeatedChar.test(string) && string !== HAH + YEH + YEH) {
      return [arr[0], arr[1], SHADDA, arr[2]].join('')
    }
  }
  return string
}

interface Options {
  lamAlef?: boolean
  inputHasShadda?: boolean
  shadda?: boolean
  twoCharVerb?: boolean
  alefMadda?: boolean
  hamza?: boolean
  alef?: boolean
}


export function normalizeVerb(string: string, options?: Options) {
  const mergedOptions: Options = {
    lamAlef: true,
    inputHasShadda: false,
    shadda: true,
    alefMadda: true,
    hamza: true,
    alef: true,
    ...options
  }
  let output = string
  output = output.trim()
  output = stripHarakat(output)
  if (mergedOptions.lamAlef) {
    output = normalizeLamAlef(output)
  }
  if (mergedOptions.alefMadda) {
    output = normalizeAlefMadda(output)
  }
  if (!mergedOptions.inputHasShadda) {
    output = shaddaKnownPattern(output)
  }
  if (mergedOptions.shadda) {
    output = normalizeShadda(output)
  }
  if (mergedOptions.hamza) {
    output = normalizeHamza(output)
  }
  if (mergedOptions.alef) {
    output = normalizeAlef(output)
  }
  return output
}
