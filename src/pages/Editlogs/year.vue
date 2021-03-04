<template>

  <div class="all">
    <div class="all-content">
      <ul>
        <li>
          <div>年度</div>
          <div>
            <span>{{ yearDate }}年</span>
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
        style="margin-bottom:20px"
      >
        <van-radio :name="item">{{ item.realName }}</van-radio>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
import { Button, DatetimePicker, Popup } from "vant";
import { choiceLeader, yearsaveOrUpdate, yeardraft, selectLogYearById } from "@/api/api";
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
      objectId: '',
      yearDate: '',
      update: '',
      add: ''
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
    if(this.$store.state.objectId) {
      selectLogYearById({
          params:{
              objectId: this.$store.state.objectId
          }
      }).then(res=>{
          this.job = res.data.yearDivisionWork
          this.textareas = res.data.yearContentT
      })
    }
    this.getchoiceLeaderApi();
    this.getyeardraftApi()
  },
  methods: {
    submit(){
        if (!this.textareas || !this.job) {
            this.$Toast("请输入从事或分管工作");
            return;
        }
        if(this.update ==0 && this.add == 0){
          this.$Toast('当前时间不可提交')
          return
        }
        if(this.juzhang) {
          this.getyearsaveOrUpdateApi()
        } else {
          if(!this.userList.length) {
            this.$Toast("未配置人员");
          } else {
            this.show = true
          }
        }
    },
    getyeardraftApi(){
      yeardraft({
        params:{
          'createUserId':this.userInfos.userId,
          'yearDate':new Date().getFullYear()
        }
      }).then(res=>{
         this.draftData = res.data
         console.log(res.data.yearDate)
         this.yearDate = res.data.yearDate
         this.objectId = res.data.objectId
         this.update = res.data.update
         this.add = res.data.add
         if(res.data.update ==0&&res.data.add == 0){
           this.$Toast('当前时间不可提交')
         }else{
           this.job = res.data.yearDivisionWork
           this.textareas = res.data.yearContentT
           this.objectId = res.data.objectId
         }
      })
    },
    change(e){
        this.checkedPeople =e
    },
    saveOpt() {
      if (!this.textareas || !this.job) {
          this.$Toast("请输入从事或分管工作");
          return
      }
      this.getyearsaveOrUpdateApi()
    },
    confirm() {
      if(this.radio === -1) {
        this.$Toast("未配置人员");
      } else {
        this.getyearsaveOrUpdateApi()
      }
    },
    cancel() {},
    getyearsaveOrUpdateApi() {
      yearsaveOrUpdate({
        params: {
          yearDivisionWork: this.job,
          yearContent: '<p>' + this.textareas +'</p>',
          yearContentT: this.textareas,
          yearDate: this.yearDate,
          sysCreateUserId: this.juzhang?0:this.userInfos.userId || '',
          mobileOrPc: 1,
          submitUserId: this.checkedPeople.userId || '',
          objectId: this.objectId,
          remark: 'remark'
        }
      }).then(res => {
          if(res.msg == 'success'){
              this.$store.commit('setobjectId', res.data.objectId)
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
}
@import "@/pages/Common/form.scss";
</style>