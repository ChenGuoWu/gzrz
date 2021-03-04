<template>
    <div>
        <div class='fix'>
            <van-tabs v-model="active" @click="getHistoryCommentApi">
                <van-tab title="季点评"></van-tab>
                <van-tab title="年点评"></van-tab>
            </van-tabs>
            <div class="search" @click="popup">
                <img src="@/assets/document/calendar.png" alt="">
                <img src="@/assets/document/expand.png" alt="">
                {{showData}}
            </div>
            <van-popup v-model="show" position="bottom" :style="{ height: '50%' }" >
                <van-datetime-picker
                v-model="currentDate"
                type="year-month"
                title="选择年月"
                @confirm='confirm'
                @cancel='cancel'
                :min-date="minDate"
                :max-date="maxDate"
                :formatter="formatter"
                />
            </van-popup>
        </div>
        <List v-if="!active" :listData = 'listData' class='ab'></List>
        <Listyear v-else :listData = 'listData' class='ab'></Listyear>
    </div>
</template>
<script>
import List from "@/pages/Common/List.vue";
import Listyear from "@/pages/Common/Listyear.vue";
import { getHistoryComment, getHistoryCommentYear } from "@/api/api";
export default {
    data() {
        return {
            active:1,
            showData:`${new Date().getFullYear()}_${new Date().getMonth()}`,
            test:'',
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2025, 10, 1),
            currentDate: new Date(),
            show:false,
            listData:[]
        }
    },
    components:{ List, Listyear },
    computed:{
        userInfos() {
            return this.$store.state.userInfo;
        },
    },
    mounted() {
        this.showData = new Date().getFullYear()+'-'+this.addZeroPrefixForMonth(new Date().getMonth())
        this.getHistoryCommentApi()
    },
    methods: {
        getHistoryCommentApi(){
            if(this.active) {
                getHistoryCommentYear({
                    params:{
                        'creatUserId':this.userInfos.userId,
                        'pageNumber':1,
                        'pageSize':10,
                        'year':this.showData
                    }
                }).then(res=>{
                    this.listData = res.data
                })
            } else {
                getHistoryComment({
                    params:{
                        'creatUserId':this.userInfos.userId,
                        'pageNumber':1,
                        'pageSize':10,
                        'year':this.showData
                    }
                }).then(res=>{
                    this.listData = res.data
                })
            }
        },
        popup(){
            this.show = true
        },
        confirm(e){
            console.log()
            let mon = this.addZeroPrefixForMonth(new Date(e).getMonth()+1)
            this.showData = new Date(e).getFullYear()+'-'+mon
            console.log(this.showData)
            this.show = false
            this.getHistoryCommentApi()
        },
        addZeroPrefixForMonth: function (month){
            return month < 10 ? '0' + month : month
        },
        cancel(){
            this.show = false
        },
        formatter(type, val) {
            if (type === 'year') {
                return `${val}年`;
            } else if (type === 'month') {
                return `${val}月`;
            }
            return val;
        }
    },
}
</script>
<style lang="scss" scoped>
    .ab{
        // position: absolute;
        height: 530px;
        overflow: auto;
    }
    .search{
      height: 30px;
      margin: 8px 14px;
      border: 2px solid #CCCCCC;
      position: relative;
      :first-child{
          width: 14px;
            position: absolute;
            left: 10px;
            top: 6px;
      }
      :last-child{
          width: 12px;
          position: absolute;
            right: 10px;
            top: 10px;
      }
  }
  /deep/ .van-tabs__line{
      background-color:rgb(35, 133, 255)
  }
</style>