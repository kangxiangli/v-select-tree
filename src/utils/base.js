
/**
 * 将对象数据扁平化处理
 * @param {Array} data
 */
const treeToList = function (data, config = {}) {
  if (!Array.isArray(data)) return

  let { children = 'children' } = config
  let tree = JSON.parse(JSON.stringify(data))
  let list = []

  while (tree.length) {
    let item = tree.shift()
    list.push(item)
    if (item[children] && item[children].length) {
      tree = [...item[children], ...tree]
    }
  }
  return list
}
export {
  treeToList
}
