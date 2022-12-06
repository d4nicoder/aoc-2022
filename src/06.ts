import fs from 'fs'

function part1(line: string): string {
  const result: string[] = []

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const idx = result.indexOf(char)
    if (idx !== -1) {
      result.splice(0, idx + 1)
    }
    result.push(char)
    if (result.length === 4) {
      return (i + 1).toString()
    }

  }
  return 'invalid'
}

function part2(line: string): string {
  const result: string[] = []

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const idx = result.indexOf(char)
    if (idx !== -1) {
      result.splice(0, idx + 1)
    }
    result.push(char)
    if (result.length === 14) {
      return (i + 1).toString()
    }

  }
  return 'invalid'
}

function main() {
  const input = fs.readFileSync(`${__dirname}/06.in`).toString().split('\n').filter(l => l.length)
  const result1 = part1(input[0])
  const result2 = part2(input[0])
  console.log(`Part 1: ${result1}`)
  console.log(`Part 2: ${result2}`)
}

main()
