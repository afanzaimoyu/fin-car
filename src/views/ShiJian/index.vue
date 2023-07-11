<template>
  <!--  搜索-->
  <div class="time-search">
    <!-- 查询部分 -->
    <div class="search-container">
      <div class="time-search-top">
        <el-form :model="searchForm" inline>
          <el-form-item label="开始时间">
            <el-date-picker
                v-model="searchForm.startTime"
                type="datetime"
                placeholder="选择开始时间"
                value-format="yyyy-MM-dd HH:mm"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
                v-model="searchForm.endTime"
                type="datetime"
                placeholder="选择结束时间"
                value-format="yyyy-MM-dd HH:mm"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 结果列表 -->
    <div class="result-container">
      <div class="result-list">
        <el-button type="text" v-for="item in searchResult" :key="item.id" @click="showImage(item)">
          <el-card>
            <div>车牌为：{{ item.licensePlate }}</div>
            <div>停车时间：{{ item.parkingTime }}</div>
          </el-card>
        </el-button>
      </div>

      <!-- 分页器 -->
      <el-pagination
          class="pagination"
          background
          layout="total, prev, pager, next"
          :current-page="searchForm.page"
          :page-size="pageSize"
          :total="total"
          @current-change="handlePageChange"
          :hide-on-single-page="is_show_page"
      ></el-pagination>
    </div>

    <!-- 图片对话框 -->
    <el-dialog :visible.sync="showImageDialog" width="60%">
      <img :src="selectedImage" alt="车辆图片" class="fullscreen-image"/>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        startTime: '',
        endTime: '',
        page: 1,
      },
      searchResult: [],
      showImageDialog: false,
      selectedImage: '',
      currentPage: 1,
      pageSize: 0, // 每页显示的条目数
      total: 0,
      is_show_page: true,
      is_bigger: true,
    };
  },
  methods: {
    async search() {
      console.log(this.searchForm);

      // 发起查询请求，根据时间段获取停车信息，将结果保存到searchResult数组中

      await this.finditer_car()

      console.log('---------------------searchResult', this.searchResult);
      // 查询完成后获取容器元素并滚动到可视区域内
      const resultContainer = this.$refs.resultContainer;

      resultContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    },

    showImage(item) {
      console.log('点击了卡片', item);
      this.selectedImage = item.imageUrl;
      this.showImageDialog = true;
    },

    handlePageChange(currentPage) {
      this.searchForm.page = currentPage; // 更新页码
      this.finditer_car(); // 重新请求数据
    },

    async finditer_car() {
      let res = await this.$api.search_time_ChePai(this.searchForm)
      try {
        if (res && res.data.status === 200 && res.data.data.length > 0) {
          this.$message({
            message: '恭喜你，已查询到如下车牌',
            type: 'success'
          });
          this.searchResult = res.data.data.map(item => (
              {
                id: item.id,
                licensePlate: item.licensePlate,
                parkingTime: item.parkingTime,
                imageUrl: item.imageUrl
              }
          ));
          this.total = res.data.count; // 更新总条数
          this.pageSize = res.data.data.length
        } else {
          this.$message.error('车牌查询失败')
        }
      } catch (error) {
        this.$message.error('查询失败，请稍后再试');
      }
    }
  }
};
</script>

<style lang="less" scoped>
.time-search {
  padding: 20px;
  height: 88vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  //.search-container {
  //  flex: 1;
  //}

  .result-list {
    margin-top: 20px;

    .el-card {
      margin-bottom: 10px;
      cursor: pointer;
    }
  }

  .el-dialog__wrapper {
    top: -60px !important;
  }

  .el-pagination {
    display: flex;
    justify-content: center; /* 居中显示 */
  }

  .fullscreen-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
