import algorithm from "./algorithm.js";

function test(input, expected) {
  const result = algorithm(input);

  if(result.length !== expected.length) {
    console.error("Result is different from expected:");
    const sortedInput = [...input].sort();
    console.table({input, sortedInput, result, expected});
    return;
  }

  for(let i = 0; i < result.length; ++i) {
    if(result[i] !== expected[i]) {
      console.error("Result is different from expected:");
      const sortedInput = [...input].sort();
      console.table({input, sortedInput, result, expected});
      return;
    }
  }
}

test([4, 6, 2, 6], [1, 2, 0, 2]);
test([1, 2, 3, 1, 2, 3, 1, 2, 3], [0, 1, 2, 0, 1, 2, 0, 1, 2]);
test([11, 22, 33, 1, 2, 3], [3, 4, 5, 0, 1, 2]);
test([3, 2, 1, "foo"], [2, 1, 0, 3]);
