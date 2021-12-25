// Heapify the array into priority queue
function init(arr) {
  const n = arr.length
  for(let i = n-1; i > -1; i--) {
    heapDown(arr, i)
  }
}

// Add entry to priority queue and heapify
function add(arr, entry) {
  console.log("ADDED", entry)
  arr.push(entry)
  // Heapify up
  heapUp(arr, arr.length-1)
}

// Remove min cost in priority queue and heapify
function pop(arr) {
  const n = arr.length
  if(n == 0) {
    console.log("Empty PQ")
    return
  }
  // Swap last with first
  swap(arr, 0, n-1)
  const ans = arr.pop()
  // Heapify down
  heapDown(arr, 0)
  console.log("POPPED", ans)
  return ans
}

// Heapify downward
function heapDown(arr, i) {
  const n = arr.length
  // Out of bounds
  if(i >= arr.length) return

  let min = i
  const left = i*2 + 1
  const right = i*2 + 2
  // Compare with left and right and find the new min
  if(left < n && arr[left][0] <= arr[min][0]) {
    min = left
  }
  if(right < n && arr[right][0] <= arr[min][0]) {
    min = right
  }

  // New min is found
  if(min !== i) {
    // Swap
    swap(arr, min, i)
    heapDown(arr, min)
  }
}

// Heapify upward
function heapUp(arr, i) {
  const n = arr.length

  const parent = parseInt((i-1)/2)
  if(i < n && arr[i][0] < arr[parent][0]) {
    swap(arr, i, parent)
    heapUp(arr, parent)
  }
}

function swap(arr, i, j) {
  const tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}


// TESTING
let arr = [
  [5, [1, 2]],
  [1, [2, 4]],
  [155, [6, 2]],
  [-1, [1, 2]],
  [8, [1, 4]],
  [2, [4, 2]],
]

console.log("PRE", arr)
init(arr)
console.log("POST", arr)

pop(arr)
pop(arr)
pop(arr)
pop(arr)
pop(arr)
add(arr, [1000, [8, 8]])
pop(arr)
add(arr, [0, [123, 123]])
pop(arr)
pop(arr)
pop(arr)
pop(arr)
pop(arr)
pop(arr)
pop(arr)
pop(arr)
pop(arr)
pop(arr)
pop(arr)
pop(arr)

export { init, add, pop };

