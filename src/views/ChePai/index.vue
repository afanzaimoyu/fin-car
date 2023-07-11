<template>
  <div class="home">
    <!--    图标-->
    <i class="iconfont icon-qiche"></i>
    <!--    显示框-->
    <div class="show">
      <el-row>
        <el-col :span="24">
          <div class="show-row">
            <el-button type="success" class="type-button" plain @click="togglePlateType">
              {{ plateType }}
            </el-button>
            <el-col v-for="index in characterCount" :key="index" :span="3">
              <div class="license-box">
                <div class="box-content">{{ licensePlate[index - 1] }}</div>
              </div>
            </el-col>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--    键盘-->
    <div class="keyboard">
      <!-- 第一行 -->
      <div class="row">
        <el-button-group v-if="show_num">
          <el-button v-for="province in provinces1" :province="province"
                     @click="onClickProvince(province)">{{ province }}
          </el-button>
        </el-button-group>
        <el-button-group v-else>
          <el-button v-for="key in row1" :key="key" @click="onClickKey(key)">{{ key }}</el-button>
        </el-button-group>
      </div>


      <!-- 第二行 -->
      <div class="row">
        <el-button-group v-if="show_num">
          <el-button v-for="province in provinces2" :province="province"
                     @click="onClickProvince(province)">{{ province }}
          </el-button>
        </el-button-group>
        <el-button-group v-else>
          <el-button v-for="key in row2" :key="key" @click="onClickKey(key)">{{ key }}</el-button>
        </el-button-group>
      </div>

      <!-- 第三行 -->
      <div class="row">
        <el-button-group v-if="show_num">
          <el-button v-for="province in provinces3" :province="province"
                     @click="onClickProvince(province)">{{ province }}
          </el-button>
        </el-button-group>
        <el-button-group v-else>
          <el-button v-for="key in row3" :key="key" @click="onClickKey(key)">{{ key }}</el-button>
        </el-button-group>
      </div>

      <!-- 第四行 -->
      <div class="row">
        <el-button-group v-if="show_num">
          <el-button v-for="province in provinces4" :province="province"
                     @click="onClickProvince(province)">{{ province }}
          </el-button>
        </el-button-group>
        <el-button-group v-else>
          <el-button v-for="key in row4" :key="key" @click="onClickKey(key)">{{ key }}</el-button>
        </el-button-group>
      </div>


    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      provinces1: ['京', '津', '沪', '渝', '冀', '豫', '云', '辽', '黑', '湘', '撤回'],
      provinces2: ['皖', '鲁', '新', '苏', '浙', '赣', '鄂', '桂', '甘', '晋'],
      provinces3: ['蒙', '陕', '吉', '闽', '贵', '粤', '青', '藏', '川'],
      provinces4: ['宁', '琼'],
      row1: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '撤回'],
      row2: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      row3: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      row4: ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '确认'],
      show_num: true,
      licensePlate: '',
      characterCount: 7,
      plateType: '油车',
    };
  },
  methods: {
    onClickProvince(province) {
      // 根据点击的省份切换按钮的显示与隐藏
      if (province === '撤回') {
        this.removeLastCharacter();
      } else {
        if (this.licensePlate.length < this.characterCount) {
          this.show_num = false;
          this.updateLicensePlate(province);
        }
      }
    },
    onClickKey(key) {
      // 在这里处理按钮点击逻辑
      if (key === '确认') {
        if (this.isLicensePlateValid()) {
          console.log('输入的车牌号是:', this.licensePlate);
          this.searchChePai(this.licensePlate)
        } else {
          this.$message.error('查询失败，请稍后再试')
        }
      } else if (key === '撤回') {
        this.removeLastCharacter();
      } else {
        if (this.licensePlate.length < this.characterCount) {
          this.updateLicensePlate(key);
        }
      }
    },
    togglePlateType() {
      // 切换品种
      if (this.plateType === '油车') {
        this.characterCount = 8;
        this.plateType = '新能源';
      } else {
        this.clearLicensePlate();
      }
    },
    updateLicensePlate(value) {
      // 更新显示
      this.licensePlate += value;
    },
    removeLastCharacter() {
      // 删除
      this.licensePlate = this.licensePlate.slice(0, -1);
      if (this.licensePlate.length === 1) {
        this.clearLicensePlate()
      }
    },
    clearLicensePlate() {
      // 清除
      this.licensePlate = '';
      this.show_num = true; // 显示省份键盘
      this.characterCount = 7;
      this.plateType = '油车';
    },
    isLicensePlateValid() {
      // 车牌位数校验
      return this.licensePlate.length === this.characterCount;
    },
// 查询车牌获取地图信息
    async searchChePai(licensePlate) {
      try {
        // let res = await this.$api.search_ChePai({search: licensePlate})
        let res = await this.$api.search_ChePai()
        console.log('输入的车牌为', licensePlate);
        console.log('查询 的结果', res);
        if (res && res.status === 200 && res.data.length > 0) {
          this.$message({
            message: '恭喜你，查询车牌成功',
            type: 'success'
          });
          const url = res.data[0].url;
          await this.$router.push({path: '/carmap', query: {url}});
        } else {
          this.$message.error('车牌查询失败')
        }
      } catch (error) {
        console.error('查询失败', error);
        this.$message.error('查询失败，请稍后再试');
      }
    }
  },
}
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 93.5vh; /* 如果你希望元素在整个可视区域垂直居中，可以设置高度为100vh */

  .iconfont {
    font-size: 200px;
  }

  .show {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;

    .show-row {
      display: flex;
      align-items: center;

      .type-button {
        margin-right: 10px;
      }

      .license-box {
        //每个框的样式
        width: 40px;
        height: 40px;
        border: 1px solid #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        background-color: #112f50;

        .box-content {
          //框内的内容样式
          font-size: 20px;
          color: white;
        }
      }
    }
  }


  .keyboard {
    margin-top: 10px;
    text-align: center;
    padding: 10px;

    .row {
      margin-bottom: 10px;
    }

    .el-button-group {
      display: inline-block; /* 让按钮组水平排列 */

      .el-button {
        margin: 5px; /* 设置按钮之间的间距 */
        border-radius: 20px; /* 设置按钮的圆角 */
      }
    }
  }


}
</style>
