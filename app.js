const countTrue = (arr) => {
  let trueCount = 0;
  if (arr.length === 0) {
    return 0;
  }

  arr.forEach((item) => {
    if (item === true) {
      trueCount++;
    }
  });

  return trueCount;
};

console.log(countTrue([false, true, false]));
