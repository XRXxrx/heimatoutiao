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
        <van-icon name="manager-o" @click="editperson" />
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
        <van-list
          v-model="value.loading"
          :finished="value.finished"
          loading-text="玩命加载中"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-pull-refresh v-model="value.isLoading" @refresh="onRefresh">
            <mypostlist
              v-for="post in value.postlist"
              :key="post.id"
              :post="post"
            ></mypostlist>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Toast } from "vant";
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
      return {
        ...v,
        postlist: [],
        loading: false,
        finished: false,
        isLoading: false,
        pageIndex: 1,
        pageSize: 10,
      };
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
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        //将页码重置为1
        this.catelist[this.active].pageIndex = 1;
        //将数据清空
        this.catelist[this.active].postlist.length = 0;
        // 将之前可能重置为true的finished状态重置为false
        this.catelist[this.active].finished = false;
        this.getlist();
        Toast("刷新成功");
      }, 1000);
    },
    //上拉刷新
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      //加载完当前页之后，再加载下一页
      this.catelist[this.active].pageIndex++;
      setTimeout(() => {
        this.getlist();
      }, 1000);
    },
    //该代码重复使用，因此封装，方便维护
    async getlist() {
      // let id = this.catelist[this.active].id;
      //   this.postlist = (await postList(id)).data.data;
      //获取导航栏对应的内容数据
      let current = (
        await postList({
          category: this.catelist[this.active].id,
          pageIndex: this.catelist[this.active].pageIndex,
          pageSize: this.catelist[this.active].pageSize,
        })
      ).data.data;
      //将导航栏对应的内容数据存进对应的栏目数组对象中
      this.catelist[this.active].postlist.push(...current);
      // 本次请求完成之后，将loading重置为false,以便下一次上拉
      this.catelist[this.active].loading = false;
      // 本次请求完成之后，将下拉刷新折状态重置为false,以便下一次下拉刷新
      this.catelist[this.active].isLoading = false;
      // 判断数据是否已全部加载完毕：我要求20条数据，结果返回的数量小于20，说明真没有数据了
      if (current.length < this.catelist[this.active].pageSize) {
        this.catelist[this.active].finished = true;
      }
    },
    //返回个人中心页
    editperson() {
      let user_id = localStorage.getItem("user_id");
      if (user_id) {
        this.$router.push({ path: `/personal/${user_id}` });
      } else {
        this.$router.push({ name: "login" });
        this.$toast.fail("你还未登录");
      }
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