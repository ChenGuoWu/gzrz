<template>
    <div class="main">
        <div class="flex">
            <div >
                <p>{{$store.state.userInfo.user.userName}}</p>
                <p class="fontColor">{{props.sysCreateDate}}</p>
            </div>
            <div class="other fontColor">
                未点评
            </div>
        </div>
        <div class="cont">
            <p class="fl">单位及职务：</p>
            <p class="fl fontColor">{{$store.state.userInfo.user.dept.deptName}}</p>
        </div>
        <div class="cont">
            <p class="fl">从事及分管工作</p>
            <p class="fl fontColor">{{listData.divisionWork}}</p>
        </div>
        <div class="cont">
            <p class="fl">{{doStr(props.quarterNumber||props.date)}}工作小结</p>
            <p class="fl fontColor">{{listData.logDayContentT}}</p>
        </div>
        <div class="baseLine"></div>
        <footer>
            <van-field
                v-model="commentcontent"
                center
                clearable
                label=""
                placeholder="请输入点评"
                style="background-color: #f7f8fa;
    border-radius: 22px;
"
                >
                <template #button>
                    <van-button size="small" type="primary" @click="postComment">评价</van-button>
                </template>
            </van-field>
        </footer>
    </div>
</template>
<script>
import {
  recallSubmit,
  selectLogQuarterById,
  commentsaveOrUpdate
} from "@/api/api";
export default {
    data() {
        return {
            listData:[],
            commentcontent:''
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
        this.getselectLogQuarterByIdApi()
    },
    methods: {
        doStr(aa){
            console.log(aa)
            return aa.split('_').join('年第')+'季度'
        },
        postComment(){
            this.commentsaveOrUpdateApi()
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
        commentsaveOrUpdateApi(){
            commentsaveOrUpdate({params:{
                'commentUserId':this.userInfos.userId,
                'commentcontent':this.commentcontent,
                'objectId':this.props.list[0].objectId,
                'type':1,
                'commentId':this.listData.commentId ? this.listData.commentId : ''
            }}).then(res=>{
                if(res.code == '20000'){
                    this.$Toast('点评成功')
                    window.history.go(-2)
                }else{
                    this.$Toast('点评失败')
                }
            })
        },
        getrecallSubmitApi(){
            recallSubmit({
                params:{
                    'objectId':this.props.list[0].objectId,
                    'createUserId':this.userInfos.userId
                }
            }).then(res=>{
                if(res.msg =='success'){
                    this.$Toast('撤回成功')
                }else{
                    this.$Toast('撤回异常')
                }
            })
        },
        getselectLogQuarterByIdApi(){
            console.log(this.props)
            selectLogQuarterById({
                params:{
                    objectId:this.props.list[0].objectId
                }
            }).then(res=>{
                this.listData = res.data
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
    #submit{
        width: 82%;
    }
    footer{
        width: 90%;
        position: absolute;
        margin: 0 auto;
        bottom: 0;
        
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
    footer{
        margin-bottom: 10px;
    }
</style>