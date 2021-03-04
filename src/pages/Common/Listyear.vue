<template>
    <div class="main" >
        <div v-if="!listData.length">暂无数据</div>
        <template v-if="kind == true">
            <div v-for="(item,index) in listData" :key="index" @click="p($event,item)">
                <div class="cont">
                    <div>
                        <span>姓名：</span>
                        <span v-for="(item,index) in item.list" :key="index" @click="toDel(item,index,$event)">
                            {{item.realName}}
                        </span>
                    </div>
                    <p>{{item.date}}</p>
                </div>
                <div class="conts">
                    <span>单位及职务：</span>
                    <span v-for="(item,index) in item.list" :key="index">
                        {{item.departName}}
                    </span>
                </div>
                <div class="baseLine"></div>
            </div>
        </template>
        <template v-else>
            <div v-for="(item,index) in listData" :key="index" @click="d($event,item)">
                <div class="cont">
                    <div>
                        <span>姓名：</span>
                        <!-- <span v-for="(item,index) in item.list" :key="index" @click="toDel(item,index,$event)"> -->
                            {{item.logRealName}}
                        <!-- </span> -->
                    </div>
                    <p>{{item.sysCreateDate}}</p>
                </div>
                <div class="conts">
                    <span>单位及职务：</span>
                    <!-- <span v-for="(item,index) in item.list" :key="index"> -->
                        {{item.logDepartName}}
                    <!-- </span> -->
                </div>
                <div class="baseLine"></div>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    name:'Listyear',
    data() {
        return {
            
        }
    },
    props:{
        listData: {
            type: Array,
            default: []
        },
        kind:{
            type:Boolean,
            default:false
        }
    },
    mounted() {
        console.log(this.kind)
    },
    methods: {
        todo(){

        },
        d(a,e){
            console.log(e)
            e.objectId = e.quarterdetailid
            this.$router.push({
                name: 'myyearDetails',
                path: '/Mylogs/yearDetails.vue',
                query:e
            })
        },
        p(e,i){
            this.$router.push({
                path:'/Todolist/yearDetails.vue',
                query:i
            })
        },
    },
}
</script>
<style lang="scss" scoped>
    .cont{
        padding: 5px;
        display: flex;
        justify-content: space-between;
    }
    .conts{
        padding: 5px;
        display: flex;
    }
    .main{
        padding: 5px;
    }
    .baseLine{
        height: 0.5px;
        background: rgb(219, 207, 207);
        margin-top: 0px;
    }
     .nodata {
        margin-top: 50%;
    }
</style>