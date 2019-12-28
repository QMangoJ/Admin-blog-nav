<template>
  <div class="front">
    <div class="selectType">
      <el-radio-group v-model="navTypeId" @change="change">
        <el-radio-button :label="-1">全部</el-radio-button>
        <el-radio-button
          v-for="(item,index) in typeList"
          :key="index"
          :label="item.navTypeId"
        >{{item.navTypeName}}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="list">
      <a :href="item.navUrl" target="_blank" class="item" v-for="(item,index) in list" :key="index">
        <div class="img">
          <img :src="item.imgUrl" />
        </div>
        <div class="text">
          <p class="title">{{item.navName}}</p>
        </div>
      </a>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      typeList: [],
      navTypeId: -1,
    };
  },
  methods: {
    change() {
      this.getData();
    },
    getData() {
      this.$axios({
        method: 'get',
        url: '/navList',
        params: {
          navTypeId: this.navTypeId,
        },
      }).then(({ data }) => {
        this.list = data.data;
      });
    },
  },
  mounted() {
    this.getData();
    this.$axios.get('/navTypeList').then((res1) => {
      this.typeList = res1.data.data;
    });
  },
};
</script>

<style lang="scss" scoped>
.front {
  width: 100%;
  height: 100%;
  .selectType {
    width: 100%;
    padding: 20px 40px 0;
  }
  .list {
    width: 100%;
    padding: 20px 40px 40px;
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(auto-fill, 240px);
    grid-gap: 10px;
    .item {
      position: relative;
      display: inline-block;
      width: 240px;
      margin-bottom: 10px;
      margin-top: 20px;
      border-radius: 10px;
      border: 1px solid #424242;
      overflow: hidden;
      transition: all 0.5s ease;
      background-color: #fff;
      .img {
        height: 100%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          transition: all 1s ease-in-out;
          object-fit: contain;
        }
      }
      .text {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        background-image: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0) 40%,
          rgba(0, 0, 0, 1) 170%
        );
        padding: 10px 20px 0;
        .title {
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          color: #ffffff;
          font-size: 18px;
        }
      }
      &:hover {
        transform: translateY(-6px);
        box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.5);
        img {
          transform: scale(1.2);
        }
        p {
          color: #73b0ff;
        }
      }
    }
  }
}
</style>
