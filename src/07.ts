import fs from 'fs'

type Tree = {
  [key: string]: {
    path: string
    size: number
    type: 'file' | 'folder'
    listed: boolean
    content: Tree
    parent: string
  }
}

function part1(lines: string[]): string {
  const tree: Tree = {
    '/': {
      path: '/',
      size: 0,
      type: 'folder',
      listed: false,
      content: {},
      parent: '',
    }
  }

  let current: string = ''
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('$ cd')) {
      // change directory
      if (line.split(' ')[2] === '/') {
        current = '/'
        console.log(`${line} => ${current}`)
      } else if (line.startsWith('$ cd ..')) {
        // parent directory
        current = current.split('/').slice(0, -2).join('/') + '/' || '/'
        console.log(`${line} => ${current}`)
      } else {
        const parent = current
        current = current + line.split(' ')[2] + '/'
        if (!tree[current]) {
          tree[current] = {
            path: current,
            size: 0,
            type: 'folder',
            listed: false,
            content: {},
            parent,
          }
        }
        console.log(`${line} => ${current}`)
      }
    } else if (line.startsWith('$ ls')) {
      // listing directory
      if (tree[current].listed) {
        continue
      }
      tree[current].listed = true
      console.log(`${line} => LISTING ${current}`)
      i++
      while (i < lines.length && !lines[i].startsWith('$')) {
        const item = lines[i]
        console.log(`ITEM: ${item}`)
        i++
        if (item.startsWith('dir')) {
          const name = item.split(' ')[1]
          const path = current + name + '/'
          if (!tree[path]) {
            tree[path] = {
              path,
              size: 0,
              type: 'folder',
              listed: false,
              content: {},
              parent: current,
            }
          }
        } else {
          const [size, name] = item.split(' ')
          const path = current + name
          if (!tree[path]) {
            tree[path] = {
              path,
              size: Number(size),
              type: 'file',
              listed: false,
              content: {},
              parent: current,
            }
          }
          let parent = current
          while (parent) {
            console.log(`UPDATING ${parent} with ${size}`)
            tree[parent].size += Number(size)
            parent = tree[parent].parent
          }
        }
      }
      i--
    }
  }
  let sum = Object.values(tree).reduce((acc, item) => {
    if (item.type === 'folder' && item.size <= 100000) {
      console.log(`${item.path} => ${acc} + ${item.size}`)
      acc += item.size
    }
    return acc
  }, 0)
  console.log(tree)
  // Object.values(tree).forEach(item => {
  //   console.log(`[${item.type === 'folder' ? 'd' : 'f'}] ${item.path} => ${item.size}`)
  // })
  return sum.toString()
}

function part2(line: string): string {

  return 'invalid'
}

function main() {
  const input = fs.readFileSync(`${__dirname}/07.in`).toString().split('\n').filter(l => l.length)
  const result1 = part1(input)
  const result2 = part2(input[0])
  console.log(`Part 1: ${result1}`)
  console.log(`Part 2: ${result2}`)
}

main()
