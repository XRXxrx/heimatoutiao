<template>
  <div class="personal">
    <router-link :to="`/edit_profile/` + id">
      <div class="profile">
        <img :src="userinfo.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span
              class="iconfont"
              :class="{
                iconxingbienan: userinfo.gender === 1,
                iconxingbienv: userinfo.gender === 0,
              }"
            ></span
            >{{ userinfo.nickname }}
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <mycell title="我的关注" desc="关注的用户"></mycell>
    <mycell title="我的跟帖" desc="跟帖/回复"></mycell>
    <mycell title="我的收藏" desc="文章/视频"></mycell>
    <mycell title="设置"></mycell>
    <mybutton type="danger" style="margin-top: 20px" @click="tuback"
      >退出</mybutton
    >
  </div>
</template>

<script>
import axios from "../../utils/request";
import { getUserInfo } from "@/apis/user";
import mycell from "@/components/hm_cell";
import mybutton from "@/components/hm_button";
export default {
  components: {
    mycell,
    mybutton,
  },
  data() {
    return {
      userinfo: {},
      id: "",
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    getUserInfo(this.id)
      .then((res) => {
        console.log(res);
        this.userinfo = res.data.data;
        this.userinfo.head_img =
          axios.defaults.baseURL + this.userinfo.head_img;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    //退出功能
    tuback() {
      localStorage.removeItem("heima_token2");
      localStorage.removeItem("user_id");
      this.$router.push({ name: "index" });
    },
  },
};
</script>

<style lang="less" scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>