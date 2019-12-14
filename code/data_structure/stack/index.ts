function Stack(max: number = Number.MAX_SAFE_INTEGER) {
  this.items = []
  this.max = max
}

Stack.prototype.pop = function() {
  return !this.empty() && this.items.pop()
}

Stack.prototype.push = function(element) {
  return this.size() < this.max && this.items.push(element)
}

Stack.prototype.empty = function() {
  return this.size() === 0
}

Stack.prototype.size = function() {
  return this.items.length
}

Stack.prototype.clear = function() {
  return (this.items = [])
}

export default Stack
