import rob from './../one'

it('test rob', () => {
  expect(rob([1, 2, 3, 1])).toBe(4)
  expect(rob([2, 7, 9, 3, 1])).toBe(12)
  expect(rob([2, 1, 1, 9, 2, 9])).toBe(20)
})
