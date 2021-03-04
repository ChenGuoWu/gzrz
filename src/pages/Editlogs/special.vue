
<template>
  <div class="all">
    <div class="all-content">
      <div class="tip" v-if="tip">
        温馨提示:自{{
          selectTime
        }}起，若当日未填写日写实.则在每天的23:00时日写实内容自动填写为“{{
          selectReason
        }}”。
      </div>
      <ul>
        <li>
          <div>开始时间</div>
          <div v-if="tip" class="all-disable">
            {{ selectTime }} <img src="@/assets/document/expand.png" alt="" />
          </div>
          <div @click="timeClick" v-else>
            {{ selectTime }} <img src="@/assets/document/expand.png" alt="" />
          </div>
          <van-popup v-model="popupShows.selectTime" position="bottom">
            <van-datetime-picker
             type="date"
              title="选择年月日"
      
              @confirm="selectTimeOnConfirm"
              @cancel="popupShows.selectTime = false"
              v-model="ceshi"
            />
          </van-popup>
        </li>
        <div class="all-seg"></div>
        <li>
          <div>事由</div>
          <div v-if="tip" class="all-disable">
            {{ selectReason }} <img src="@/assets/document/expand.png" alt="" />
          </div>
          <div @click="reasonClick" v-else>
            {{ selectReason }} <img src="@/assets/document/expand.png" alt="" />
          </div>
          <van-popup v-model="popupShows.selectReason" position="bottom">
            <van-picker
              show-toolbar
              :columns="columns"
              @confirm="selectReasonOnConfirm"
              @cancel="popupShows.selectReason = false"
            />
          </van-popup>
        </li>
        <div class="all-seg"></div>
        <textarea
          class="textarea"
          placeholder="请输入说明"
          v-model="texts"
          :disabled="tip"
        ></textarea>
      </ul>
    </div>
    <div class="all-submit">
      <van-button type="danger" size="large" @click="revoke" v-if="tip"
        >撤销</van-button
      >
      <van-button type="info" size="large" @click="submit" v-else
        >提交</van-button
      >
    </div>
  </div>
</template>

<script>
import { Button, DatetimePicker, Popup, Picker } from "vant";
import { specialSaveOrUpdate, specialFindOne } from "@/api/api";
export default {
  mounted() {
    //进入时判断是否显示撤销
    this.specialFindOneIndex();
  },
  data() {
    return {
      selectTime: "请选择开始时间",
      selectReason: "请选择事由",
      selectTimeTip: "", //开始时间提示
      selectReasonTip: "", //事由提示
      columns: ["出国出差(境)", "外出学习", "长病长休", "其他"],
      tip: false, //区分提交和撤销界面
      texts: "",
      popupShows: {
        selectTime: false,
        selectReason: false,
      },
      objectId: "", //撤销的objectid
      ceshi:'',
    };
  },
  computed: {
    resons: () => {
      if (this.selectReason == "出国出差(境)") {
        return 1;
      }
      if (this.selectReason == "长病长休") {
        return 2;
      }
      if (this.selectReason == "外出学习") {
        return 3;
      }
      if (this.selectReason == "其他") {
        return 4;
      }
    },
  },
  components: {
    "van-button": Button,
    "van-datetime-picker": DatetimePicker,
    "van-popup": Popup,
    "van-picker": Picker,
  },
  methods: {
    
    //查询是否显示撤销
    specialFindOneIndex() {
      return new Promise((resolve) => {
        let params = {
          userId: this.$store.state.userInfo.user.objectId,
        };
        specialFindOne({ params }).then((res) => {
          console.log(res);
          if (res.data) {
            this.selectTime = res.data.beginDate;
            if (res.data.reason == 1) {
              this.selectReason = "出国出差(境)";
            }
            if (res.data.reason == 2) {
              this.selectReason = "长病长休";
            }
            if (res.data.reason == 3) {
              this.selectReason = "外出学习";
            }
            if (res.data.reason == 4) {
              this.selectReason = "其他";
            }
            this.texts = res.data.explaination;
            this.objectId = res.data.objectId;
            this.tip = true;
          }
          return resolve();
        });
      });
    },
    timeClick() {
      this.popupShows.selectTime = true;
    },
    reasonClick() {
      this.popupShows.selectReason = true;
    },
    selectTimeOnConfirm(date) {
      let str=date.dateFormat('yyyy-mm-dd')
      this.selectTime = str;   
      this.selectTimeTip = str;
      this.popupShows.selectTime = false;
    },
    selectReasonOnConfirm(value) {
      this.selectReason = value;
      this.selectReasonTip = value;
      this.popupShows.selectReason = false;
    },
    submit() {
      if (!this.selectTimeTip) {
        this.$Toast("请选择开始时间");
        return;
      }
      if (!this.selectReasonTip) {
        this.$Toast("请选择事由");
        return;
      }
      if (!this.texts) {
        this.$Toast("请输入说明");
        return;
      }
      this.$Dialog
        .confirm({
          title: "提示",
          message: "您确定提交吗",
        })
        .then(() => {
          //发请求
          this.specialSaveOrUpdateIndex().then(() => {
            this.specialFindOneIndex();
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    //提交
    specialSaveOrUpdateIndex() {
      return new Promise((resolve) => {
        let params;
        if (this.tip) {
          params = {
            objectId: this.objectId,
          };
        } else {
          params = {
            objectId: "",
            reason: this.resons,
            other: "",
            explaination: this.texts,
            beginDate: this.selectTime,
            userId: this.$store.state.userInfo.user.objectId,
          };
        }

        specialSaveOrUpdate({ params }).then((res) => {
          console.log(res);
          this.$Toast("提交成功");
          this.tip = true;
          return resolve();
        });
      });
    },
    revoke() {
      this.$Dialog
        .confirm({
          title: "提示",
          message: "您确定撤销吗",
        })
        .then(() => {
          //发请求
          this.specialSaveOrUpdateIndex().then(()=>{
            this.reset();
          })
          
        })
        .catch(() => {
          // on cancel
        });
    },
    //重置变量
    reset() {
      this.tip = false;
      this.selectTime = "请选择开始时间";
      this.selectReason = "请选择事由";
      this.selectTimeTip = ""; //开始时间提示
      this.selectReasonTip = ""; //事由提示
      this.texts = ""; //事由提示
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/pages/Common/form.scss";
</style>