<template>
  <div class="index">
    <!-- 顶部 -->
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <van-icon name="search" />
        <span>搜索商品</span>
      </div>
      <div class="user">
        <van-icon name="manager-o" />
      </div>
    </div>
    <!-- 导航栏 -->
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="value.name" v-for="value in catelist" :key="value.id">
        <!-- <mypostlist
          v-for="post in postlist"
          :key="post.id"
          :post="post"
        ></mypostlist> -->
        <mypostlist
          v-for="post in value.postlist"
          :key="post.id"
          :post="post"
        ></mypostlist>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import mypostlist from "@/components/hm_postlist";
import { getCateInfo } from "@/apis/category";
import { postList } from "@/apis/post";
export default {
  components: {
    mypostlist,
  },
  data() {
    return {
      active: localStorage.getItem("heima_token2") ? 1 : 0,
      catelist: [],
      //   postlist: [],
    };
  },
  async mounted() {
    //获取导航栏数据
    let res = await getCateInfo();
    console.log(res);
    this.catelist = res.data.data;
    // 已发送的栏目内容请求不要重复发送,因此将其内容数据存进对应的栏目数组对象中
    this.catelist = this.catelist.map((v) => {
      return { ...v, postlist: [] };
    });
    // 页面一加载就获取一次导航栏对应的内容页数据
    this.getlist();
  },
  watch: {
    async active() {
      //   console.log(this.active);
      //判断是否已经发送过请求
      if (this.catelist[this.active].postlist.length === 0) {
        this.getlist();
      }
    },
  },
  methods: {
    //该代码重复使用，因此封装，方便维护
    async getlist() {
      let id = this.catelist[this.active].id;
      //   this.postlist = (await postList(id)).data.data;
      //将导航栏对应的内容数据存进对应的栏目数组对象中
      this.catelist[this.active].postlist = (await postList(id)).data.data;
    },
  },
};
</script>

<style lang="less" scoped>
.index {
  .header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f00;
    padding: 0 10px;
    .iconnew {
      font-size: 50px;
      color: #fff;
    }
    .search {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.538);
      padding: 10px 0;
      margin: 0 15px;
      border-radius: 25px;
      color: #fff;
    }
    .user {
      font-size: 23px;
      color: orange;
    }
  }
}
</style>