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
      <img src="@/assets/logo.png" alt="" />
    </div>
  </div>
</template>

<script>
import myheader from "@/components/hm_header";
export default {
  components: {
    myheader,
  },
};
</script>

<style>
</style>