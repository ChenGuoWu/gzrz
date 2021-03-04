<template>
  <div>
    <div class="sildesiber">
      <div class="siber" v-if="breadList.length">
        <span>{{ breadListStr }}</span>
      </div>
    </div>
    <div class="addresbooksAll">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div>
          <div
            class="addressbook-text"
            v-for="(item, index) in cPhoneList"
            :key="index"
            @click="gotodetail(item)"
          >
            <div class="addressbook-imguser">
              <div :class="randcolor[0]">
                {{ item.name.substring(item.name.length - 2) }}
              </div>
            </div>
            <div class="addressbook-name">
              <span>{{ item.name }}</span> | {{ item.deptName }}
            </div>
            <div class="addressbook-ico">
              <van-icon name="arrow" />
            </div>
          </div>
          <div
            class="addressbook-text"
            v-for="(item, index) in cPhoneListChildren"
            :key="index"
            @click="gotodetailLeval(item.id, item.name)"
          >
            <div class="addressbook-img"></div>
            <div class="addressbook-name">{{ item.name }}</div>
            <div class="addressbook-ico">
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { getDeptAndUserList } from "@/api/api";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      phoneList: [],
      randcolor: ["rand1", "rand2", "rand3", "rand4"],
      isLoading: false,
    };
  },

  beforeUpdate() {},
  computed: {
    ...mapState(["breadList", "idList"]),
    cPhoneList() {
      return this.phoneList.filter((item) => item.childrens == null);
    },
    cPhoneListChildren() {
      return this.phoneList.filter((item) => item.childrens !== null);
    },
    breadListStr() {
      return this.breadList.join("> ");
    },
    breadListLength() {
      return this.breadList.length;
    },
  },
  mounted() {
    this.backsTrue();
    console.log(this.breadList.length);
    if (this.breadList.length) {
      //说明是详情页跳转
      this.gotodetailLeval();
    } else {
      this.getDeptAndUserListIndex();
    }
  },
  watch: {
    breadListLength(newValue, oldValue) {
      if (newValue) {
        //存在长度就替换返回按钮
        this.backsTrue();
      } else {
        this.backsFalse();
      }
    },
    $route: {
      handler(n) {
        // 初始化操作
        if (this.breadList.length) {
          //说明是详情页跳转
          this.gotodetailLeval();
        } else {
          this.getDeptAndUserListIndex();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    ...mapMutations(["addBreadList", "addIdList", "backsTrue", "backsFalse"]),
    //获取列表
    getDeptAndUserListIndex(
      isOne = 1,
      id = this.$store.state.userInfo.user.deptId
    ) {
      return new Promise((resolve) => {
        let params = {
          isOne: isOne,
          userId: this.$store.state.userInfo.user.objectId,
          deptId: id,
        };
        getDeptAndUserList({ params }).then((res) => {
          this.phoneList = res.data;
          console.log(res);
          return resolve();
        });
      });
    },
    //进入子集
    gotodetailLeval(id, name) {
      //把id存入一个数组 然后调用数组的最后一个id
      if (id) {
        this.addIdList(id);
        this.addBreadList(name);
      }

      this.getDeptAndUserListIndex(0, this.idList[this.idList.length - 1]);
    },
    gotodetail(value) {
      console.log(value);
      this.addIdList(value.id);
      this.addBreadList(value.name);
      this.$router.push({
        path: "/Phone/detail.vue",
        query: {
          name: value.name,
          id: value.id,
        
        },
      });
    },
    onRefresh() {
      //发送请求获取刷新数据
      this.getDeptAndUserListIndex();
      Toast("刷新成功");
      this.isLoading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.sildesiber {
  width: 100%;
  overflow-x: auto;
  background: #f2f2f2;
 
}
.siber {
  display: flex;
  height: 24px;
  line-height: 24px;
  padding-left: 18px;
  
}
.addresbooksAll {
  flex: 1;
  overflow-y: auto;
  text-align: left;
  padding-top: 5px;
  .addressbook-img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: url("~@/assets/document/bg.png") no-repeat no-repeat;
    background-size: cover;
  }
  .addressbook-imguser {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    overflow: hidden;
    line-height: 36px;
    div {
      width: 100%;
      height: 100%;
      font-size: 12px;
      text-align: center;
    
      background: chartreuse;
   
    }
  }
}

.addressbook-text {
  width: 90%;
  margin: 0 auto;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  border-bottom: 1px solid #e4dfdf;
}
.addressbook-name {
  width: 250px;
}

.rand1 {
 
  background: rgb(35, 133, 255) !important;
  color: white;
  line-height: 36px;
}

</style>
