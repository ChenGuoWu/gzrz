<template>
    <div>
        <Listyear :listData = 'listData' :kind ='true'></Listyear>
    </div>
</template>
<script>
import {
  detailsToBeDoneYear,
  selectLogYearById
} from "@/api/api";
import Listyear from "@/pages/Common/Listyear";
export default {
    data() {
        return {
            listData:[],
            todo:'todo'
        }
    },
    components:{Listyear},
    mounted() {
        this.getdetailsToBeDoneYearApi()
        // this.getselectLogQuarterByIdApi()
    },
    computed:{
        userInfos() {
            return this.$store.state.userInfo;
        }
    },
    methods: {
        
        toDel(e,index,ev){
        },
        getdetailsToBeDoneYearApi(){
            detailsToBeDoneYear({
                params:{
                    submitUserId:this.userInfos.userId,
                    commentState: 0
                }
            }).then(res=>{
                this.listData = res.data
            })
        },
      
    },
}
</script>
<style lang="scss" scoped>
    
</style>