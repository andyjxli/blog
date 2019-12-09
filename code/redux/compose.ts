export default function compose(...funcs: Array<Function>) {
  if (funcs.length === 0) {
    return (arg: any) => arg
  } else if (funcs.length === 1) {
    return funcs[0]
  } else {
    // niubility
    return funcs.reduce((a, b) => (...args: Array<any>) => a(b(...args)))
  }
}
