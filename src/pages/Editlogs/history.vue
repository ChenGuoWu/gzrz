
<template>
  <div class="all">
    <div class="search" @click="search">
      
      <img src="@/assets/document/calendar.png" alt="" class="imgleft"/>
      <div v-if="years"  class="years">{{years}}年</div>
      <img src="@/assets/document/expand.png" alt="" class="imgright"/>
    </div>
    <van-popup v-model="popupShows.search" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="searchOnConfirm"
        @cancel="popupShows.search = false"
      />
    </van-popup>
    <ul>
      <li v-for="(item,index) in historyList" :key='index'>
        <div class="all-content">
          <div>时间范围 :</div>
          <div>{{item.beginDate}} {{item.endDate}}</div>
        </div>
        <div class="all-content">
          <div>事由 :</div>
          <div>{{item.newreason}}</div>
        </div>
        <div class="all-content">
          <div>说明 :</div>
          <div>{{item.explaination}}</div>
        </div>
        <div class="all-seg"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { specialFind} from "@/api/api";
export default {
  mounted() {
    //当前时间年调用
    this.specialFindIndex();
  },
  data() {
    return {
      popupShows: {
        search: false,
      },
      years:new Date().getFullYear(),//查询年
      columns: [2018,2019,2020,2021, 2022, 2023,2024,2025,2026,2027,2028,2029,2030,2031],
      historyList:[],
   
    };
  },

  methods: {
    search() {
      this.popupShows.search = true;
    },
    searchOnConfirm(data) {
      //发请求
      this.popupShows.search = false;
      this.years=data;
      this.specialFindIndex();

    },
    //查询历史列表
    specialFindIndex(){
      
         let params={
        userId:this.$store.state.userInfo.user.objectId,
        year:this.years,
        
      }
      specialFind({ params }).then((res) => {
        this.historyList=res.data;
        this.historyList.map(item=>{
          if (item.reason==1) {
            item.newreason='出差'
          }
          if (item.reason==2) {
            item.newreason='休假'
          }
          if (item.reason==3) {
            item.newreason='出国'
          }
          if (item.reason==4) {
            item.newreason='其他'
          }
        })
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.all {
  height: 100%;
  display: flex;
  
  .search {
    height: 30px;
    margin: 8px 14px;
    border: 2px solid #cccccc;
    position: relative;
    .years{
       position: absolute;
      left: 40px;
      top: 2px;
      color: grey;
      font-size: 14px;
    }
    .imgleft {
      width: 14px;
      position: absolute;
      left: 10px;
      top: 6px;
    }
    .imgright {
      width: 12px;
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
  ul {
    text-align: left;
    flex: 1;
    overflow: auto;
    color: grey;
    font-size: 15px;
    margin-top: 10px;
    .all-content {
      display: flex;
      justify-content: space-between;
      margin: 6px 16px;

      :first-child {
        width: 30%;
      }
      :last-child {
        width: 68%;
      }
    }
    .all-seg {
      margin-top: 4px;
      height: 6px;
      background: #f2f2f2;
    }
  }
}
</style>


