function logger() {
  const arr = [1, 2];
  const arr2 = [3, 4];
  // arr.forEach.call(arr2, (e) => console.log(e));
  Array.prototype.forEach.call(arguments, (e) => console.log(e));
}

logger(1, 2, 3);
