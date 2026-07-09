//fibonacci function with iteration
const fibonnaci = function fib(n) {
  const sequence = [0, 1];
  for (let i = 2; i <= n; i++) {
    sequence[i] = sequence[i - 1] + sequence[i - 2];
  }
  return sequence.slice(0, n);
};

//fibonacci function with recursion
const fibsRecursive = function fibsRec(n) {
  console.log("This was printed recursively");

  if (n <= 2) {
    return [0, 1].slice(0, n);
  }
  const previous = fibsRec(n - 1);
  const nextNumber = previous.at(-1) + previous.at(-2);
  return previous.concat(nextNumber + 1);
};
fibsRecursive(n);

//Merge Sort function
const mergeSort = function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
};
function merge(left, right) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

export default mergeSort;
