<template>
  <div>打样单</div>
</template>
<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
export default {
  setup () {
    const breadcrumb = ref([])
    // const breadcrumb = [
    //   {
    //     name: '首页',
    //     link: '/'
    //   }
    // ]
    
    const route = useRoute()
    console.log(route)
    console.log(route.path, route.name)
    
    return {
      breadcrumb
    }
  },
}
</script>