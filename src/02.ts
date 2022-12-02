import fs from 'fs'

const correlations: Record<string, string> = {
  A: 'X',
  B: 'Y',
  C: 'Z'
}

const scoreRules: Record<string, number> = {
  X: 1,
  Y: 2,
  Z: 3,
}

const winners: Record<string, string> = {
  A: 'Y',
  B: 'Z',
  C: 'X',
}

const losers: Record<string, string> = {
  A: 'Z',
  B: 'X',
  C: 'Y',
}

const draws: Record<string, string> = {
  A: 'X',
  B: 'Y',
  C: 'Z',
}

function part1(input: string[]): string {
  let totalScore = 0
  input.forEach((line: string) => {
    const [opponent, you] = line.split(' ')
    if (!opponent || !you) {
      return
    }
    if (correlations[opponent] === you) {
      // Draw
      totalScore += 3 + scoreRules[you]
      return
    }

    if (winners[opponent] === you) {
      // Win
      totalScore += 6 + scoreRules[you]
      return
    }
    totalScore += scoreRules[you]
  })
  return totalScore.toString()
}

function part2(input: string[]): string {
  const modified: string[] = input.map((line: string): string => {
    let [opponent, you] = line.split(' ')
    if (!opponent || !you) {
      return ''
    }
    if (you === 'X') {
      // loose
      you = losers[opponent]
    } else if (you === 'Y') {
      // draw
      you = draws[opponent]
    } else {
      // win
      you = winners[opponent]
    }

    return `${opponent} ${you}`
  })
  return part1(modified)
}

function main() {
  const input = fs.readFileSync(`${__dirname}/02.in`).toString().split('\n')

  const result1 = part1(input)
  const result2 = part2(input)
  console.log(`Part 1: ${result1}`)
  console.log(`Part 2: ${result2}`)
}

main()
