import fs from 'fs'

function part1(input: string[]): string {
  let fullyContainCount = 0
  input.forEach(line => {
    const [p1, p2] = line.split(',')
    const [p11, p12] = p1.split('-').map(Number)
    const [p21, p22] = p2.split('-').map(Number)

    if (p11 <= p21 && p12 >= p22) {
      fullyContainCount++
    } else if (p21 <= p11 && p22 >= p12) {
      fullyContainCount++
    }
  })
  return fullyContainCount.toString()
}

function part2(input: string[]): string {
  let fullyContainCount = 0
  input.forEach(line => {
    const [p1, p2] = line.split(',')
    const [p11, p12] = p1.split('-').map(Number)
    const [p21, p22] = p2.split('-').map(Number)

    if (p11 <= p21 && p12 >= p21) {
      fullyContainCount++
    } else if (p21 <= p11 && p22 >= p11) {
      fullyContainCount++
    }
  })
  return fullyContainCount.toString()
}

function main() {
  const input = fs.readFileSync(`${__dirname}/04.in`).toString().split('\n').filter(l => l.length)

  const result1 = part1(input)
  const result2 = part2(input)
  console.log(`Part 1: ${result1}`)
  console.log(`Part 2: ${result2}`)
}

main()
