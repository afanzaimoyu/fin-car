<template>
  <div class="carmap-container">
    <i class="el-icon-arrow-left go-back" @click="goBack"></i>
    <img :src="imageUrl" alt="展示图" class="fullscreen-image"/>
  </div>
</template>

<script>
export default {
  name: "index",
  computed: {
    imageUrl() {
      return this.$route.query.url || "";
    }
  },
  methods: {
    goBack() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="less" scoped>
.carmap-container {
  position: relative;
  height: 93vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .go-back {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 60px;
    color: #42b983;
    cursor: pointer;
  }

  .fullscreen-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}


</style>