<template>
  <div class="edit">
    <myheader title="个人信息编辑">
      <template v-slot:left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
      <template v-slot:right>
        <van-icon name="wap-home-o" @click="$router.push({ name: 'index' })" />
      </template>
    </myheader>
    <div class="imgarea">
      <img :src="userinfos.head_img" alt="" />
      <van-uploader :after-read="afterRead" />
    </div>
    <mycell
      title="昵称"
      :desc="userinfos.nickname"
      @click.native="edieShowDialog"
    ></mycell>
    <van-dialog
      v-model="nickshow"
      title="昵称"
      show-cancel-button
      @confirm="updateInfo"
    >
      <van-field
        v-model="nickname"
        required
        label="昵称"
        placeholder="请输入昵称"
      />
    </van-dialog>
    <mycell title="密码" :desc="userinfos.password"></mycell>
    <mycell title="性别" :desc="userinfos.gender === 1 ? '男' : '女'"></mycell>
  </div>
</template>

<script>
import { updatefile } from "@/apis/updatefile";
import axios from "@/utils/request";
import { getUserInfo, updateUserInfo } from "@/apis/user";
import mycell from "@/components/hm_cell";
import myheader from "@/components/hm_header";
export default {
  components: {
    myheader,
    mycell,
  },
  data() {
    return {
      userinfos: {},
      nickshow: false,
      nickname: "",
    };
  },
  mounted() {
    getUserInfo(this.$route.params.id)
      .then((res) => {
        console.log(res);
        this.userinfos = res.data.data;
        this.userinfos.head_img =
          axios.defaults.baseURL + this.userinfos.head_img;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file.file);
      //上传图片
      let fd = new FormData();
      fd.append("file", file.file);
      updatefile(fd)
        .then((res) => {
          console.log(res);
          if (res.data.message === "文件上传成功") {
            this.userinfos.head_img =
              axios.defaults.baseURL + res.data.data.url;
            updateUserInfo(this.$route.params.id, {
              head_img: res.data.data.url,
            })
              .then((res) => {
                console.log(res);
                if (res.data.message === "修改成功") {
                  this.$toast.success(res.data.message);
                  // console.log(res.data.data.head_img);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //弹出框
    edieShowDialog() {
      this.nickshow = !this.nickshow;
      this.nickname = this.userinfos.nickname;
    },
    //点击确定按钮
    updateInfo() {
      updateUserInfo(this.$route.params.id, { nickname: this.nickname })
        .then((res) => {
          console.log(res);
          if (res.data.message === "修改成功") {
            this.$toast.success(res.data.message);
            // console.log(res.data.data.head_img);
            this.userinfos.nickname = this.nickname;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.imgarea {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  position: relative;
  img {
    width: 120 * 100vw/360;
    height: 120 * 100vw/360;
    display: block;
  }
  /deep/ .van-uploader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .van-uploader__upload {
      width: 120 * 100vw/360;
      height: 120 * 100vw/360;
      opacity: 0;
    }
  }
}
</style>