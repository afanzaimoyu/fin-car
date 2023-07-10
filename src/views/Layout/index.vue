<template>
  <div class="layout">
    <!--  左侧导航-->
    <div class="menu">
      <Menu></Menu>
    </div>
    <!--  右侧导航-->
    <div class="content">
      <Content></Content>
    </div>
  </div>
</template>

<script>
import Content from './Content'
import Menu from './Menu'


export default {
  data() {
    return{};
  },
  components: {
    Menu,
    Content
  },
  methods: {},
}
</script>

<style lang="less" scoped> //less样式 scoped应用于当前
.layout {
  background-image: linear-gradient(to right, #48c6ef 0%, #6f86d6 100%) !important;

  .menu {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    /*width: 200px;*/
    background: #112f50;

    .el-menu {
      border-right: none

    }
  }

  .content {
    padding-left: 300px;
    transition: all .5s; // 过渡效果
    /*background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);*/
  }



}


</style>