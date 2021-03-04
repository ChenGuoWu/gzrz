
<template>
  <div class="all">
    <div class="all-content">
      <ul>
        <li>
          <div>季度</div>
          <div>
            <span>{{ nowData }}</span>
          </div>
          
        </li>
        
        <div class="all-seg"></div>
        <li>
          <div>姓名</div>
          <div>{{$store.state.userInfo.user.userName}}</div>
        </li>
        <div class="all-seg"></div>
        <li>
          <div>单位及职务</div>
          <div>{{$store.state.userInfo.user.dept.deptName}}</div>
        </li>
        <div class="all-seg"></div>
        
        <li>
          <div>从事及分管工作</div>
          <input
            type="text"
            name=""
            id="noneBorder"
            placeholder="请输入从事及分管工作"
            v-model="job"
          />
        </li>
        <div class="all-Bigseg"></div>
        <textarea
          class="textarea"
          placeholder="请输入"
          v-model="textareas"
        ></textarea>
      </ul>
    </div>
    <div class="all-submit">
      <van-button type="danger" size="large" @click="saveOpt">保存</van-button>
      <van-button type="info" size="large" @click="submit"
        >提交</van-button
      >
    </div>
    <van-dialog
      v-model="show"
      title="请选择领导"
      message='确定要提交吗'
      show-cancel-button
      @confirm="confirm"
      @cancel="cancel"
    >
      <van-radio-group
        v-model="radio"
        v-for="(item, index) in userList"
        :key="index"
        @change="change"
        class="radio"
      >
        <van-radio :name="item">{{ item.realName }}</van-radio>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
import { Button, DatetimePicker, Popup } from "vant";
import { choiceLeader, saveOrUpdate, draft } from "@/api/api";
export default {
  mounted() {},
  data() {
    return {
      radio: -1,
      textareas: "",
      job: "",
      show: false,
      nowData: "",
      userList: "",
      checkedPeople:{},
      quarterNumber:'',
      draftData:{},
      objectId:'',
      update: 1,
      add: 1
    };
  },
  components: {
    "van-button": Button,
    "van-datetime-picker": DatetimePicker,
    "van-popup": Popup
  },
  computed: {
    userInfos() {
      return this.$store.state.userInfo;
    }
  },
  mounted() {
    this.getQuarter();
    this.getchoiceLeaderApi();
    this.getdraftApi()
  },
  methods: {
    submit(){
        if (!this.textareas || !this.job) {
            this.$Toast("请输入从事或分管工作");
            return;
        }
        if(!this.userList.length){
          this.$Toast('未配置人员')
          return
        }
        if(this.update ==0 && this.add == 0){
          this.$Toast('当前时间不可提交')
        } else {
          this.show = true
        }
    },
    getdraftApi(){
      draft({
        params:{
          'createUserId':this.userInfos.userId,
          'creatUserId':this.userInfos.userId
        }
      }).then(res=>{
         this.draftData = res.data
         this.update = res.data.update
         this.add = res.data.add
         if(res.data.update ==0&&res.data.add == 0){
           this.$Toast('当前时间不可提交')
         }else{
           this.job = res.data.divisionWork
           this.textareas = res.data.logDayContentT
           this.objectId = res.data.objectId
         }
      })
    },
    change(e){
        console.log(e)
        this.checkedPeople =e
    },
    getQuarter() {
      let a = new Date().getMonth(),
        year = new Date().getFullYear(),
        i,j;
      if (a > 2 && a <= 5) {
        i = year + "第一季度";
        j = year+'_'+1
      } else if (a > 5 && a <= 8) {
        i = year + "第二季度";
        j = year+'_'+2
      } else if (a > 8 && a <= 11) {
        i = year + "第三季度";
        j = year+'_'+3
      } else {
        i = year-1 + "第四季度";
        j = year-1+'_'+4
      }
        this.quarterNumber = j
        this.nowData = i;
    },
    saveOpt() {
      if (!this.textareas || !this.job) {
          this.$Toast("请输入从事或分管工作");
          return
      }
      this.getsaveOrUpdateApi()
    },
    confirm() {
        this.getsaveOrUpdateApi()
    },
    cancel() {},
    getsaveOrUpdateApi() {
      
      saveOrUpdate({
        params: {
          divisionWork: this.job,
          logDayContent: this.textareas,
          logDayContentT: this.textareas,
          quarterNumber: this.quarterNumber,
          sysCreateUserId: this.userInfos.userId,
          mobileOrPc: 0,
          submitUserId: this.checkedPeople.userId || '',
          objectId: this.objectId,
          remark: "remark"
        }
      }).then(res => {
          if(res.msg == 'success'){
              this.$Toast('操作成功')
              this.$router.go(-1)
          }
      });
    },
    getchoiceLeaderApi() {
      choiceLeader({
        params: {
          'createUserId': this.userInfos.userId,
          'departId': this.userInfos.user.dept.objectId
        }
      }).then(res => {
        this.juzhang = res.data.haveDuty
        this.userList = res.data.userList;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#noneBorder {
  border: none;
  
}
input{
    text-align: right;
}
.radio{
    padding-left: 10px;
    margin-bottom: 6px;
}
@import "@/pages/Common/form.scss";
</style>
