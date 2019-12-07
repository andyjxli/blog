---
layout: post
title: useFetch
image: img/xiyizhou.jpg
author: XiYiZi
date: 2019-03-10T10:00:00.000Z
draft: false
tags:
  - Time
category: { zh_name: "前端", en_name: "frontend" }
---

<center><h1>useFetch</h1></center>

## 前言

> 自 React Hooks 16.8.0 后带来了 React hooks 这一特性。这一特性在没有破坏性的更新下为我们带来了更加舒爽的开发方式。过去我们常常因 providers，consumers，高阶组件，render props 等形成“嵌套地狱”。尽管 Class Component 在某种程度上为我们提供了更方便的写法以及生命周期，但同时也带来了一些不好的地方。例如难以理解的 class 内部原理、难以测试的声明周期。而 React Hooks 为我们提供了一种 Function Component 的写法，让我们用更少的代码写出更加优雅、易懂的代码。本文不做 React Hooks API 的讲述，如有不懂，请移步 [Hooks 简介](https://react.docschina.org/docs/hooks-intro.html)

## 发送服务端请求所面临的问题

#### 1. try / catch 问题

在开发代码时，我们发送后端请求后接受到的数据，需要使用 try/catch 来捕获错误。而每次捕获出的错误可能需要打印出来以检测 bug。这样我们每次都会写同样的代码，这样在开发过程中很不友好。同时有些同学不习惯使用 try/catch 来捕获错误，这就可能造成不可预计的问题。

```javascript
import React, { useCallback, useReducer, useEffect } from "react"
import { TimeNumberType, PageType } from "common/constant/interface"

type ParamsType = PageType & TimeNumberType

const reducer = (state: ParamsType, action: Actions) => {
  const { payload } = action
  return { ...state, ...payload }
}
const postListData = (params: ParamsType) =>
  post("/network/api/test/getlist", params)
const initialParams = {
  pageSize: 10,
  pageNumber: 1,
  startTime: 0,
  endTime: 0,
}

const ListComponent = () => {
  const [params, dispatch] = useReducer(reducer, initialState)
  const getList = async () => {
    // try catch
    try {
      const res = await postListData(params)
      console.log(res)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getList()
  }, [params])
}
```

demo 中展示了在业务场景中发送请求的场景，当发送请求多了之后我们会每次手动 try / catch，虽然不是大问题，但是重复代码写多了会觉得难受...。下面看第二个功能。

#### 2. 请求状态

在实际的业务场景中，我们向后端发送请求时，往往伴随着用户点击多次，但是只能发送一次请求的问题，这时我们需要手动加锁。并且在很多场景中我们需要知道请求状态来为页面设置 loading。例如：

```javascript
import React, { useCallback, useReducer, useEffect } from "react"
import { TimeNumberType, PageType } from "common/constant/interface"
import { DateRangePicker, Table } from "UI"

type ParamsType = PageType & TimeNumberType

const TIME = Symbol("time")
const PAGE = Symbol("page")
const reducer = (state: ParamsType, action: Actions) => {
  const { payload } = action
  return { ...state, ...payload }
}
const postListData = (params: ParamsType) =>
  post("/network/api/test/getlist", params)
const initialParams = {
  pageSize: 10,
  pageNumber: 1,
  startTime: 0,
  endTime: 0,
}

const ListComponent = () => {
  const [params, dispatch] = useReducer(reducer, initialState)
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState({})

  const getList = async () => {
    // loading is true
    if (loading) return
    // set loading status
    setLoading(true)
    // try catch
    try {
      const res = await postListData(params)
      setList(res)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    getList()
  }, [params])

  return (
    <div style={{ marginBottom: "20px" }}>
      <DateRangePicker onChange={handleDateChange} />
      <Table
        onPageChange={(pageNumber: number) => {
          dispatch({ payload: { pageNumber }, type: PAGE })
        }}
        list={list}
        // 数据是否正在加载，以此来判断是否需要展示loading
        loading={loading}
      />
    </div>
  )
}
```

demo 中展示了日期组件以及包含有分页器的 Table 组件，当日期发生变更，或者分页器发生变更时，我们需要 dispatch 来更新请求参数，从而发送请求。在发送请求时如果正在请求，则忽略，而不在请求时需要手动加锁，来防止多次请求。
<br>
同时 Table 需要根据请求状态来判断是否需要展示 loading。

## 解决问题

基于以上的问题，我们能否通过 Hooks 来封装一个 custom hooks 来解决问题。

#### 1. 明确目标

> custom hooks 解决的问题

- 解决每个函数都要统一写 try/catch 的流程
- 解决发送请求需要手动加锁防止多次重复请求的痛点
- 不需要在手动 useState loading，直接获取 loading 值

所以我们需要在 custom hooks 中发送请求、暴露出请求后的值、暴露 loading 状态、以及用户可能需要多次请求，这就需要暴露一个勾子。在发生请求错误时可能需要做某些操作，所以还需要暴露在错误时回调的勾子函数。

> 是否立即请求并接受初始化返回值

业务我们并不希望初始化的是否立即发送请求。
并且能够有初始化的返回值

> 支持泛型

在 TS 中，开发者希望能够自定义请求的参数类型，以及请求结果的类型

#### 2. 定义函数

> useFetch 函数

```javascript
import { useState, useEffect } from "react";

/**
 * 1. 解决每个函数都要统一写try/catch的流程
 * 2. 解决发送请求需要手动加锁防止多次重复请求的痛点
 * 3. 不需要在手动useState loading了～，直接获取fetching值
 * 4. （甚至在参数发生变化时只需要传入更改的参数就OK）已删除
 * @param getFunction 发送请求的函数
 * @param params 参数
 * @param initRes 初始化值
 * @param execute 是否立即执行请求函数
 */

// R, P支持泛型
function UseFetch<R, P>(
  getFunction: any,
  params: P,
  initRes?: R,
  execute: boolean = true
): [
  R,
  boolean,
  (params?: Partial<P>) => void,
  (fn?: (err: any) => void) => void
] {
  type ErrorFunction = ((fn?: (err: any) => void) => void) | null;
  const [res, setRes] = useState(initRes as R);
  const [fetching, setFetch] = useState(false);
  const [failed, setFailed] = useState<ErrorFunction>(null);

  // 参数也许并不是每次都完整需要 Partial<P>
  const fetchData: (params?: Partial<P>) => void = async (params?: any) => {
    if (fetching) return;
    setFetch(true);
    try {
      setRes(await getFunction(params));
      setFetch(false);
    } catch (err) {
      console.error(err);
      setFetch(false);
      failed && failed(err);
    }
  };

  const setError: ErrorFunction = fn => fn && setFailed(fn);

  // 首次执行只请求一次
  useEffect(() => {
    execute && fetchData(params);
  }, []);

  /**
   * res 返回的数据
   * fetching 是否在请求中
   * fetchData 手动再次触发请求
   * setError 当发生请求错误时，需要执行的回掉函数
   */
  return [res, fetching, fetchData, setError];
}

const useFetch = UseFetch;

export default useFetch;


```

#### 3. 如何使用

根据最初的 demo 我们改造一下代码

```javascript
import React, { useCallback, useReducer, useEffect } from 'react'
import { TimeNumberType, PageType } from 'common/constant/interface'
import { DateRangePicker, Table } from 'UI'
// 导入 useFetch
import { useFetch } from 'custom-hooks'

type ParamsType = PageType & TimeNumberType
type ListInfo = {list: Array<any>, total: number}

const TIME = Symbol('time')
const PAGE = Symbol('page')
const reducer = (state: ParamsType, action: Actions) => {
  const { payload } = action
  return { ...state, ...payload }
}
const postListData = (params: ParamsType) => post('/network/api/test/getlist', params)
const initialParams = {
  pageSize: 10,
  pageNumber: 1,
  startTime: 0,
  endTime: 0
}

const ListComponent = () => {
  const [params, dispatch] = useReducer(reducer, initialState)

  const [list, loading, getList] = useFetch<ListInfo, ParamsType>(
    getWithDraw,
    state,
    { list: [], total: 0 },
    false
  )

  useEffect(() => {
    getList()
  }, [params])

  return (
      <div style={{ marginBottom: '20px' }}>
        <DateRangePicker
          onChange={handleDateChange}
        />
      <Table
        onPageChange={(pageNumber: number) => {
          dispatch({ payload: { pageNumber }, type: PAGE })
        }}
        list={list}
        // 数据是否正在加载，以此来判断是否需要展示loading
        loading={loading}
      />
    </div>
  )
}
```

对比代码我们可以看到中间的请求的代码被我们干掉了，使用 useFetch 来将状态以及发送请求封装在一起。能够让我们写更少的代码。

<br>
同时 useFetch的第3个参数当传入的为 null 时，可以模拟请求发送错误，这样我们可以在开发时做兜底方案。

#### 4. 也许并不想要那么多值。

也许有些请求不需要关注请求状态

```javascript
  // 解构赋值、空着就好
  const [list, , getList] = useFetch<ListInfo, ParamsType>(
    getWithDraw,
    state,
    { list: [], total: 0 },
    false
  )
```

本文完~

如有问题，欢迎指出~
