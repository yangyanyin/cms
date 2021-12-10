<template>
  <Sidebar />
  <main class="container-main" :class="{unfold: sidebarUnfold}">
    <Header />
    <div class="content">
      <slot></slot>
    </div>
  </main>
</template>
<script>
import Sidebar from './Sidebar'
import Header from './Header'
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  components: {
    Sidebar,
    Header
  },
  setup() {
    const store = useStore()
    const sidebarUnfold = computed(() => {
      return store.state.sidebarUnfold
    })
    return {
      sidebarUnfold
    }
  },
}
</script>
<style scoped lang="less">
.container-main {
  padding-left: 140px;
  transition: .3s;
  &.unfold {
    padding-left: 210px;
  }
  .content {
    padding: 20px;
  }
}
</style>