<template>
    <div class="main">
        <div class="flex">
            <div >
                <p>{{$store.state.userInfo.user.userName}}</p>
                <p class="fontColor">{{props.sysCreateDate}}</p>
            </div>
            <div class="other fontColor">
                <img src="@/assets/document/have_comment.png" alt="" srcset="" v-if="+imgshow === 1">
                <img src="@/assets/document/not_comment.png" alt="" srcset="" v-else>
            </div>
        </div>
        <div class="cont">
            <p class="fl">单位及职务： {{listData.deptDuty}}</p>
        </div>
        <div class="cont">
            <p class="fl">从事及分管工作： {{listData.divisionWork}}</p>
        </div>
        <div class="cont">
            <p class="fl">{{doStr(props.sysCreateDate)}}工作小结</p>
            <p class="fl fontColor">{{listData.logDayContentT}}</p>
        </div>
        <div class="baseLine"></div>
        <div class="cont" v-if="+imgshow === 1">
            <p class="fl">点评人：{{ listData.commentRealName }}</p>
            <p class="fl">点评：{{ listData.commentcontent }}</p>
        </div>
    </div>
</template>
<script>
import {
  recallSubmit,
  selectLogQuarterById
} from "@/api/api";
export default {
    data() {
        return {
            logDayContentT:'',
            imgshow:false,
            listData: {}
        }
    },
    computed:{
        props(){
            return this.$route.query
        },
        userInfos() {
            return this.$store.state.userInfo;
        },
    },
    mounted() {
        console.log(11111111111)
        this.getselectLogQuarterByIdApi()
    },
    methods: {
        doStr(aa){
            console.log(aa.split('-'))
            
            if(aa){
                let a = aa.split('-')[1],
                    year = aa.split('-')[0],
                    j,i;
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
                return i
            }
        },
        getselectLogQuarterByIdApi(){
            console.log(this.props)
            selectLogQuarterById({
                params:{
                    objectId:this.props.quarterdetailid
                }
            }).then(res=>{
                this.logDayContentT = res.data.logDayContentT
                this.imgshow = res.data.commentStatus
                this.listData = res.data
            })
        },
        back(){
            this.$Dialog.confirm({
                title: '提示',
                message: '确定要撤回吗？',
            })
            .then(() => {
                // on confirm
                this.getrecallSubmitApi()
            })
            .catch(() => {
                // on cancel
            });
        },
        getrecallSubmitApi(){
            recallSubmit({
                params:{
                    'objectId':this.props.objectId,
                    'createUserId':this.userInfos.userId
                }
            }).then(res=>{
                if(res.msg =='success'){
                    this.$Toast('撤回成功')
                    this.$router.go(-1);
                }else{
                    this.$Toast('撤回异常')
                }
            })
        }
    },
}
</script>
<style lang="scss" scoped>
    .fontColor{
        color: gray;
    }
    .fl{
        text-align:left
    }
    .showCom{
        // width: 72%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
    }
    .main{padding: 5px 18px;}
    .flex{
        display: flex;
        justify-content: space-between;
        
        div{
            p{
                text-align: left;
            }
        }
    }
    .other{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        img{
            width:60%;
            margin-left: 10px;
        }
    }
    .cont{
        margin-top: 18px;
    }
    .baseLine{
        height: 2px;
        background: rgb(219, 207, 207);
        margin-top: 17px;
    }
    .back{
        position: absolute;
        right: 12px;
        top: 11px;
        color: white;
    }
</style>