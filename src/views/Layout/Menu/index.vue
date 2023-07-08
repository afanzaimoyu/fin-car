<template>
  <!--
      el-menu
          collapse	          是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）	boolean	—	false
          active-text-color   高亮文字颜色
          default-active      默认打开选中导航
          router              启动路由模式
      -el-submenu             下拉导航内容
          index               标识，类似于路由路径
      ---el-menu-item         导航的每一项内容
      ---i                    矢量图标
      --el-menu-item-group    导航组合
  -->
  <el-menu :default-active="activeMenu()" router class="el-menu-vertical-demo"
           background-color="#112f50" text-color="#fff" active-text-color="#ffd04b">
    <el-menu-item index="/">
      <i class="iconfont icon-zuche"></i>
      <span slot="title">寻找爱车</span>
    </el-menu-item>
    <el-menu-item index="/time">
      <i class="iconfont icon-shijian"></i>
      <span slot="title">时间段查找</span>
    </el-menu-item>
    <el-menu-item index="/obscure">
      <i class="iconfont icon-chepaishibie"></i>
      <span slot="title">模糊查找</span>
    </el-menu-item>

  </el-menu>
</template>

<script>
export default {
  name: "index",
  methods: {
    activeMenu() {
      let route = this.$route
      console.log(this.$route);
      let {path, meta} = route;//结构赋值 读取route里面的字段
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path
    }
  },

}
</script>
<!--
  scoped          作用于当前页面
  !important;     优先于它自带的内联样式
-->
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 300px;
  min-height: 400px;
}

.el-menu-item {
  //width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .iconfont {
    font-size: 50px;
  }

  [slot="title"] {

  }
}

.el-menu .is-active { //高亮显示

  /*background: #409eff !important;// 优先级*/
  background-image: linear-gradient(to right, #48c6ef 0%, #6f86d6 100%) !important;
  color: #f6f7d7 !important;
}


</style>