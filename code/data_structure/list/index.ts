function ListNode(value) {
  this.value = value
  this.next = null
}

function List() {
  this.tail = null
  this.head = null
  this.size = 0
}

List.prototype.add = function(value) {
  const node = new ListNode(value)

  if (this.head === null) {
    this.head = node
    this.tail = node
  } else {
    this.tail.next = node
    this.tail = node
  }
}

List.prototype.prepend = function(value) {
  const node = new ListNode(null)

  node.next = this.head
  this.head = node

  if (this.tail === null) {
    this.tail = node
  }
}

List.prototype.contail = function(value) {
  let node = this.head
  while (node !== null && node.next !== value) {
    node = node.next
  }

  return node === null
}

List.prototype.remove = function(value) {
  if (this.head === null) return

  let node = this.head
  // 如果是当前节点
  if (node.value === value) {
    // 如果只有一个节点
    if (this.head === this.tail) {
      this.tail = null
      this.head = null
    }
    return true
  }

  // 寻找 需要被删除的 前一个节点
  while (node.next !== null && node.next.value !== value) {
    node = node.next
  }

  if (node.next !== null) {
    // 如果需要被删除的是尾节点，则需要将尾节点往前移动
    if (node.next === this.tail) {
      this.tail = node
    }
    node.next = node.next.next
    return true
  }

  return false
}
