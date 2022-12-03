import fs from 'fs'

const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

function part1(input: string[]): string {
  const shared: string[] = []

  input.forEach((line) => {
    const size = line.length
    const half = size / 2
    const repeated: Record<string, number> = {}
    const used: Record<string, boolean> = {}

    for (let i = 0; i < size; i++) {
      const letter = line[i]
      if (i < half) {
        repeated[letter] = (repeated[letter] || 0) + 1
      } else {
        if (repeated[letter] && !used[letter]) {
          used[letter] = true
          shared.push(letter)
        }
      }
    }
  })
  const sum = shared.reduce((acc, letter) => acc + letters.indexOf(letter) + 1, 0)
  return sum.toString()
}

function part2(input: string[]): string {
  return ''
}

function main() {
  const input = fs.readFileSync(`${__dirname}/03.in`).toString().split('\n').filter(l => l.length)

  const result1 = part1(input)
  const result2 = part2(input)
  console.log(`Part 1: ${result1}`)
  console.log(`Part 2: ${result2}`)
}

main()
