import rob from './../two'

it('test rob', () => {
  expect(rob([1])).toBe(1)
  expect(rob([1, 2, 3, 1])).toBe(4)
  expect(rob([2, 7, 9, 3, 1])).toBe(11)
  expect(rob([2, 1, 1, 9, 2, 9])).toBe(19)
})
