
<template>
  <div class="all_body">
    <div class="datePicker">
      <Calendar lunar :value="valueTime" @select="select" ref="calendar" />
    </div>
    <div class="showcontent">
      <div class="showcontent-title">
        {{ dataTimeY }}年{{ dataTimeM }}月{{ dataTimeD }}日
      </div>
      <ul class="showcontent-body">
        <li
          v-for="(item, index) in listRi"
          :key="index"
          @click="goDetail(item)"
        >
          <div class="li">
            <div class="showcontent-body-icon">
              <div>
                <div v-if="!item.fileId"></div>
                <img
                  :src="picUrls + `?objectId=${item.fileId}`"
                  alt="无"
                  v-else
                />
              </div>
              {{ item.logDayContentT }}
            </div>
            <div>
              <div>{{ item.beginDate }}</div>
              <div>{{ item.endDate }}</div>
            </div>
          </div>
          <div class="showcontent-seg"></div>
        </li>
      </ul>

      <div class="btn" @click="goEdit" v-if="creatBtn == true && isAdd == true">
        <div>+</div>
        <div>新建</div>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from "mpvue-calendar";
import "mpvue-calendar/src/browser-style.css";
import { findAllDay, getList, picUrl } from "@/api/api";
import { mapMutations } from "vuex";
// import axios from "axios";
export default {
  mounted() {
    this.$set(this.valueTime, 0, this.dataTimeY);
    this.$set(this.valueTime, 1, this.dataTimeM);
    this.$set(this.valueTime, 2, this.dataTimeD);
    if (this.isAdd) {
      this.getListIndex();
    }
    this.findAllDayIndex().then((res) => {
      // console.log(res)
      // res.forEach((item) => {
      //   axios({
      //     method: "get",
      //     url: picUrl + `?objectId=${item.fileId}`,
      //     headers: { token: this.$store.state.userToken },
      //     // responseType: "blob",
      //   }).then((res) => {
      //     // item.pic=res;
      //     // window.open('http://192.168.65.94:8078/carsoa-base-dmz/application/getPicture?objectId=52114289e0fd42d3af2a2c5ff86078ee')
      //     // console.log(window.URL.createObjectURL(res.data))
      //     // item.pic=window.URL.createObjectURL(res.data)
      //   });
      // });
    });
  },
  data() {
    return {
      valueTime: [],
      dataTimeY: new Date().getFullYear(),
      dataTimeM: new Date().getMonth() + 1,
      dataTimeD: new Date().getDate(),
      listRi: [],
      creatDay: "", //判断新建按钮是否存在提前几天
      creatBtn: true, //判断新建是否存在
      times: "", //选中时间的时间戳
      picUrls: picUrl,
    };
  },
  props: {
    //判断是否由综合查询进入
    isAdd: {
      type: Boolean,
      default: true,
    },
    id: {
      type: String,
      default: "",
    },
  },
  components: {
    Calendar,
  },
  methods: {
    ...mapMutations(["show_delet", "id_delet"]),

    //查找日报列表
    findAllDayIndex() {
      return new Promise((resolve) => {
        let dataTimeM =
          this.dataTimeM < 10 ? `0${this.dataTimeM}` : this.dataTimeM;
        let dataTimeD =
          this.dataTimeD < 10 ? `0${this.dataTimeD}` : this.dataTimeD;
        let params = {
          userId: this.id ? this.id : this.$store.state.userInfo.user.objectId,
          beginDate: `${this.dataTimeY}-${dataTimeM}-${dataTimeD}`,
          endDate: `${this.dataTimeY}-${dataTimeM}-${dataTimeD}`,
          weekOrMonth: "3", //固定参数
        };
        findAllDay({ params }).then((res) => {
          this.listRi = res.data[0].dayList;
          resolve(this.listRi);
        });
      });
    },

    //判断新建按钮是否存在提前几天
    getListIndex() {
      getList().then((res) => {
        this.creatDay =
          Number(res.data.timelyDay) + Number(res.data.unseasonalDay);
      });
    },
    //判断新建按钮是否存在的方法
    craetBtnMetn() {
      //超过今天的日期不能新建
      let timeNow = new Date().getTime();
      let timeMin = timeNow - this.creatDay * 86400000; //最小的毫秒数
      if (this.times - timeNow > 0 || this.times - timeMin < 0) {
        //新建按钮隐藏
        this.creatBtn = false;
      }
      //当前日期减creatDay 的日期不能存在
    },

    select(val) {
      //点击时显示按钮
      this.creatBtn = true;
      this.dataTimeY = val[0];
      this.dataTimeM = val[1];
      this.dataTimeD = val[2];
      this.findAllDayIndex();
      //设置当前日期为时间格式
      let date = new Date();
      date.setDate(this.dataTimeD);
      date.setFullYear(this.dataTimeY);
      date.setMonth(this.dataTimeM - 1);
      this.times = date.getTime(); //转化为时间戳 方便对比
      this.craetBtnMetn();
    },
    //点新建
    goEdit() {
      this.$router.push({
        path: "/Editlogs/day.vue",
        query: {
          dataTimeY: this.dataTimeY,
          dataTimeM: this.dataTimeM,
          dataTimeD: this.dataTimeD,
          detail: "",
        },
      });
    },
    //点对应的列表
    goDetail(item) {
      console.log(item);
      //打开显示删除按钮
      this.show_delet();
      //item信息存入vuex
      this.id_delet(item);
      this.$router.push({
        path: "/Editlogs/day.vue",
        query: {
          dataTimeY: this.dataTimeY,
          dataTimeM: this.dataTimeM,
          dataTimeD: this.dataTimeD,
          detail: JSON.stringify(item),
          isSearch: this.isAdd, //false说明综合查询进入
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ .mc-head-box div {
  font-size: 12px !important;
  font-weight: bolder;
}
/deep/ .mpvue-calendar td span {
  font-size: 14px !important;
  font-weight: bolder;
}
.all_body {
  background: #f2f2f2;
  height: 100%;
  .showcontent {
    text-align: left;
    padding-top: 10px;
    .showcontent-title {
      padding: 0 10px 10px 10px;
    }
    .showcontent-body {
      background: white;
      overflow: hidden;
      .li {
        display: flex;
        justify-content: space-between;
        margin: 4px 10px;
        font-size: 14px;
        > .showcontent-body-icon {
          line-height: 48px;
          display: flex;
          font-size: 16px;
          div {
            height: 20px;
            width: 20px;
            margin: 16px 15px 0 0;
            > img {
              width: 100%;
              height: 100%;
              display: block;
            }
          }
        }
      }
      .showcontent-seg {
        height: 1px;
        background: #f2f2f2;
      }
    }
    .btn {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 38px;
      border-radius: 15px;
      background: rgb(35, 133, 255);
      color: white;
      font-size: 14px;
      line-height: 14px;
      text-align: center;
      overflow: hidden;
      > :first-child {
        font-size: 26px;
        margin-top: 3px;
      }
      > :last-child {
        font-size: 14px;
        margin-top: 5px;
      }
    }
  }
}
</style>


