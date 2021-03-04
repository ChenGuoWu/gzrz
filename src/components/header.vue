<template>
  <div class="top">
    <div class="header">
      <div class="tab">
        <van-icon
          name="arrow-left"
          @click="backPhone"
          class="back"
          v-if="backs"
        />
        <van-icon name="arrow-left" @click="back" class="back" v-else />
        <van-icon name="cross" class="chacha" @click="gotoshouye" />
        <div class="text">
          <slot>{{ this.$route.meta.title }}</slot>
        </div>
        <div>
          <img
            src="@/assets/document/history.png"
            alt=""
            v-if="$route.meta.title == '特殊情况'"
            @click="goHistory"
          />
        </div>
        <div v-if="$store.state.delet&&$route.query.isSearch!=false" class="delet" @click="removeIndex" >
          删除
        </div>
        <div>
          <img
            src="@/assets/document/leftsearch.png"
            alt=""
            v-if="$route.meta.title == '工作日志'"
            @click="goPhone"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { remove } from "@/api/api";
import { mapState, mapMutations } from "vuex";

export default {
  created() {},
  components: {
    Icon: "van-icon",
  },
  computed: {
    ...mapState(["deletIdL", "backs"]),
  },
  data() {
    return {
      trueReal: false,
    };
  },
  name: "headerTitle",
  props: {
    headerTitle: {
      type: String,
      default: "",
    },
  },
  mounted() {},
  watch: {},
  methods: {
    ...mapMutations(["popBreadList", "PopIdList"]),
    gotoshouye() {
      // 推出前清除本地存储数据
      localStorage.clear();
      // document.write(JSON.stringify(this.$store.state))
      if (window.isTypePhone == "Android") {
        railsMobilePlatform.closepage();
      } else {
        window.webkit.messageHandlers.closepage.postMessage("");
      }
    },
    back() {
      if (!(this.$store.state.breadList.length) && this.$route.meta.other!= 'do') {
        //直接跳转首页
         this.$router.push({
          path: "/home",
        });
      }else{
         window.history.back()
      }
    },
    backPhone() {
     
       this.popBreadList();
      this.PopIdList();
      // if(!(this.$store.state.breadList.length) ){
      //   alert(1)
      //    this.$router.push({
      //     path: "/home",
      //   });
      // }else{
         //跳转至phone页面
     
      //跳转
      this.$router.push({
        path: "/Phone/phoneIndex.vue",
        query: {
          title: "search",
          data:new Date().getTime(),//加后缀区别路由 否则phone.index 的 mounted不会再执行
        },
      });
      // }
     
    },
    //跳转至历史记录
    goHistory() {
      this.$router.push({
        path: "/Editlogs/history.vue",
      });
    },
    removeIndex() {
      console.log(this.deletIdL);
      let params = {
        id: this.deletIdL.objectId,
      };
      remove({ params }).then((res) => {
        this.$Toast("删除成功");
        this.$router.go(-1);
      });
    },
    //跳转至综合查询
    goPhone() {
      this.$router.push({
        path: "/Phone/phoneIndex.vue",
      });
    },
  },
};
</script>

<style scoped>
.header {
  /* position: fixed;
  top: 0;
  left: 0; */
  width: 100%;
  height: 44px;
  text-align: center;
  line-height: 44px;
  color: #ffffff;
  background: rgb(35, 133, 255);
  z-index: 999;
  /* font-size: 18px; */
  font-weight: 700;
}
.chacha {
  position: absolute;
  left: 48px;
  top: 12px;
  font-size: 22px;
}
.tab {
  position: absolute;
}
.tab .text {
  width: 120px;
  position: relative;
  left: 95%;
  text-align: center;
}
.tab .back {
  width: 14px;
  height: 15px;
  float: left;
  margin-top: 12px;
  margin-left: 10px;
  font-size: 22px;
}
.home {
  font-size: 24px;
}
img,
.delet {
  width: 24px;
  height: 20px;
  position: fixed;
  right: 12px;
  top: 12px;
}
.delet {
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  width: 30px;
}
</style>
