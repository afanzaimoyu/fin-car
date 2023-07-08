<template>
  <div>
    <!--        顶部区域-->
    <div class="head">
      <div class="head-right">
        <span>{{ nowTime }}</span>
        <span class="line"> | </span>
        <span>欢迎使用xxx寻车 </span>
      </div>

    </div>

    <!--        内容区域-->
    <router-view></router-view>
  </div>
</template>

<script>
//导入dayjs
import dayjs from 'dayjs'

export default {
  // props: ['ischange'], // 是子组件访问父组件数据的唯一接口 声明要用父组件里面的ischange
  data() {
    return {
      nowTime: ''
    }
  },
  methods: {},
  created() {
    //获取当前时间---------------------------
    // let time =new Date()    // 1.自己封装 2.moment 3.dayjs
    this.nowTime = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
  }
}
</script>

<style lang="less" scoped>
.head {
  /*background: #666666;*/
  background-image: linear-gradient(to right, #112f50 0%, #30cfd0 100%);

  height: 50px;
  line-height: 50px;
  color: #f5f5f5;
  width: 100%;
  display: flex; // 弹性盒子


  .head-right {
    flex: 1; // 平分盒子
    text-align: right;
    font-size: 12px;
    padding-right: 20px;

    .line {
      font-size: 12px;
      padding: 10px;
      color: #f5f5f5;
    }

  }

}


</style>