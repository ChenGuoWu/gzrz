<template>
    <div>
        <List :listData = 'listData' :kind ='true'></List>
    </div>
</template>
<script>
import {
  detailsToBeDone,
  selectLogQuarterById
} from "@/api/api";
import List from "@/pages/Common/List.vue";
export default {
    data() {
        return {
            listData:[],
            todo:'todo'
        }
    },
    components:{List},
    mounted() {
        this.getdetailsToBeDoneApi()
        // this.getselectLogQuarterByIdApi()
    },
    computed:{
        userInfos() {
            return this.$store.state.userInfo;
        }
    },
    methods: {
        
        toDel(e,index,ev){
            // console.log(ev)
            // var evt = ev || window.event
            // var target = evt.target || evt.srcElement
            // this.$router.push({
            //     path:'/Todolist/details.vue',
            //     query:e
            // })
        },
        getdetailsToBeDoneApi(){
            detailsToBeDone({
                params:{
                    submitUserId:this.userInfos.userId
                }
            }).then(res=>{
                this.listData = res.data
            })
        },
        // getselectLogQuarterByIdApi(){
        //     console.log(this.props)
        //     selectLogQuarterById({
        //         params:{
        //             objectId:this.props.list.objectId
        //         }
        //     }).then(res=>{

        //     })
        // }
    },
}
</script>
<style lang="scss" scoped>
    
</style>