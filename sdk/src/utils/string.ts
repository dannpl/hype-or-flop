export const encodeString = (value: string, alloc = 32): number[] => {
  const buffer = Buffer.alloc(alloc)

  buffer.fill(value)
  buffer.fill(' ', value.length)

  return Array(...buffer)
}

export const decodeString = (bytes: number[]): string => {
  const buffer = Buffer.from(bytes)
  return buffer.toString('utf8').trim()
}
