<template>
  <div class="login" :style="{ height: scrollHeight }">
    <div class="login_title">欢迎登录太原局工作日志</div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <!-- <van-field name="checkbox">
        <template #input>
          <van-checkbox v-model="checkboxPassword" shape="square" />
          <div class="checkPassword">记住密码</div>
        </template>
      </van-field> -->

      <div style="margin-top: 36px ;">
        <van-button block type="info" native-type="submit" class="login_btn"
          >登录</van-button
        >
      </div>
    </van-form>
    <!-- <img src="@/assets/login/bg_login.png" alt="" class="bj"> -->
    <div class="name">
      <!-- <img src="@/assets/login/name_sel.png" alt="" srcset="" >
            <input type="text">
            <p style="margin-top:8px">
                <img src="@/assets/login/password_sel.png" alt="" srcset="" >
                <input type="text">
            </p>
            <footer>
                <button>登录</button>
            </footer> -->
    </div>
  </div>
</template>
<script>
import { getoatoken1 } from "@/api/api";
export default {
  data() {
    return {
      username: "",
      password: "",
      scrollHeight: "100%",
      scrollTop: "0%",
      checkboxPassword: false
    };
  },
  created() {
    this.fixedLayout();
  },
  watch:{
      username(newName,oldName){
         console.log(newName)  
          if (localStorage.getItem("namePassword")) {
             let arrList = JSON.parse(localStorage.getItem("namePassword"));
             arrList.some(item => {
                if(item.name==newName){
                    this.password=item.password;
                    return true;
                }else{
                    this.password='';
                }
             });
            }
      }
  },
  methods: {
    fixedLayout() {
      let viewHeight = window.innerHeight;
      console.log(viewHeight);
      this.scrollHeight =
        (Number(viewHeight) * Number(100)) / Number(100) + "px";
      this.scrollTop = (Number(viewHeight) * Number(0)) / Number(100) + "px";
    },
    onSubmit() {
      this.login();
    },
    login() {
      getoatoken1({
        username: this.username,
        password: this.password,
        sign: 2
      }).then(res => {
        if (res.code == 50000) {
          this.$Toast(res.data.msg);
        } else {
          //记住密码
          if (this.checkboxPassword) {
            let obj = {
              name: this.username,
              password: this.password
            };
            let arrList = [];
            if (localStorage.getItem("namePassword")) {
              arrList = JSON.parse(localStorage.getItem("namePassword"));
            }
            arrList.some(item=>{
                if(item.name=obj.name){
                    return true;
                }else{
                    arrList.push(obj)
                }
            })
            
            localStorage.setItem("namePassword", JSON.stringify(arrList));
          }
          const userInfo = {},
            p = res.data;
          userInfo.userId = p.userId;
          userInfo.mobileType = p.mobileType;
          userInfo.user = res.data.user;
          this.$store.commit("Login_in", userInfo);
          this.$store.commit("set_token", p.token);
          this.$router.push({
            path: "/home"
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  // height: 650px;
  overflow: hidden;
  overflow-y: hidden;
  // position: absolute;
  // over-flow:hidden;
  background: url("~@/assets/login/newbg_login.png") no-repeat no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_title {
    color: white;
    font-size: 20px;
    position: absolute;
    top: 100px;
    left: 65px;
  }
}
.bj {
  width: 100%;
  height: 99%;
}
.name {
  position: relative;
  top: -383px;
  left: -10px;
  z-index: 34333;
  img {
    width: 6%;
    position: relative;
    top: 7px;
  }
}
footer {
  margin-top: 25px;
  button {
    padding: 9px 100px;
    background: #2385ff;
    border: none;
    color: white;
    margin-left: 10px;
    border-radius: 7px;
  }
}
.login_btn {
  border-radius: 10px;
}

/deep/ .van-checkbox,
.checkPassword {
  position: relative;
  left: 100px;
}
/deep/ .van-icon,.van-checkbox__icon
 {
    width: 14px;
    height: 14px;
    position: relative;
    top:3px ;
}
/deep/ .van-field__control--custom
 {
   
    position: relative;
    left: -25px;
}
/deep/ .van-icon-success::before
 {
    width: 14px;
    height: 14px;
    position: relative;
    top:-4px ;
    left: -1px;
}
/deep/ .van-field__label 
 {
    width: 60px;
}
/deep/ .van-form
 {
    margin-top: -100px  !important;
}
.van-cell{
  padding-left:  0;
  padding-right:  0;
}
.checkPassword {
  color: #1989fa;
  left: 105px;
}
</style>