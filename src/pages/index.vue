<template>

  
  <div class="cont">
    <div class="edit">
      <span class="blod">新建/编辑</span>
      <div class="main">
        <div v-for="(item,index) in newiconData" :key="index">
          <img :src="imgsrc(item.path)" @click="toList(item)" />
          <p>{{item.title}}</p>
        </div>
      </div>
      <p class="lineBase"></p>
      <template v-if="quarterCode!=0 || year!=0">
        <span class="blod">待办</span>
        <div class="main">
          <div v-for="(item, index) in todoList" :key="index" >
            <p class="todo" v-if="!index && quarterCode>0">{{ quarterCode }}</p>
            <p class="todo" v-if="index && year>0">{{ year }}</p>
            <img :src="imgsrc(item.path)" @click="toList(item)" />
            <p>{{item.title}}</p>
          </div>
        </div>
        <p class="lineBase"></p>
      </template>
      <span class="blod">我的</span>
      <div class="main">
        <div v-for="(item,index) in showData" :key="index">
          <img :src="imgsrc(item.path)" @click="toList(item)" />
          <p>{{item.title}}</p>
        </div>
      </div>
    </div>
    
  </div>

</template>
<script>
import { findByUsername, toDoNumberComment, detailsToBeDoneYear } from "@/api/api";
// alert('oi')
export default {
  data() {
    return {
      num:1,
      todoList:[{
        title:'季点评',
        path:'quarter.png',
        url:'/Todolist/quarter.vue'
      },{
        title:'年点评',
        path:'year.png',
        url:'/Todolist/year.vue'
      }],
      newiconData:[{
        title:'日写实',
        path:'day.png',
        url:'/Editlogs/day.vue'
      },{
        title:'季小结',
        path:'quarter.png',
        url:'/Editlogs/quarter.vue'
      },{
        title:'年总结',
        path:'year.png',
        url:'/Editlogs/year.vue'
      },{
        title:'特殊情况',
        path:'tsqk.png',
        url:'/Editlogs/special.vue'
      }],
      showData:[{
        title:'日写实',
        path:'day.png',
        url:'/Mylogs/day.vue'
      },{
        title:'季小结',
        path:'quarter.png',
        url:'/Mylogs/quarter.vue'
      },{
        title:'年总结',
        path:'year.png',
        url:'/Mylogs/year.vue'
      },{
        title:'评价',
        path:'wdpj.png',
        url:'/Mylogs/evaluate.vue'
      }],
      quarterCode:0,
      year:0
    };
  },
  activated() {
    // let that = this
    // window.getUserInfo = function(p) {
    //   // 2020年11月17日08:49:05
    //   // p = JSON.parse(p)
    //   that.$store.commit('set_token', p.token)
    //   window.isTypePhone = p.mobileType
 
    //   // 每次进去执行性一次，多次影响性能与使用。
    //     that.getUserapi(p)
    //   if(window.once){
    //     window.once = false
    //   }else{
    //     // that.getnum();
    //   }

    // }
    // window.getUserInfo(p)
    this.gettoDoNumberCommentApi()
  },
  computed: {
    userInfos() {
      return this.$store.state.userInfo;
    },
  },
  methods: {
    toList(p){
      this.$router.push({
        path: p.url,
        query: p,
      });
    },
    imgsrc(item, a) {
      return require("@/assets/document/" + item);
    },
    // getUserapi(p){
    //   let that = this
    //   findByUsername({
    //     params:{
    //       username: p.userName,
    //       sign:'2',
    //     }
    //   }).then((msg) => {
    //     const userInfo = {}
    //     userInfo.userId = p.userId
    //     userInfo.mobileType = p.mobileType
    //     userInfo.user = msg
    //     that.$store.commit('Login_in', userInfo)
    //     this.gettoDoNumberCommentApi()
    //   })
    
    // },
    gettoDoNumberCommentApi(){
      toDoNumberComment({params:{
        'creatUserId':this.userInfos.userId
      }}).then(res=>{
        this.quarterCode = res.data.quarter
        this.year = res.data.year
      })
    }
  }
};
</script>
<style scoped lang="scss">
.blod{
  font-weight: bold;
}

.todo{
  padding: 5px;
  width: 24px !important;
  line-height: 14px;
  font-size: 14px;
  color: white;
  background-color: red;
  text-align: center;
  border-radius: 50%;
  position: absolute;
  left: 40px;
  top: -6px;
  z-index: 333;
}
.cont{
  padding: 5px 15px;
  span {
    font-size: 20px;
}
}
.lineBase{
  margin: 10px 0px;
  border-bottom: 1px solid rgb(216, 203, 203);;
}
.edit{
  text-align: left;
}
.main{
  display: flex;
  position: relative;
  // justify-content: space-between;
  margin-top: 14px;
  div{
    margin-right: 40px;
    position: relative;
  }
  // flex-wrap:wrap;
  img {
    width: 55px;
    margin-bottom: 5px;
    
  }
  p {
    text-align: center;
     
  }
}
</style>
