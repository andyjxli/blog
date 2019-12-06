---
layout: post
title: useIntersectionObserver
image: img/xiyizhou.jpg
author: XiYiZi
date: 2019-03-10T10:00:00.000Z
draft: false
tags:
  - Time
category: frontend
---

<center><h1>useIntersectionObserver</h1></center>

## 前言

本文使用 React Hooks 构建一个监听 DOM 元素曝光的 Custom Hooks，主要功能是监听 DOM 元素是否在规定内曝光，从而可以完成曝光打点。

过去我们监听 DOM 元素都是通过监听 scroll 事件来监听目标元素是否在可视区，这样我们需要获取目标元素的一些数据。这样似乎很麻烦，而通过 Intersection Observer 来完成监听，更加方便、友好。

## Intersection Observer

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver): IntersectionObserver 接口 (从属于 Intersection Observer API) 提供了一种异步观察目标元素与其祖先元素或顶级文档视窗(viewport)交叉状态的方法。祖先元素与视窗(viewport)被称为根(root)。

其他相关概念可见 [谈谈 IntersectionObserver 懒加载](https://juejin.im/post/5a7973575188257a5911a749) 、 [IntersectionObserver API 使用教程](http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)

简单来说这个对象会观察目标元素，当目标元素与它的祖先元素或者可视区发生交叉时，会触发回调函数。

通过这个对象我们可以监听需要曝光打点的元素，更方便的实现打点。同时我们不需要监听 scroll 事件以及相对应的 DOM 操作，减少了性能的开销。

## Intersection Observer 在 React 中的实践

为了能够在不同的场景中使用，我们可以将其封装成 HOOKS，更方便的调用该方法

#### 1. 定义 useIntersectionObserver 函数

```typescript
// useIntersectionObserver.ts
// 定义参数函数类型以及返回值类型

import { useState, useCallback, useEffect } from "react"

type NumberList = number[]
type ObserverList = Array<React.RefObject<any>>
type CallbackFunction = (indexList: NumberList) => void
type ResultType = [React.Dispatch<React.SetStateAction<React.RefObject<any>[]>>]

function UseIntersectionObserver(
  observerList: ObserverList,
  callback: CallbackFunction,
  infinite: boolean = false,
  opt: IntersectionObserverInit = {}
): ResultType {
  // list 为需要监听的元素列表。setList做为UseIntersectionObserver函数的返回值，可以让调用者修改需要监听的 list
  const [list, setList] = useState<ObserverList>(observerList)

  // intersectionObserver： 观察者对象
  let intersectionObserver: IntersectionObserver | null = null

  // ...
  return [setList]
}

const useIntersectionObserver = UseIntersectionObserver

export default useIntersectionObserver
```

UseIntersectionObserver 函数参数：

- observerList： 由被观察目标所组成的数组，数组项是由 React.createRef 构建出来的对象
- callback: 当目标元素被曝光所需要触发的函数，该函数接受一个参数 indexList，由被曝光元素在 observerList 数组中的索引组成
- infinite：是否持续观察目标元素，默认值为 false。（因为曝光打点一般只需上报一次）
- opt：可以自定义曝光条件（值的构成参考 MDN），默认为{ threshold: [1] }，只有当目标元素完全暴露在可视区内才触发回调

UseIntersectionObserver 返回值:

- 返回一个数组，数组的第一项元素由 React 的 useState 所返回。

#### 2. 实现监听

> 定义 observeExposure 函数

```typescript
// UseIntersectionObserver

const observeExposure = useCallback((list: ObserverList) => {}, [])
```

使用 useCallback 减少不必要的重复函数声明

> 判断浏览器环境以及 list 的是否为空

```typescript
if (typeof IntersectionObserver === "undefined") {
  throw new Error("Current browser does not support IntersectionObserver ")
}
if (list.length === 0) return
```

- 目标主流浏览器都已经支持该对象，但是还是兼容一些低版本浏览器
- 当 list 为空列表是直接 return

> 构造新的观察者实例

```typescript
// 当观察者存在时销毁该对象
intersectionObserver && intersectionObserver.disconnect()
// 构造新的观察者实例
intersectionObserver = new IntersectionObserver(entries => {
  // 保存本次监听被曝光的元素
  let activeList: NumberList = []

  // 递归每一个本次被监听对象，如果按照曝光条件出现在可视区，则调用callback函数，并且取消监听
  entries.forEach(entrie => {
    // 找出本次被监听对象在list中的索引
    const index = Array.from(list).findIndex(
      item => item.current === entrie.target
    )
    // 防止意外发生
    if (index === -1) return

    // isIntersecting是每个被监听的元素所自带的属性，若为ture，则表示被曝光
    // 并且未被曝光过
    if (entrie.isIntersecting) {
      // 保存本次曝光元素索引
      activeList.push(index)

      // 解除观察， 若需要无限观察则不取消监听
      !infinite &&
        intersectionObserver &&
        intersectionObserver.unobserve(list[index].current)
    }
  })

  // callback函数
  activeList.length > 0 && callback(activeList)
}, opt)
```

> 使用 intersectionObserver 监听 list 中的元素

```typescript
// 递归观察每一个元素
list.forEach(item => {
  item.current &&
    intersectionObserver &&
    intersectionObserver.observe(item.current)

  // 可以兼容直接传入DOM节点。
  // if((<React.RefObject<any>>item).current) {
  //   intersectionObserver.observe((<React.RefObject<any>>item).current)
  // } else if ((<HTMLElement>item)) {
  //   intersectionObserver.observe((<HTMLElement>item))
  // }
})
```

#### 3. 当每次被暴露的 setList 被调用时会使 list 被改变，此时需要重新监听

```typescript
useEffect(() => {
  observeExposure(list)

  // 当 umount 时取消链接
  return () => {
    intersectionObserver && intersectionObserver.disconnect()
  }
}, [list])
```

#### 4. 完整代码实现

```typescript
import { useState, useCallback, useEffect } from "react"

type NumberList = number[]
type ObserverList = Array<React.RefObject<any>>
type CallbackFunction = (indexList: NumberList) => void
type ResultType = [React.Dispatch<React.SetStateAction<React.RefObject<any>[]>>]

/**
 * UseIntersectionObserver
 * @param observerList 由被观察目标所组成的数组，数组项是由React.createRef构建出来的对象
 * @param callback 当目标元素被曝光所需要触发的函数，该函数接受一个参数indexList，由被曝光元素在observerList数组中的索引组成
 * @param infinite 是否持续观察目标元素，默认值为false。（因为曝光打点一般只需上报一次）
 * @param opt 可以自定义曝光条件（值的构成参考MDN），默认为{ threshold: [1] }，只有当目标元素完全暴露在可视区内才触发回调
 */
function UseIntersectionObserver(
  observerList: ObserverList,
  callback: CallbackFunction,
  infinite: boolean = false,
  opt: IntersectionObserverInit = {}
): ResultType {
  // list 为需要监听的元素列表。setList做为UseIntersectionObserver函数的返回值，可以让调用者修改需要监听的 list
  const [list, setList] = useState<ObserverList>(observerList)

  // intersectionObserver： 观察者对象
  let intersectionObserver: IntersectionObserver | null = null

  const observeExposure = useCallback((list: ObserverList) => {
    if (!IntersectionObserver) {
      throw new Error("Current browser does not support IntersectionObserver ")
    }
    if (list.length === 0) return
    // 当观察者存在时销毁该对象
    intersectionObserver && intersectionObserver.disconnect()
    // 构造新的观察者实例
    intersectionObserver = new IntersectionObserver(entries => {
      // 保存本次监听被曝光的元素
      let activeList: NumberList = []

      // 递归每一个本次被监听对象，如果按照曝光条件出现在可视区，则调用callback函数，并且取消监听
      entries.forEach(entrie => {
        // 找出本次被监听对象在list中的索引
        const index = Array.from(list).findIndex(
          item => item.current === entrie.target
        )
        // 防止意外发生
        if (index === -1) return

        // isIntersecting是每个被监听的元素所自带的属性，若为ture，则表示被曝光
        // 并且未被曝光过
        if (entrie.isIntersecting) {
          // 保存本次曝光元素索引
          activeList.push(index)

          // 解除观察， 若需要无限观察则不取消监听
          !infinite &&
            intersectionObserver &&
            intersectionObserver.unobserve(list[index].current)
        }
      })

      // callback函数
      activeList.length > 0 && callback(activeList)
    }, opt)

    list.forEach(item => {
      item.current &&
        intersectionObserver &&
        intersectionObserver.observe(item.current)

      // 可以兼容直接传入DOM节点。
      // if((<React.RefObject<any>>item).current) {
      //   intersectionObserver.observe((<React.RefObject<any>>item).current)
      // } else if ((<HTMLElement>item)) {
      //   intersectionObserver.observe((<HTMLElement>item))
      // }
    })
  }, [])

  useEffect(() => {
    observeExposure(list)

    // 当 umount 时取消链接
    return () => {
      intersectionObserver && intersectionObserver.disconnect()
    }
  }, [list])

  return [setList]
}

const useIntersectionObserver = UseIntersectionObserver

export default useIntersectionObserver
```

<br>

## 使用案例

> 实现一个简单的商品列表曝光打点的案例

```typescript
import Card from "components/goods-card/goods-card"
import { connect } from "react-redux"
import { getSinglePromotionList } from "../../page_components/promotion/redux/creator"
import React, { useEffect, useState, useCallback } from "react"
import useIntersectionObserver from "page_components/promotion/useIntersectionObserver"

const List = (props: { info: any; getData: any }) => {
  const { info, getData } = props

  // 被监听元素的列表
  const [refList, setRefList] = useState<React.RefObject<any>[]>([])

  const callback = useCallback((indexList: number[]) => {
    console.log(indexList)
  }, [])

  // 调用
  const [setList] = useIntersectionObserver(refList, callback)

  // 当refList发生改变时，调用我们的Hook返回的方法以更新需要监听的元素
  useEffect(() => {
    setList(refList)
  }, [refList])

  // 当数据发生改变时，重新生成RefList
  useEffect(() => {
    const list: React.RefObject<any>[] = info.list.map(() => React.createRef())
    setRefList(list)
  }, [info])

  // 发送请求，获取商品数据
  useEffect(() => {
    getData()
  }, [])

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {info.list.map((item: any, index: number) => (
        <div ref={refList[index]} key={index}>
          <Card card={item} />
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    info: state.promotionStore.singlePromotionInfo,
    userInfo: state.userInfo,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getData: () => dispatch(getSinglePromotionList(params, silence)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
```

> 案例效果

![](https://user-gold-cdn.xitu.io/2019/5/16/16ac0bbcd1c49ca4?w=600&h=329&f=gif&s=1867334)

从动图可以看出，当 card 被曝光时打印出索引值，而已经被曝光的值不会再次曝光。

<br>
<br>

本文完～
更多文章。 [我的掘金～](https://juejin.im/user/5800d4d367f3560058ab40e0)
如有疑问，欢迎指出～
