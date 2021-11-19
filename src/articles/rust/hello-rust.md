---
title: 初识 Rust
tags: [{ title: 'rust', name: 'rust' }]
category: [{ title: 'Rust', name: 'rust' }]
domain: { title: '后端', name: 'backend' }
thumb: https://web-dev.imgix.net/image/0SXGYLkliuPQY3aSy3zWvdv7RqG2/KvZQXFKIGKEzAjxzf5bF.jpg?fit=crop&h=240&w=354&auto=format&dpr=2&q=50
authors:
  [
    {
      name: Andyjx Li,
      avatar: 'https://lh3.googleusercontent.com/a-/AOh14GhVfBena_EIWoZ93WX76STNMrpMt91EPalUROfh=s96-c',
      about:
        [
          { title: Github, link: 'https://github.com/andyjxli' },
          { title: Twitter, link: https://twitter.com/cuteblackcat9 },
        ],
    },
  ]
date: 2021-08-10
description: hello rust.
---

在 Rust 的官方介绍中，展示了 rust 的三个特性：

1. 高性能：因其没有**运行时**和**垃圾回收**，所以其速度特别快并且内存利用率高.
2. 可靠性：类型系统、所有权模型保证了内存安全和线程安全.
3. 生产力：出色的文档、编译器、集成工具.

## 运行时

运行时是语言在运行程序时所需要的环境，例如 Javascript 需要宿主浏览器提供一系列的 API 来保证程序能正常运行。

## 垃圾回收

在 JavaScript 中，为了提高内存的利用效率，程序在运行时，会有特性的程序去从根对象查找不再使用的内存([标记清除算法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Managemet))，从而释放。
而有些语言需要手动的释放内存，例如 C 语言中，当向内存申请一定的空间后，需要通过特定的函数去释放内存。

## 数据类型

#### 标量类型

1. 整数类型
   1. i8 - i128（默认为 i32）
   2. u8 - u128
2. 浮点类型
   1. f32, 32位单精度
   2. f64，64位双精度（默认）
3. 布尔类型
4. 字符类型 char 4字节

#### 复合类型

1. Tuple（元组）
2. 数组

数组与元组长度固定，但数组所有的数据类型必须相同. 同时声明也不一样.

## 所有权

> Rust 中既没有运行时的概念，也没有垃圾回收的机制。而是通过**所有权**来保证运行的高效与内存的利用率。

### 所有权规则

1. Rust 中的每一个值都有一个被称为其所有者的变量.
2. 值在任一时刻有且只有一个所有者.
3. 当所有者离开作用域，这个值将被丢弃.

理解起来很简单，每生命一个变量就是声明一个所有者，是其值的所有者。当这个所有者离开当前作用域的时候，值就会被丢弃。

### 作用域

在 JavaScript 中，每创建一个函数，都有创建一个执行上下文，这个上下文中包括：变量对象、作用域链、this 的指向。作用域决定了当前执行环境能够访问到的变量。

而 Rust 中也类似，当声明一个变量时，其作用域就已经确定了。

```rust

fn main() {
  loop {
    let i = 0;

    // i 将只能在 loop 中被访问.
  }
}

```

### 变量与数据交互的方式

#### 栈与堆

栈与堆都是代码在运行时可供使用的内存，区别在于处理内存的机制与数据大小的不同。

- 栈：先进后出；大小固定
- 堆：动态分配，使用指针引用；大小不固定

#### 变量与数据的移动

在 JavaScript 中，会存在这种情况：

```javascript
let a = {
  value: 2,
};
let b = a;
b.value = 3;

console.log(a.value); // 3

let c = 2;
let d = c;
d = 3;
console.log(c); // 2
```

原因在于基础变量类型是被分配到栈上，而对象类型是被分配到堆上，所以 a 和 b 指向的是同一个引用地址，从而导致 b 修改 value 值 时 a 也会受影响。

而在 Rust 中，表现则是这样的：

```rust
let x = 5;
let y = x;

println!("y: {}, x: {}", y, x); // y: 5, x: 5

let s1 = String::from("hello");
let s2 = s1;

println!("{}, world!", s1);

/* error[E0382]: use of moved value: `s1`
 --> src/main.rs:5:28
  |
3 |     let s2 = s1;
  |         -- value moved here
4 |
5 |     println!("{}, world!", s1);
  |                            ^^ value used here after move
  |
  = note: move occurs because `s1` has type `std::string::String`, which does
  not implement the `Copy` trait */
```

在所有权的规则中提到：当所有者离开当前作用域时，会立即释放内存。所以如果这个函数执行完的话， s1、s2 都将会被释放，但其引用的是同一个地址，会导致内存被释放两次，从而引起安全问题。这种也成为**二次释放**错误。在 JavaScript 中，因其使用的是垃圾回收机制，所以不会出现这种问题。

#### 变量与数据的移动

上述的二次释放问题，可以通过 clone 的方式来解决：

```rust
let s1 = String::from("hello");
let s2 = s1.clone();

println!("{}, world!", s1); // hello, world!
```

这种类似于 JavaScript 中的深拷贝，完完全全的复制出不同的内存块存储相同的数据。

## 引用与借用

引用分为可变引用与不可变引用，两者的区别：

- 不可变引用在一个作用域内可以存在多个，但其值不能被修改.
- 可变引用在特定的作用域内只能存在一个，但值可以被修改.

### 不可变引用

```rust
fn main() {
    let s = String::from("hello");

    change(&s);
}

fn change(some_string: &String) {
    some_string.push_str(", world");
}
```

上面的代码将会抛出异常，因其是不可变引用.

### 可变引用

```rust
fn main() {
    let mut s = String::from("hello");

    change(&mut s);

    let r1 = &mut s;
    let r2 = &mut s;
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

上面的代码将会因声明了多个可变引用可抛出异常.

在 Rust 中，禁止在特定的作用域内使用多个可变引用的原因是为了防止**数据竞争**，产生的原因可能是下面三种行为：

- 两个或更多指针同时访问同一个数据
- 至少有一个指针被用来写入数据
- 没有同步数据访问的机制

### 悬垂引用

在具有指针的语言中，很容易通过释放内存时保留指向它的指针而错误地生成一个 悬垂指针（dangling pointer）。悬垂引用指的是为被使用的引用。Rust 在编译时就能够确保不会发生此类错误。

```rust
fn dangle() -> &String { // dangle 返回一个字符串的引用

    let s = String::from("hello"); // s 是一个新字符串

    &s // 返回字符串 s 的引用
} // 这里 s 离开作用域并被丢弃。其内存被释放。
  // 危险！
```

### 引用总结

- 在任意给定时间，要么 只能有一个可变引用，要么 只能有多个不可变引用。
- 引用必须总是有效的。
