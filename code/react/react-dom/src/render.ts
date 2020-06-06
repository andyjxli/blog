import { ReactElement, ReactElementType } from '../../react/src/react-element'

export const render = (element: ReactElement, container: Element, callback?: Function) => {
  // return legacyRenderSubtreeIntoContainer(null, element, container, false, callback)

  const node = mount(element)
  return container.appendChild(node)
}

const mount = (element: ReactElement | string): Element | Text => {
  if (typeof element === 'string') {
    const textNode = document.createTextNode(element)
    return textNode
  }
  const { type } = element
  if (typeof type === 'function') {
    return mountComposite(element)
  } else if (typeof type === 'string') {
    return mountHost(element)
  }
  return type
}

const isClass = (type: ReactElementType) => {
  if (typeof type === 'function') {
    return type.prototype && type.prototype.isReactComponent
  }
  return false
}

const mountComposite = (element: ReactElement): any => {
  const { type, props } = element

  let renderedElement

  if (isClass(type)) {
    const publicInstance = new (type as any)(null, props)
    publicInstance.props = props

    if (publicInstance.componentWillMount) {
      publicInstance.componentWillMount()
    }
    renderedElement = publicInstance.render()
  } else if (typeof type === 'function') {
    renderedElement = type(props)
  }

  return mount(renderedElement)
}

const mountHost = (vnode: ReactElement): Element | Text => {
  if (typeof vnode === 'string') {
    const textNode = document.createTextNode(vnode)
    return textNode
  }

  const node = document.createElement(vnode.type as string)

  if (vnode.props) {
    Reflect.ownKeys(vnode.props).forEach(attr => {
      const value = vnode.props[attr as string]
      setAttribute(node, attr as string, value)
    })
  }

  vnode.props.children.forEach(currNode => render(currNode, node))

  return node
}

// const legacyRenderSubtreeIntoContainer = (
//   parentComponent: ReactElement | null,
//   children: ReactElement,
//   container: any,
//   forceHydrate: boolean,
//   callback?: Function
// ) => {
//   let root: RootType = container._reactRootContainer

//   if (!root) {
//     root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container)
//   }
// }

// const legacyCreateRootFromDOMContainer = (container: any): RootType => {
//   return createLegacyRoot
// }

const setAttribute = (dom: HTMLElement, name: string, value: any) => {
  if (name === 'children') return
  if (name === 'className') name = 'class'

  if (/on\w+/.test(name)) {
    name = name.toLowerCase()
    dom[name] = value || ''
  } else if (name === 'style') {
    if (!value || typeof value === 'string') {
      dom.style.cssText = value || ''
    } else if (value && typeof value === 'object') {
      for (let name in value) {
        dom.style[name] = typeof value[name] === 'number' ? `${value[name]}px` : value[name]
      }
    }
  } else {
    if (name in dom) {
      dom[name] = value || ''
    }
    if (value) {
      dom.setAttribute(name, value)
    } else {
      dom.removeAttribute(name)
    }
  }
}
