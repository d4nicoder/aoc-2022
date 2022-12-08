import fs from 'fs'

interface Tree {
  height: number
  left: boolean | null
  right: boolean | null
  top: boolean | null
  bottom: boolean | null
}

interface VerticalTracker {
  row: number
  height: number
}

interface SideTracker {
  col: number
  height: number
}

function buildForest(lines: string[]): Tree[][] {
  const forest: Tree[][] = []
  lines.forEach((line) => {
    forest.push(line.split('').map((c) => ({
      height: parseInt(c),
      top: null,
      bottom: null,
      left: null,
      right: null
    })))
  })
  return forest
}

function buildHeatMap(forest: Tree[][]) {
  forest.forEach((row) => {
    console.log(row.map((t) => t.height.toString()).join(''))
  })

  let top: VerticalTracker[] = Array(forest.length).fill(null).map(() => ({
    row: 0,
    height: 0
  }))
  let bottom: VerticalTracker[] = Array(forest.length).fill(null).map(() => ({
    row: 0,
    height: 0
  }))
  let left: SideTracker[] = Array(forest[0].length).fill(null).map(() => ({
    col: 0,
    height: 0
  }))
  let right: SideTracker[] = Array(forest[0].length).fill(null).map(() => ({
    col: 0,
    height: 0
  }))

  for (let i = 0; i < forest.length; i++) {
    const row = forest[i]
    top = top.map((t, col) => {
      if (row[col].height > t.height) {
        // console.log(`Top: row ${i} col ${col} top. ${row[col].height} > ${t.height}`)
        t.height = row[col].height
        t.row = i
      } else {
        // console.log(`Top: row ${i} col ${col} bottom. ${row[col].height} <= ${t.height}`)
      }
      return t
    })
    bottom = bottom.map((t, col) => {
      if (row[col].height >= t.height) {
        // console.log(`Bottom: row ${i} col ${col} top. ${row[col].height} > ${t.height}`)
        t.height = row[col].height
        t.row = i
      }
      return t
    })
    row.forEach((t, col) => {
      if (left[i].height < t.height) {
        left[i].height = t.height
        left[i].col = col
      }
      if (right[i].height <= t.height) {
        right[i].height = t.height
        right[i].col = col
      }
    })
  }

  return {
    top,
    bottom,
    left,
    right
  }
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

function part2(lines: string[]): string {
  return 'pending'
}

function main() {
  const input = fs.readFileSync(`${__dirname}/08.in`).toString().split('\n').filter(l => l.length)
  const result1 = part1(input)
  const result2 = part2(input)
  console.log(`Part 1: ${result1}`)
  console.log(`Part 2: ${result2}`)
}

main()
