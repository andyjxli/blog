import { render } from './src/render'

const ReactDom = {
  render: (vnode: any, container: any) => {
    console.log(container)
    // 多次调用清除上次的缓存
    container.innerHTML = ''
    return render(vnode, container)
  }
}

export default ReactDom
