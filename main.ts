function comb<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.concat(arr2);
}

const out = comb([1, 2], [3, 4]);
console.log(out);

comb<number | string>([1, 2], ["a", "b"]);
