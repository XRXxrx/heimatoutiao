<template>
  <div class="myheader">
    <div class="left">
      <slot name="left">aa</slot>
    </div>
    <div class="center">{{ title }}</div>
    <div class="right">
      <slot name="right">cc</slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: [String],
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.myheader {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  .right {
    font-size: 20px;
    color: orange;
  }
}
</style>