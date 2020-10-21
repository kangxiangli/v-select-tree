<template>
  <div id="app">
       <div class="main">
      <!-- 基础单选 start -->
      <div class="title">基础单选 </div>
      <div class="content">
        <v-select-tree
          :data="originData"
          v-model="value"
          :select="{
            clearable: true
          }"
          :tree="{
            'highlight-current': true
          }">
        </v-select-tree>
      </div>
      <!-- 基础单选 end -->

      <!-- 基础多选 start -->
      <div class="title">基础多选, 适用性较广的基础多选，用  <span class="block">Tag</span>展示已选项</div>
      <div class="content">
        <v-select-tree
          :data="originData"
          v-model="selection"
          :select="{
            multiple: true,
            'collapse-tags': true
          }"
          :tree="{
            'show-checkbox': true,
            'default-expanded-keys': selection
          }">
        </v-select-tree>
      </div>
      <!-- 基础多选 end -->

      <!-- 自定义树节点 start -->
      <div class="title">自定义树节点, 在 slot 为<span class="block"> node </span>内添加自定义节点，或者使用 render-content 的方式，示例</div>
      <div class="content">
        <v-select-tree style="width: 400px;"
          :data="customTree"
          v-model="selection3"
          :select="{
            multiple: false,
            clearable: true
          }"
          :tree="{
            'show-checkbox': false,
            'highlight-current': true
          }">
          <span style="display: inline-block; padding-left: 10px;">
            <el-button type="text" size="mini" @click="() => append('root')">添加根节点</el-button>
          </span>
          <span slot="node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button
                type="text"
                size="mini"
                @click.stop="() => append(data)">
                添加
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click.stop="() => remove(node, data)">
                删除
              </el-button>
            </span>
          </span>
        </v-select-tree>
      </div>
      <!-- 自定义树节点 end -->
      <!-- 树节点过滤 start -->
      <div class="title">树节点过滤</div>
      <div class="content">
        <v-select-tree style="width: 400px;"
          ref="filterTree"
          :data="customTree"
          v-model="selection3"
          :select="{
            multiple: false,
            clearable: true
          }"
          :tree="{
            'show-checkbox': false,
            'highlight-current': true,
            'filter-node-method': filterNode
          }">
          <div style="padding: 10px;">
            <el-input size="small"
              placeholder="输入关键字进行过滤"
              v-model="filterText">
            </el-input>
          </div>
        </v-select-tree>
      </div>
      <!-- 树节点过滤 end -->
    </div>
  </div>
</template>

<script>
import data from '../mock/data.json'
import treeData from '../mock/select-tree.json'

import vSelectTree from '../src/lib/v-select-tree.vue'
export default {
  name: 'app',
  components: {
    vSelectTree
  },
  watch: {
    filterText (val) {
      this.$refs['filterTree'].$refs['tree'].filter(val)
    }
  },
  data () {
    return {
      originData: treeData.content,
      value: '',
      selection: [],
      customTree: JSON.parse(JSON.stringify(treeData.content)),
      key: 444,
      selection3: '',
      filterText: ''

    }
  },
  methods: {
    filterNode (value, data) {
      console.log('filterNode: ', value)
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    append (data) {
      let key = this.key++
      const newChild = { key: key + '', label: 'testtest', children: [] }
      if (data === 'root') {
        // 根节点
        this.customTree.push(newChild)
      } else {
        // 普通节点
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
      }
    },
    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.key === data.key)
      children.splice(index, 1)
    }
  }

}
</script>

<style>
html,body{
  width: 100%;
  height: 100%;
  background:rgba(1, 3, 46, 1);
}
blockquote, body, button, dd, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, hr, input, legend, li, ol, p, pre, td, textarea, th, ul{
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.content{
  width: 90%;
  margin: 10px auto;
  background: rgba(255,255,255,0.05)
}
.main{
  padding: 16px;
}
.title{
  height: 30px;
  line-height: 30px;
  background: rgba(255,255,255,0.05);
  font-size: 16px;
  color: #fff;
  font-weight: 600;
  border-left: 2px solid #259ee3;
  padding-left: 4px;
  margin: 16px 0;
}
.block{
  color: coral;
  background: #867f7f61;
  padding: 0 16px;
  display: inline-block;
  border-radius: 5px;
  font-weight: 500;
  margin: 0 5px;
}
.contentFlex{
  display: flex;
}
.contentLeft{
  width: 49%;
  border-right: 1px dashed darkviolet;
}
.contentLeft{
  width: 49%;
}
</style>
