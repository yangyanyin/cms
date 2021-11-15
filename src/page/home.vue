<template>
  首页
  <p> <router-link to="/about">about</router-link></p>
  <input />
  <!-- <HelloWorld msg="yangyanyin" /> -->
  <p @click="test">{{readersNumber}}:{{book}}</p>
</template>
<script>
import { onMounted } from 'vue'
// import HelloWorld from '../components/HelloWorld.vue'
export default {
  components: {
    // HelloWorld
  },
  methods: {
    test () {
      console.log('test')
    }
  },
  setup(props, content) {
    const readersNumber = 12312
    const book = { title: 'Vue 3 Guide' }
    
    onMounted(() => {
      console.log(props, content)
    })
    // 暴露给 template
    return {
      readersNumber,
      book
    }
  },
}
</script>
