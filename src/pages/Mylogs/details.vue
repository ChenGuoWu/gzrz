<template>
    <div class="main">
        <p class="back" @click="back" v-if="props.newlybuild && +listData.commentStatus === 0">撤回</p>
        <div class="flex">
            <div >
                <p>{{listData.realName}}</p>
                <p class="fontColor">{{listData.sysCreateDate}}</p>
            </div>
            <div class="other fontColor">
                <img src="@/assets/document/have_comment.png" alt="" srcset="" v-if="+listData.commentStatus == 1">
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
            <p class="fl">{{doStr(props.quarterNumber||props.date)}}工作小结</p>
            <p class="fl fontColor">{{listData.logDayContentT}}</p>
        </div>
        <div class="baseLine"></div>
        <div class="cont" v-if="+listData.commentStatus == 1">
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
        this.getselectLogQuarterById()
    },
    methods: {
        doStr(aa){
            console.log(aa)
            if(aa){
                return aa.split('_').join('年第')+'季度'
            }
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
        },
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