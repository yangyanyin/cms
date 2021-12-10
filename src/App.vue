<template>
  <Layou>
    <router-view></router-view>
  </Layou>
</template>
<script>
import './assets/css/app.less'
import Layou from './components/Layou'
export default {
  components: {
    Layou
  },
  setup () {},
}
</script>