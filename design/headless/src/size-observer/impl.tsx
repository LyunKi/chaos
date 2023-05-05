import React from 'react'
import { combineRefs } from '@cloud-dragon/react-utils'
import { SizeObserverProps } from './api'

/**
 * 为node节点创建观察者
 * @param node
 * @param onResize
 * @returns {ResizeObserver|MutationObserver}
 */
function createObserver(
  node: HTMLElement,
  onResize: (node: HTMLElement) => any
): ResizeObserver | MutationObserver {
  if (window.ResizeObserver) {
    const resizeObserver = new window.ResizeObserver(() => {
      onResize(node)
    })
    resizeObserver.observe(node)
    return resizeObserver
  }
  // 部分浏览器对ResizeObserver支持存在问题
  const cachedSize = { width: 0, height: 0 }
  const onSizeChange = () => {
    const { width, height } = node.getBoundingClientRect()
    if (cachedSize.width !== width || cachedSize.height !== height) {
      cachedSize.width = width
      cachedSize.height = height
      onResize(node)
    }
  }
  const mutationObserver = new MutationObserver(onSizeChange)
  mutationObserver.observe(node, {
    subtree: true,
    childList: true,
    attributes: true,
    characterData: true,
  })
  return mutationObserver
}

/**
 * 观察者，为children子组件绑定事件监听函数，并当相关属性发生变化时触发
 */
export const SizeObserver = React.forwardRef(
  ({ children, onResize }: SizeObserverProps, forwardRef) => {
    const innerRef = React.useRef()
    const child = React.Children.only(children) as any
    React.useEffect(() => {
      let observer: any
      if (innerRef.current) {
        observer = createObserver(innerRef.current!, onResize)
      }
      return () => {
        observer?.disconnect()
      }
    }, [onResize])
    return React.cloneElement(child, {
      ref: combineRefs(innerRef, forwardRef, child.ref),
    })
  }
)
