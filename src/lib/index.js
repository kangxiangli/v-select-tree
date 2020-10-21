import mycomponent from './v-select-tree.vue'
const vSelectTree = {
  install: function(Vue) {
    Vue.component('vSelectTree', mycomponent)
  }
}
// 这里的判断很重要
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(vSelectTree)
}
export default vSelectTree
