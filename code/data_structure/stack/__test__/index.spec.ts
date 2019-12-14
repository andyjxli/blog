import Stack from './../index'

it('test Stack', () => {
  const stack = new Stack()

  stack.push(1)
  expect(stack.size()).toBe(1)
  expect(stack.empty()).toBe(false)
  expect(stack.pop()).toBe(1)

  stack.push(2)
  stack.clear()
  expect(stack.size()).toBe(0)
})
