import longestValidParenthesesByDP from './../index'

it('test longestValidParenthesesByDP', () => {
  // expect(longestValidParenthesesByDP(')()())')).toBe(4)
  // expect(longestValidParenthesesByDP(')(()()()')).toBe(6)
  // expect(longestValidParenthesesByDP(')')).toBe(0)
  // expect(longestValidParenthesesByDP('()')).toBe(2)
  expect(longestValidParenthesesByDP('(()())')).toBe(6)
  // expect(longestValidParenthesesByDP(')(((((()())()()))()(()))(')).toBe(22)
})
