import fs from 'fs'

interface Instruction {
  from: number
  to: number
  qty: number
}

function buildStacks(input: string[]): string[][] {
  let stacks: string[][] = []
  let i = 0
  while (!input[i].startsWith(' 1')) {
    const line = input[i]
    i++
    for (let j = 0; j < line.length; j = j +4) {
      const stack = line.substring(j, j+4).trim().replace(/(\[|\])/g, '')
      if (stack) {
        if (!stacks[j/4]) {
          stacks[j/4] = []
        }
        stacks[j/4].push(stack)
      }
    }
  }
  return stacks
}


function buildInstructions(input: string[]): Instruction[] {
  const instructions: Instruction[] = []
  input.forEach((line) => {
    if (line.startsWith('move')) {
      const matches = line.match(/move (\d+) from (\d+) to (\d+)/)
      if (matches) {
        instructions.push({
          from: parseInt(matches[2]),
          to: parseInt(matches[3]),
          qty: parseInt(matches[1])
        })
      }
    }
  })
  return instructions
}

function part1(stack: string[][], instructions: Instruction[]): string {
  const result: string[] = []
  instructions.forEach((instruction) => {
    const elements = stack[instruction.from - 1].splice(0, instruction.qty)
    stack[instruction.to - 1].splice(0, 0, ...elements.reverse())
  })
  stack.forEach((s) => {
    result.push(s.shift() || '')
  })
  return result.join('')
}

function part2(stack: string[][], instructions: Instruction[]): string {
  const result: string[] = []
  instructions.forEach((instruction) => {
    const elements = stack[instruction.from - 1].splice(0, instruction.qty)
    stack[instruction.to - 1].splice(0, 0, ...elements)
  })
  stack.forEach((s) => {
    result.push(s.shift() || '')
  })
  return result.join('')
}

function main() {
  const input = fs.readFileSync(`${__dirname}/05.in`).toString().split('\n').filter(l => l.length)
  const stacks = buildStacks(input)
  const stacks2 = buildStacks(input)
  const instructions = buildInstructions(input)
  const result1 = part1(stacks, instructions)
  const result2 = part2(stacks2, instructions)
  console.log(`Part 1: ${result1}`)
  console.log(`Part 2: ${result2}`)
}

main()
