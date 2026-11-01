export function normalizeAnswer(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[¿?¡!.,;:'"“”«»()]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function isAccepted(value: string, answers: string[]) {
  const given = normalizeAnswer(value)

  if (!given) return false

  return answers.some((answer) => normalizeAnswer(answer) === given)
}
