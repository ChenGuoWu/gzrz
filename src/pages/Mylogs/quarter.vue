<template>
    <div class="main">
        <div class="top">
            <!-- <div class="dataselet" @click="Picker">
                {{showData}}
            </div> -->
            <div class="search" @click="Picker">
                <img src="@/assets/document/calendar.png" alt="">
                <img src="@/assets/document/expand.png" alt="">
                {{showData}}
            </div>
        </div>
        <van-popup
              v-model="showALL"
              position="bottom"
              :style="{ height: '50%' }"
            >
              <van-picker
                class="fonts"
                show-toolbar
                :columns="columnsAll"
                @confirm="onConfirmAll"
                @cancel="onCancelAll"
              />
            </van-popup>
        <div class="cont" v-for="(item,index) in listData" :key="index">
            <div class="space" @click="toDetails(item)">
                <span style="text-align:left">{{delStr(item.quarterNumber)}}</span>

                <van-icon name="arrow" size="20px"/>
            </div>
            <p class="baseline"></p>
        </div>
        <footer class="footer" v-if="newlybuild">
            <div class="btn" @click="toNew">
                <div>+</div>
                <div>新建</div>
            </div>
        </footer>
    </div>
</template>
<script>
import {
  choiceLeader,
  findQuarterListSubmit
} from "@/api/api";
export default {
    data() {
        return {
            showData:new Date().getFullYear() -1,
            showALL:false,
            listData:[]
        }
    },
    props: {
        newlybuild: {
            type: Boolean,
            default: true
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
    mounted() {
        console.log(this.newlybuild, 1)
        this.getfindQuarterListSubmitApi()
    },
    methods: {
        toNew(){
            this.$router.push({
                'name':'quarterEdit',
                'path': '/Editlogs/quarter.vue'
            })
        },
        delStr(a){
            console.log()
            return a.split('_').join('年第')+'季度'
        },
        toDetails(e){
            console.log(this.newlybuild)
            e.newlybuild = this.newlybuild
            this.$router.push({
                name:'details',
                path: '/Mylogs/details.vue',
                query:e
            })
        },
        Picker(){
            this.showALL = true
        },
        onConfirmAll(e){
            console.log(e)
            this.showData = e
            this.showALL = false
      
            this.getfindQuarterListSubmitApi()
        },
        onCancelAll(e){
            this.showALL = false
        },
        getfindQuarterListSubmitApi(){
            findQuarterListSubmit({
                params:{
                    'year':this.showData,
                    'creatUserId':this.userInfos.userId
                }
            }).then(res=>{
                this.listData = res.data
            })
        },
        async getselectLogQuarterById(){
            console.log(this.props)
            await selectLogQuarterById({
                params:{
                    objectId:this.props.objectId
                }
            }).then(res=>{
                this.listData = res.data
                console.log(this.listData)
            })
        }
    },
}
</script>
<style lang="scss" scoped>
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
    .top{
        line-height: 30px;
        .dataselet{
            width: 80%;
            margin: 0 auto;
            height: 35px;
            line-height: 33px;
            border: 1px solid rgb(224, 205, 205);
            text-align: left;
            padding: 0 0 0 8px;
        }
    }   
    .main{
        margin-top: 8px;
    }
    .boldline{
        height: 8px;
        background: rgb(219, 207, 207);
        margin-top: 10px;
    }
    .baseline{
        height: 2px;
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
</style>