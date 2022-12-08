import fs from 'fs'

interface Tree {
  height: number
}

function buildForest(lines: string[]): Tree[][] {
  const forest: Tree[][] = []
  lines.forEach((line) => {
    forest.push(line.split('').map((c) => ({
      height: parseInt(c)
    })))
  })
  return forest
}

function part1(lines: string[]): string {
  const forest = buildForest(lines)
  let visible: Map<string, boolean> = new Map()

  // Visible from left
  for (let r = 0; r < forest.length; r++) {
    let highest = -1
    for (let c = 0; c < forest[r].length; c++) {
      const tree = forest[r][c]
      if (tree.height > highest) {
        highest = tree.height
        visible.set(`${r},${c}`, true)
      }
    }
  }

  // Visible from right
  for (let r = 0; r < forest.length; r++) {
    let highest = -1
    for (let c = forest[r].length - 1; c >= 0; c--) {
      const tree = forest[r][c]
      if (tree.height > highest) {
        highest = tree.height
        visible.set(`${r},${c}`, true)
      }
    }
  }

  // Visible from top
  for (let c = 0; c < forest[0].length; c++) {
    let highest = -1
    for (let r = 0; r < forest.length; r++) {
      const tree = forest[r][c]
      if (tree.height > highest) {
        highest = tree.height
        visible.set(`${r},${c}`, true)
      }
    }
  }

  // Visible from bottom
  for (let c = 0; c < forest[0].length; c++) {
    let highest = -1
    for (let r = forest.length - 1; r >= 0; r--) {
      const tree = forest[r][c]
      if (tree.height > highest) {
        highest = tree.height
        visible.set(`${r},${c}`, true)
      }
    }
  }

  return visible.size.toString()
}

function calculateOverview(forecast: Tree[][], x: number, y: number): number {
  let up: number = 0
  let down: number = 0
  let left: number = 0
  let right: number = 0

  if (x === 0 || y === 0) {
    return 0
  }

  // From top
  for (let r = y - 1; r >= 0; r--) {
    up++
    if (forecast[r][x].height >= forecast[y][x].height) {
      break
    }
  }

  // From bottom
  for (let r = y + 1; r < forecast.length; r++) {
    down++
    if (forecast[r][x].height >= forecast[y][x].height) {
      break
    }
  }

  // From left
  for (let c = x - 1; c >= 0; c--) {
    left++
    if (forecast[y][c].height >= forecast[y][x].height) {
      break
    }
  }

  // From right
  for (let c = x + 1; c < forecast[y].length; c++) {
    right++
    if (forecast[y][c].height >= forecast[y][x].height) {
      break
    }
  }
  return up * down * left * right
}

function part2(lines: string[]): string {
  const forest = buildForest(lines)
  let visible: Map<string, boolean> = new Map()

  let maxOverview = 0

  // Visible from left
  for (let r = 0; r < forest.length; r++) {
    let highest = -1
    let highestCol = -1
    for (let c = 0; c < forest[r].length; c++) {
      const tree = forest[r][c]
      if (tree.height > highest) {
        highest = tree.height
        visible.set(`${r},${c}`, true)
        highestCol = c
      }
    }
    const overview = calculateOverview(forest, highestCol, r)
    maxOverview = Math.max(maxOverview, overview)
  }

  // Visible from right
  for (let r = 0; r < forest.length; r++) {
    let highest = -1
    let highestCol = -1
    for (let c = forest[r].length - 1; c >= 0; c--) {
      const tree = forest[r][c]
      if (tree.height > highest) {
        highest = tree.height
        visible.set(`${r},${c}`, true)
        highestCol = c
      }
    }
    const overview = calculateOverview(forest, highestCol, r)
    maxOverview = Math.max(maxOverview, overview)
  }

  // Visible from top
  for (let c = 0; c < forest[0].length; c++) {
    let highest = -1
    let highestRow = -1
    for (let r = 0; r < forest.length; r++) {
      const tree = forest[r][c]
      if (tree.height > highest) {
        highest = tree.height
        visible.set(`${r},${c}`, true)
        highestRow = r
      }
    }
    const overview = calculateOverview(forest, c, highestRow)
    maxOverview = Math.max(maxOverview, overview)
  }

  // Visible from bottom
  for (let c = 0; c < forest[0].length; c++) {
    let highest = -1
    let highestRow = -1
    for (let r = forest.length - 1; r >= 0; r--) {
      const tree = forest[r][c]
      if (tree.height > highest) {
        highest = tree.height
        visible.set(`${r},${c}`, true)
        highestRow = r
      }
    }
    const overview = calculateOverview(forest, c, highestRow)
    maxOverview = Math.max(maxOverview, overview)
  }

  return maxOverview.toString()
}

function main() {
  const input = fs.readFileSync(`${__dirname}/08.in`).toString().split('\n').filter(l => l.length)
  const result1 = part1(input)
  const result2 = part2(input)
  console.log(`Part 1: ${result1}`)
  console.log(`Part 2: ${result2}`)
}

main()
