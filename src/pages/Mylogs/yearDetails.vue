<template>
    <div class="main">
        <p class="back" @click="back" v-if="listdata.yearCommentStatus != 1">撤回</p>
        <div class="flex">
            <div >
                <p>{{$store.state.userInfo.user.userName}}</p>
                <p class="fontColor">{{listdata.sysCreateDate}}</p>
            </div>
            <div class="other fontColor">
                <img src="@/assets/document/have_comment.png" alt="" srcset="" v-if="+listdata.yearCommentStatus == 1">
                <img src="@/assets/document/not_comment.png" alt="" srcset="" v-else>
            </div>
        </div>
        <div class="cont">
            <p class="fl">单位及职务： {{$store.state.userInfo.user.dept.deptName}}</p>
        </div>
        <div class="cont">
            <p class="fl">从事及分管工作： {{listdata.yearDivisionWork}}</p>
        </div>
        <div class="cont">
            <p class="fl">{{ listdata.yearDate }}工作总结</p>
            <p class="fl fontColor">{{listdata.yearContentT}}</p>
        </div>
        <div class="baseLine"></div>
        <div class="cont" v-if="listdata.yearCommentStatus == 1">
            <p class="fl">点评人：{{ listdata.commentRealName }}</p>
            <p class="fl">点评：{{ listdata.commentcontent }}</p>
        </div>
    </div>
</template>
<script>
import { yearrecallSubmit, selectLogYearById } from "@/api/api";
export default {
    data() {
        return {
            listdata: {}
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
        this.getselectLogYearById()
    },
    methods: {
        doStr(aa){
            console.log(aa)
            return aa.split('_').join('年第')+'季度'
        },
        back(){
            console.log(1)
            this.$Dialog.confirm({
                title: '提示',
                message: '确定要撤回吗？',
            })
            .then(() => {
                // on confirm
                console.log(2)
                this.getrecallSubmitApi()
            })
            .catch(() => {
                // on cancel
            });
        },
        getrecallSubmitApi(){
            console.log(3)
            yearrecallSubmit({
                params:{
                    'objectId':this.props.objectId,
                    'createUserId':this.userInfos.userId
                }
            }).then(res=>{
                if(res.msg =='success'){
                    this.$Toast('撤回成功')
                    this.$router.go(-1)
                }else{
                    this.$Toast('撤回异常')
                }
            })
        },
        getselectLogYearById() {
            selectLogYearById({
                params:{
                    'objectId':this.props.objectId
                }
            }).then(res=>{
                this.listdata = res.data
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