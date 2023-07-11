<template>
  <div class="top">
    <h2>移动端</h2>
    <p>欢迎使用本系统寻找您的爱车</p>
    <p>如果人流量较大，您可以使用我们的小程序进行一键寻车</p>
    <img :src="img" alt="汽车图片" @click="showImageDialog = true">
    <el-dialog :visible.sync="showImageDialog" width="80%">
      <img :src="img" alt="汽车图片" class="fullscreen-image"/>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "index",

  data() {
    return {
      img: '',
      showImageDialog: false,
    };
  },
  mounted() {
    this.collectionCode()
  },
  methods: {
    async collectionCode() {

      try {
        let res = await this.$api.get_collectionCode()
        if (res && res.status === 200 && res.data.length > 0) {
          this.img = res.data[0].url
        }
      } catch (error) {
        console.error('查询失败', error);
        this.$message.error('查询失败，请稍后再试');
      }
    },
  }
}
</script>

<style lang="less" scoped>
.top {
  text-align: center;
  padding: 20px;
  height: 88vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    margin-bottom: 10px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer; /* 添加指针样式以表明可以点击 */
  }

  .el-dialog__wrapper {
    top: -80px !important;
  }

  .fullscreen-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>