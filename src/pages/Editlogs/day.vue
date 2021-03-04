<template>
  <div class="all">
    <div class="all-content">
      <div class="tip" v-if="repayTip">
        {{ this.repayTip }}
      </div>
      <ul>
        <li>
          <div>写实日期</div>
          <div>
            {{ dateWrite }} <img src="@/assets/document/expand.png" alt="" />
          </div>
        </li>
        <div class="all-seg"></div>
        <li>
          <div>开始时间</div>
          <div v-if="$route.query.isSearch == false">
            {{ startTime }} <img src="@/assets/document/expand.png" alt="" />
          </div>
          <div @click="startClick" v-else>
            {{ startTime }} <img src="@/assets/document/expand.png" alt="" />
          </div>

          <van-popup v-model="popupShows.startTime" position="bottom">
            <van-datetime-picker
              type="time"
              title="选择时间"
              :min-hour="0"
              :max-hour="24"
              @confirm="startTimeOnConfirm"
              @cancel="popupShows.startTime = false"
            />
          </van-popup>
        </li>
        <div class="all-seg"></div>
        <li>
          <div>结束时间</div>

          <div v-if="$route.query.isSearch == false">
            {{ endTime }} <img src="@/assets/document/expand.png" alt="" />
          </div>
          <div @click="endClick" v-else>
            {{ endTime }} <img src="@/assets/document/expand.png" alt="" />
          </div>
          <van-popup v-model="popupShows.endTime" position="bottom">
            <van-datetime-picker
              type="time"
              title="选择时间"
              :min-hour="0"
              :max-hour="24"
              @confirm="endTimeOnConfirm"
              @cancel="popupShows.endTime = false"
            />
          </van-popup>
        </li>
        <div class="all-Bigseg"></div>

        <textarea
          class="textarea"
          placeholder="请输入日写实描述"
          v-model="texts"
          disabled
          v-if="$route.query.isSearch == false"
        ></textarea>
        <textarea
          class="textarea"
          placeholder="请输入日写实描述"
          v-model="texts"
          v-else
        ></textarea>
      </ul>
      <div v-if="itemFileId" class="imgs">
        <img
          :src="`${picUrls}?objectId=${itemFileId}`"
          alt=""
          @click="showTrue"
        />
        <van-icon
          name="cross"
          class="delet"
          @click="deletpic"
          v-if="$route.query.isSearch !== false"
        />
      </div>

      <van-uploader
        v-model="fileList"
        :after-read="afterRead"
        :before-read="beforeRead"
        :max-count="1"
        @delete="deletes"
        v-else
        v-show="$route.query.isSearch !== false"
      />
    </div>

    <div class="all-submit">
      <van-button
        type="info"
        size="large"
        @click="submit"
        v-if="$route.query.isSearch != false"
        >提交</van-button
      >
    </div>
    <van-popup v-model="showPic" @click="showPicFalse"> 
      <img
          :src="`${picUrls}?objectId=${itemFileId}`"
          alt=""
          class="bigImg"
          
        />
    </van-popup>
  </div>
</template>

<script>
import { logDayState, saveOrUpdateRi, uploadFileDfs, picUrl } from "@/api/api";
import { mapMutations } from "vuex";
export default {
  mounted() {
    console.log(this.$route.query.detail);
    if (this.$route.query.detail) {
      let item = JSON.parse(this.$route.query.detail);
      if (item.fileId) {
        //说明有上传图片
        this.itemFileId = item.fileId;
        //  let obj={
        //  url:`${picUrl}+?objectId=${item.fileId}`,
        //  url:'https://img01.yzcdn.cn/vant/leaf.jpg',
        //  }
        // this.fileList.push(obj);
      }
    }

    if (this.$route.query.isSearch == false) {
      //必须是false   因为也有undefind的情况  说明是综合查询
    }

    //判断是否是我的日写实新建进入
    this.byMylogs();
    //查询是否补报
    this.logDayStateIndex();
  },
  data() {
    return {
      showPic:false,//大图img标签
      itemFileId: "", //详情是否传参图片
      repayTip: "", //是否有补报提示
      startTime: "08:00",
      endTime: "17:00",
      dateWrite: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`,
      popupShows: {
        startTime: false,
        endTime: false,
      },
      texts: "",
      param: "", //我的日写实传参
      dateTime: "", //新建时间时间戳
      fileList: [],
      fileId: "", //上传文件id
      fileBytes: "", //上传文件传参
      picUrls: picUrl,
    };
  },
  methods: {
    ...mapMutations(["hide_delet"]),
    //判断是否是我的日写实新建进入
    byMylogs() {
      if (this.$route.query.dataTimeY) {
        this.param = this.$route.query;
        this.dateWrite = `${this.param.dataTimeY}-${this.param.dataTimeM}-${this.param.dataTimeD}`;
        //判断是否由列表点击
        if (this.param.detail) {
          this.startTime = JSON.parse(this.param.detail).beginDate;
          this.endTime = JSON.parse(this.param.detail).endDate;
          this.texts = JSON.parse(this.param.detail).logDayContentT;
        }
      }
    },
    //新建返回及时还是补报状态
    logDayStateIndex() {
      //跳转进来才可能有提示
      if (this.param) {
        this.dateTime = new Date();
        this.dateTime.setDate(this.param.dataTimeD);
        this.dateTime.setFullYear(this.param.dataTimeY);
        this.dateTime.setMonth(this.param.dataTimeM - 1);
        let params = {
          logDate: this.dateTime.getTime(),
        };
        logDayState({ params }).then((res) => {
          this.repayTip = res.data;
        });
      }
    },
    startClick() {
      this.popupShows.startTime = true;
    },
    endClick() {
      this.popupShows.endTime = true;
    },
    startTimeOnConfirm(date) {
      this.startTime = date;
      this.popupShows.startTime = false;
    },
    endTimeOnConfirm(date) {
      this.endTime = date;
      this.popupShows.endTime = false;
    },
    //保存更新接口
    saveOrUpdateIndex() {
      return new Promise((resolve) => {
        let objectId = "";
        if (this.param) {
          if (this.param.detail) {
            objectId = JSON.parse(this.param.detail).objectId;
          }
        }
        let params = {
          logdayBeginDate: this.startTime,
          logdayEndDate: this.endTime,
          mobileOrPc: "0",
          remark: "",
          logDayContentT: this.texts,
          logDayContent: this.texts,
          sysCreateUserId: this.$store.state.userInfo.user.objectId,
          logDate: this.param ? this.dateTime.getTime() : new Date().getTime(), //选择日期时间戳
          objectId: objectId, //修改时加参数objectid
          fileId: this.fileId ? this.fileId : "", //上传文件id
        };
        saveOrUpdateRi({ params }).then((res) => {
          resolve();
          this.$Toast("保存成功");
          this.$router.go(-1);
        });
      });
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        let fileResult = "";
        reader.readAsDataURL(file); //开始转
        reader.onload = function () {
          fileResult = reader.result;
        }; //转 失败
        reader.onerror = function (error) {
          reject(error);
        }; //转 结束  咱就 resolve 出去
        reader.onloadend = function () {
          resolve(fileResult);
        };
      });
    },
    afterRead(file) {
      //上传文件
      this.getBase64(this.fileList[0].file).then((res) => {
        this.fileBytes = res;
      });
    },
    deletes() {
      this.fileBytes = "";
    },
    beforeRead(file) {
      return true;
    },
    submit() {
      if (!this.texts) {
        this.$Toast("请输入日写实");
        return;
      }
      this.$Dialog
        .confirm({
          title: "提示",
          message: "您确定提交吗",
        })
        .then(() => {
          //发请求
          if (this.fileBytes) {
            //说明有上传文件
            uploadFileDfs({ fileBytes: this.fileBytes }).then((res) => {
              this.fileId = res.data.fileId;
              this.saveOrUpdateIndex();
            });
          } else {
            this.saveOrUpdateIndex();
          }
        })
        .catch(() => {
          // on cancel
        });
    },
    deletpic() {
      this.itemFileId = "";
    },
    showTrue(){
      this.showPic=true;
    },
     showPicFalse(){
    this.showPic=false;
  },
  },
 
  //离开页面之前
  destroyed() {
    this.hide_delet();
  },
};
</script>
<style lang="scss" scoped>
@import "@/pages/Common/form.scss";
/deep/ .van-uploader {
  margin-left: 15px;
}

.imgs {
  width: 80px;
  height: 80px;
  margin-left: 10px;
  position: relative;
  > img {
    width: 100%;
    height: 100%;
  }
  .delet {
    position: absolute;
    right: 0;
    top: 0;
    background: black;
  }
}
.bigImg{
  display: block;
  width: 280px;
  height: 100vh;
  margin: 0 auto;
}

</style>
