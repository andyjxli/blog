import { longestPalindrome, longestPalindromeByDP } from '../longestPalindrome'

it('test longestPalindrome', () => {
  expect(longestPalindrome('abbbba')).toBe('abbbba')
  expect(longestPalindrome('babad')).toBe('bab')
  expect(longestPalindrome('cbbd')).toBe('bb')
  expect(longestPalindrome('ac')).toBe('a')
  expect(longestPalindrome('abb')).toBe('bb')
})

it('test longestPalindromeByDP', () => {
  expect(longestPalindromeByDP('abbbba')).toBe('abbbba')
  expect(longestPalindromeByDP('babad')).toBe('aba')
  expect(longestPalindromeByDP('cbbd')).toBe('bb')
  expect(longestPalindromeByDP('ac')).toBe('a')
  expect(longestPalindromeByDP('abb')).toBe('bb')
})
