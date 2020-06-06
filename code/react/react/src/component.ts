interface AnyObject {
  [key: string]: any
}
interface ComponentProps extends AnyObject {
  key?: string | number
}

interface ComponentThis {
  props: ComponentProps
  context: any
  refs: AnyObject
}
export function Component(this: any, props: ComponentProps, context?: any) {
  this.props = props
  this.context = context
  this.refs = {}
}
export type ReactComponent = typeof Component

Component.prototype.isReactComponent = {}
Component.prototype.setState = function(
  partialState: Function | Object,
  callback: (state: AnyObject) => void
) {}
Component.prototype.forceUpdate = function(callback: Function) {}

function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype

export function PureComponent(this: ComponentThis, props: ComponentProps, context: any) {
  this.props = props
  this.context = context
  this.refs = {}
}
1
// 继承 Component 的 prototype
const pureComponentPrototype = (PureComponent.prototype = new (ComponentDummy as any)())
pureComponentPrototype.constructor = PureComponent
Object.assign(pureComponentPrototype, Component.prototype)
pureComponentPrototype.isPureReactComponent = true
