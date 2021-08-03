const fn = (nums, len, win) => {
  nums = [...nums, ...nums];
  len *= 2;
  let stack = [];
  for (let i = 0; i < len; i++) {
    if (nums[i] === stack[0]) stack.push(nums[i]);
    else stack = [nums[i]];
    if (stack.length === Number(win)) return console.log(i + 1, stack[0]);
  }
  return console.log('INF');
};
fn(['3', '3', '1', '3', '1', '1', '2', '3', '2', '2', '2', '2', '3', '3', '3', '3', '1'], 17, 3);
