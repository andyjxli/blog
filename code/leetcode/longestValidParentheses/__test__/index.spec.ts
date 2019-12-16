import longestValidParenthesesByDP, {
  longestValidParenthesesByStack,
} from './../index'

it('test longestValidParenthesesByDP', () => {
  expect(longestValidParenthesesByDP(')()())')).toBe(4)
  expect(longestValidParenthesesByDP(')(()()()')).toBe(6)
  expect(longestValidParenthesesByDP(')')).toBe(0)
  expect(longestValidParenthesesByDP('()')).toBe(2)
  expect(longestValidParenthesesByDP('(()())')).toBe(6)
  expect(longestValidParenthesesByDP(')(((((()())()()))()(()))(')).toBe(22)
})

it('test longestValidParenthesesByStack', () => {
  // expect(longestValidParenthesesByStack(')()())')).toBe(4)
  expect(longestValidParenthesesByStack('()()))')).toBe(4)
  // expect(longestValidParenthesesByStack(')')).toBe(0)
  // expect(longestValidParenthesesByStack('()')).toBe(2)
  // expect(longestValidParenthesesByStack('(()())')).toBe(6)
  // expect(longestValidParenthesesByStack(')(((((()())()()))()(()))(')).toBe(22)
})
