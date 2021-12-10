<template>
  <div class="head clearfix">
    <!-- 关闭和打开侧边栏按钮 -->
    <button class="sidebar-unfold left" @click="sidebarUnfold()"></button>

    <!-- 面包屑 -->
    <div class="breadcrumb left">
      <router-link to="/">首页</router-link>
      <template v-if="breadcrumb">
        <i>/</i>
        <span>
          {{breadcrumb.name}}
        </span>
      </template>
    </div>
    <div class="menu right clearfix">
      <div class="search left clearfix">
        <label>
          <span>
            <img src="../assets/images/icon/search.png" />
          </span>
          <input type="search" placeholder="搜索" />
        </label>
      </div>
      <div class="down lang left">
        <img src="../assets/images/icon/langs.png" />
        <div>
          <a @click="tPath('zh')">中文</a>
          <a @click="tPath('en')">English</a>
        </div>
      </div>
      <div class="down user right">
        <img src="../assets/images/icon/user.png" />
        <div>
          <router-link to="/">首页</router-link>
          <router-link to="/user-center" >个人中心</router-link>
          <a>退出登录</a>
        </div>
      </div>
    </div>
  </div>

  <!-- 标签 -->
  <div class="label">
    <span v-for="(item, k) in labels" :key="k">
      <router-link :to="item.path" :class="{c: k > 0}">
        {{ item.lang ? $t(`sidebar.${item.lang}`) : item.name }}
      </router-link>
      <i v-if="k > 0" @click="deleteLabel(item)">
        <img src="../assets/images/icon/close.png" />
      </i>
    </span>
  </div>
</template>
<script>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { loadLocaleMessages } from '../i18n'
export default {
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    let unfold = true
    
    const deleteLabel = (item) => {
      item.type = 'del'
      store.dispatch('pushLabels', item)
      const labels = store.state.labels
      const r = labels[labels.length - 1]
      router.push({
        path: r.path
      })
    }

    const sidebarUnfold = () => {
      unfold = !unfold
      store.commit('changeSidebarUnfold', unfold)
    }

    const tPath = (lang) => {
      window.sessionStorage.setItem('lang', lang)
      loadLocaleMessages(lang)
    }

    const breadcrumb = computed (() => {
      if (route.path !== '/') {
        return route
      }
      return ''
    })
    
   
    return {
      breadcrumb,
      unfold,
      labels: store.state.labels,
      deleteLabel,
      sidebarUnfold,
      tPath
    }
  },
}
</script>
<style scoped lang="less">
.head {
  height: 50px;
  background: #fff;
  // overflow: hidden;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  .sidebar-unfold {
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url('../assets/images/icon/shousuo.png') no-repeat center center;
    background-size: 20px;
    cursor: pointer;
  }
  .breadcrumb {
    display: inline-block;
    margin-left: 20px;
    line-height: 50px;
    i {
      display: inline-block;
      padding: 0 5px;
      opacity: .6;
    }
    span {
      opacity: .6;
    }
    a {
      color: #444;
      &:hover {
        color: #1890ff;
      }
    }
  }
  .menu {
    padding: 10px 20px 0 0;
  }
  .search {
    span {
      float: left;
      width: 30px;
      height: 30px;
      margin-right: 5px;
      opacity: .7;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
      img {
        display: block;
        width: 20px;
        margin-top: 5px;
      }
    }
    input {
      display: inline-block;
      width: 150px;
      height: 30px;
      border-bottom: 1px solid #c3c3c3;
      &::-webkit-input-placeholder {
        color: #999;
        font-size: 12px;
      }
    }
  }
  .down {
    position: relative;
    margin-left: 10px;
    width: 30px;
    height: 40px;
    img {
      display: block;
      width: 22px;
      margin: 5px;
      opacity: .7;
      cursor: pointer;
    }
    &:hover {
      div {
        display: block;
      }
    }
    &.lang {
      div {
        left: -20px;
        &::after {
          left: 30px;
        }
      }
    }
    &.user {
      div {
        left: auto;
        right: -10px;
        width: 80px;
        &::after {
          left: auto;
          right: 17px;
        }
      }
    }
    div {
      position: absolute;
      display: none;
      top: 100%;
      z-index: 100;
      margin-top: -1px;
      padding: 10px 0;
      background: #fff;
      box-shadow: 0 0 6px 0 rgb(0 0 0 / 20%);
      &::after {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        background-size: 12px;
        left: 10px;
        top: -7px;
        background: #fff;
        border-left: 1px solid #dedede;
        border-top: 1px solid #dedede;
        transform: rotate(45deg);
      }
      a {
        display: block;
        padding: 4px 14px;
        font-size: 13px;
        color: #444;
        transition: .3s;
        cursor: pointer;
        &:hover {
          color: #fff;
          background: #1890ff;
        }
      }
    }
  }
}

.label {
  height: 34px;
  width: 100%;
  padding-left: 10px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  -webkit-box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
  span {
    position: relative;
    display: inline-block;
    margin: 3px 0 0 5px;
    i {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 16px;
      height: 16px;
      border-radius: 100%;
      cursor: pointer;
      transition: .2s;
      &:hover {
        background: #b4bccc;
      }
      img {
        display: block;
        width: 10px;
        margin: 3px;
      }
    }
    a {
      display: block;
      font-size: 12px;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #72757c;
      background: #fff;
      padding: 0 8px;
      border-radius: 2px;
      transition: .2s;
      &.c {
        padding-right: 25px;
      }
      &:hover {
        color: #222;
        border-color: #a5a5a5;
      }
      &.router-link-active {
        color: #fff;
        background: #1890ff;
        border-color: #1890ff;
      }
    }
  }
}
</style>