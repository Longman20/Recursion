import mergeSort from "./mergeSort";

test("returns empty array for empty input", () => {
  expect(mergeSort([])).toEqual([]);
});

test("returns single item array unchanged", () => {
  expect(mergeSort([73])).toEqual([73]);
});

test("returns already sorted array unchanged", () => {
  expect(mergeSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
});

test("sorts an unsorted array correctly", () => {
  expect(mergeSort([3, 2, 1, 13, 8, 5, 0, 1])).toEqual([
    0, 1, 1, 2, 3, 5, 8, 13,
  ]);
});

test("sorts a four item unsorted array correctly", () => {
  expect(mergeSort([105, 79, 100, 110])).toEqual([79, 100, 105, 110]);
});
