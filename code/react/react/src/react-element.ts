import { ReactComponent } from './component'

export let REACT_ELEMENT_TYPE = 0xeac7

const ReactCurrentOwner = {
  current: {}
}

export const createElement = (
  type: ReactElementType,
  config?: {
    ref?: any
    key?: string | number
    __self?: any
    __source?: any
  },
  ...children: any[]
): ReactElement => {
  const props: any = {}
  let key = null
  let ref = null
  // let self = null
  // let source = null
  if (config) {
    ref = config.ref
    key = config.key ? `${config.key}` : null
    // self = config.__self === undefined ? null : config.__self
    // source = config.__source === undefined ? null : config.__source

    for (let prop in config) {
      if (config.hasOwnProperty(prop)) {
        props[prop] = config[prop]
      }
    }
  }

  props.children = children

  // if (type && type.defaultProps) {
  //   const defaultProps = type.defaultProps
  //   for (let propName in defaultProps) {
  //     if (props[propName] === undefined) {
  //       props[propName] = defaultProps[propName]
  //     }
  //   }
  // }

  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    _owner: ReactCurrentOwner.current
  }
}

export type ReactElementType = (() => ReactElement) | string | ReactComponent

export type ReactElement = {
  $$typeof: number
  type: ReactElementType
  key: string | null
  ref: any
  props: { children: ReactElement[]; [key: string]: any }
  _owner: any
}
