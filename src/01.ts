import fs from 'fs'

function part1(input: string[]): string {
  let highest = 0
  let count = 0
  input.forEach((line: string) => {
    if (line.trim() === '') {
      if (count > highest) {
        highest = count
      }
      count = 0
      return
    }
    count += parseInt(line)
  })
  if (count > highest) {
    highest = count
  }
  return highest.toString()
}

function part2(input: string[]): string {
  let highests: number[] = []
  let count = 0
  input.forEach((line: string) => {
    if (line.trim() === '') {
      highests.push(count)
      count = 0
      return
    }
    count += parseInt(line)
  })
  if (count) {
    highests.push(count)
  }
  highests.sort((a, b) => {
    return a - b
  }).reverse()
  const sum = highests[0] + highests[1] + highests[2]
  return sum.toString()
}

function main() {
  const input = fs.readFileSync(`${__dirname}/01.in`).toString().split('\n')

  const result1 = part1(input)
  const result2 = part2(input)
  console.log(`Part 1: ${result1}`)
  console.log(`Part 2: ${result2}`)
}

main()
