<template>
  <ul class="sidebar" :class="{unfold: sidebarUnfold}">

    <li v-for="(item, k) in sidebarData" :key="k">
      <router-link :to="item.menu_url" @click="pushLabels(item)" v-if="item.menu_url"> 
        {{ item.lang ? $t(`sidebar.${item.lang}`) : item.name }}
      </router-link>
      <span v-else @click="showChild($event, k, item.child.length)" :class="{on: unfoldIndex.includes(k)}">
        {{ item.lang ? $t(`sidebar.${item.lang}`) : item.name }}
      </span>
      <ol class="child">
        <li v-for="(childItem, i) in item.child" :key="i">
          <router-link :to="childItem.menu_url" @click="pushLabels(childItem)">
            {{ childItem.lang ? $t(`sidebar.${childItem.lang}`) : childItem.name }}
          </router-link>
        </li>
      </ol>
    </li>
  </ul>
</template>
<script>
import { ref, watch, computed } from 'vue'
import SIDEBAR_DATA from '../config/sidebar'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  setup () {
    const store = useStore()
    const route = useRoute()
    const unfold = ref([]) // 展开的菜单索引
    const labels = ref([]) // 展开的菜单索引
    const pushLabels = (item) => {
      const data = {
        name: item.name,
        path: item.menu_url,
        lang: item.lang,
        type: 'add'
      }
      store.dispatch('pushLabels', data)
    }
    
    const showChild = (event, index, length) => {
      const olDome = event.currentTarget.nextElementSibling
      const deleteKey = unfold.value.indexOf(index)
      if (deleteKey < 0) {
        unfold.value.push(index)
        olDome.style.height = 56 * length + 'px'
      } else {
        unfold.value.splice(deleteKey, 1)
        olDome.style.height = '0px'
      }
    }

    watch (() => route.path, () => {
      if (route.path !== '/') {
        const data = {
          name: route.name,
          path: route.path,
          lang: route.lang,
          type: 'add'
        }
        store.dispatch('pushLabels', data)
      }
    })

    const sidebarUnfold = computed(() => {
      return store.state.sidebarUnfold
    })
    
    return {
      sidebarData: SIDEBAR_DATA,
      unfoldIndex: unfold,
      labelsList: labels,
      sidebarUnfold,
      showChild,
      pushLabels,
    }
  },
}
</script>
<style scoped lang="less">
.sidebar {
  position: fixed;
  height: 100%;
  width: 140px;
  background: #304156;
  transition: .3s;
  &.unfold {
    width: 210px;
  }
  li {
    a, span {
      position: relative;
      display: block;
      padding-left: 30px;
      line-height: 56px;
      color: #fff;
      cursor: pointer;
      &.router-link-active {
        color: #1890ff;
      }
    }
    span {
      &.on {
        &:after {
          transform: translateY(-50%) rotate(45deg) scale(.5);
        }
      }
      &:after {
        content: '';
        position: absolute;
        right: 15px;
        top: 50%;
        width: 14px;
        height: 14px;
        border-top: 3px solid #bac6d4;
        border-right: 3px solid #bac6d4;
        transition: .15s;
        transform: translateY(-50%) rotate(135deg) scale(.5);
      }
    }
    ol {
      height: 0;
      background: #1f2d3d;
      padding-left: 10px;
      transition: .3s;
      overflow: hidden;
    }
  }
}
</style>