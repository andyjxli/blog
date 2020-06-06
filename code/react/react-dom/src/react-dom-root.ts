export type FiberRoot = {
  BaseFiberRootProperties: any
  ProfilingOnlyFiberRootProperties: any
  SuspenseCallbackOnlyFiberRootProperties: any
}

export type RootType = {
  render(children: any): void
  unmount(): void
  _internalRoot: FiberRoot
}

export type Container =
  | (Element & { _reactRootContainer?: RootType })
  | (Document & { _reactRootContainer?: RootType })

// export function createLegacyRoot(container: Container): RootType {
//   return new (ReactDOMBlockingRoot as any)(container, LegacyRoot, options)
// }

// function ReactDOMBlockingRoot(
//   container: Container,
//   tag: RootTag,
//   options: void | RootOptions,
// ) {
//   this._internalRoot = createRootImpl(container, tag, options);
// }
