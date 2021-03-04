<template>
  <div id="app" v-cloak>
    <div class="all">
      <header-title v-if="$route.meta.title!='login'"></header-title>
      <div class="all_body">
        <loading v-show="showloading" :key="key"></loading>
        <!-- <router-view/> -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import loading from "@/components/loading.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      num: 1,
      headerTitle: "工作日志",
      showloading: false,
      showHead:false
    };
  },
  components: { loading },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + new Date()
        : this.$route + new Date();
    },
  },
  mounted() {},
  updated() {
  },
  methods: {
    // 存放基础信息
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 50px;   */
  height: auto;
  font-size: 16px;
}
[v-cloak] {
  display: none;
}
.ivu-tree-empty {
  /* font-size: 18px; */
  text-align: center;
  /* margin-top: 80px; */
}
body {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display:flex;
   flex-direction:column;
　　min-height:100vh;
}
.all {
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* background: #f2f2f2; */
}
.all_body {
  flex: 1;
  overflow: auto;
    
}
</style>
