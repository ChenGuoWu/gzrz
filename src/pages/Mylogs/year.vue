<template>

    <div class="main">
        <div class="cont" v-for="(item,index) in listData" :key="index">
            <div class="space" @click="toDetails(item)">
                <div style="display:flex;">
                    <div class="bluespot"></div>
                    <span style="text-align:left">{{delStr(item.yearDate)}}</span>
                </div>
                <van-icon name="arrow" size="20px"/>
            </div>
            <p class="baseline"></p>
        </div>
         <div class="nodata" v-if="!listData.length">暂无数据</div>
        <footer class="footer" v-if="newlybuild">
           
            <!-- <div class="btn" @click="toNew">
                <div>+</div>
                <div>新建</div>
            </div> -->
        </footer>
    </div>
</template>
<script>
import {
  choiceLeader,
  findYearListSubmit,
  yeardraft
} from "@/api/api";
export default {
    props: {
        newlybuild: {
            type: Boolean,
            default: true,
        }
    },
    data() {
        return {
            showData: '',
            showALL:false,
            listData:[]
        }
    },
    computed:{
        userInfos() {
            return this.$store.state.userInfo;
        },
        columnsAll(){
            const year = new Date().getFullYear();
            return [year-1,year,year+1,year+2,year+3,year+4,year+5]
        }
    },
    async mounted() {
        let ary = this.$store.state.idList
        await yeardraft({
            params:{
                'createUserId':this.userInfos.userId,
                'yearDate':new Date().getFullYear()
            }
        }).then(res=>{
            this.showData = res.data.yearDate
        })
        if(this.newlybuild) {
            await this.getfindYearListSubmitApi()
        } else {
            await this.getfindYearListSubmitApi(ary[ary.length-1])
        }
        
    },
    methods: {
        toNew(){
            this.$router.push({
                'name':'yearEdit',
                'path': '/Editlogs/year.vue'
            })
        },
        delStr(a){
            console.log()
            return a+' 年总结'
        },
        toDetails(e){
            
            this.$router.push({
                name: 'myyearDetails',
                path: '/Mylogs/yearDetails.vue',
                query:e
            })
        },
        Picker(){
            this.showALL = true
        },
        onConfirmAll(e){
            // console.log(e)
            // this.showData = e
            // this.showALL = false
      
            this.getfindYearListSubmitApi()
        },
        onCancelAll(e){
            this.showALL = false
        },
        getfindYearListSubmitApi(id){
            findYearListSubmit({
                params:{
                    'year':this.showData,
                    'createUserId': id ? id : this.userInfos.userId
                }
            }).then(res=>{
                this.listData = res.data
            })
        }
        
    },
}
</script>
<style lang="scss" scoped>

    .main{
        margin-top: 8px;
    }
    .boldline{
        height: 8px;
        background: rgb(219, 207, 207);
        margin-top: 10px;
    }
    .baseline{
        height: 1px;
        background: rgb(219, 207, 207);
    }
    .footer{
        width: 100%;
        position: absolute;
        bottom: 0;
        button{
            margin: 10px auto;
        }
    }
    .bluespot {
      height: 10px;
      width: 10px;
      background: rgb(35, 133, 255);
      border-radius: 50%;
      margin: 18px 15px 0 0;
    }
    .cont{
        div{
            span{
                font-size: 20px;
                color: gray;
            }
        }
        .space{
            line-height: 49px;
            // display: flex;
            text-align: left;
            padding-left: 20px;
            display: flex;
            justify-content: space-between;;
        }
        .van-icon{
            color: gray;
            top: 3px;
            display: flex;
            align-items: center;
            padding-right: 20px;
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
   .nodata {
        margin-top: 50%;
    }
</style>
