export default function(input) {
  const sorted = [...input].sort();
  const result = [];

  for (const value of input) {
    let i = 0;
    while(sorted[i] !== value) {
      ++i;
    }

    result.push(i);
  }

  return result;
}
