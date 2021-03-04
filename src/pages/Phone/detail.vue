<template>
  <div>
    <van-tabs v-model="active">
      <van-tab title="日写实">
          <day :isAdd='isAddFlase' :id='idDay'></day>
      </van-tab>
      <van-tab title="季小结">
        <quarter :newlybuild="newlybuild" />
      </van-tab>
      <van-tab title="年总结">
        <year :newlybuild="newlybuild" />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import day from "@/pages/Mylogs/day.vue";
import quarter from "@/pages/Mylogs/quarter.vue";
import year from "@/pages/Mylogs/year.vue";
import { mapMutations } from "vuex";
export default {
 components: {
    day,
    quarter,
    year
  },
  data() {
    return {
        active:0,
        isAddFlase:false,//说明是综合查询进入 (控制日写实)
        idDay:'',//综合查询进入查询的id
        newlybuild: false
    };
  },

  computed: {},
  mounted() {
  
    this.backsTrue();
      this.idDay=this.$route.query.id;
    this["$route"].meta.title = this.$route.query.name;
  },
  methods: {
    ...mapMutations(["backsTrue","backsFalse"]),
  },
  beforeDestroy(){
    this.backsFalse();
  }
};
</script>
<style lang="scss" scoped>
/deep/ .van-tabs__line{
    background-color:rgb(35, 133, 255);
}
</style>