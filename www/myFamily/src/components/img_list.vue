<template>
  <div>
    <div class="img-list">
      <div class="every-img"
      v-for="(item, index) in imgListData"
      v-bind:key="index"
      >
        <img :src="item.imgSrc">
        <p class="img-desc">{{item.type}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '@/utils/index.js'
let host = utils.serverHost()
export default {
  name: 'familyTypeList',
  data () {
    return {
      imgListData: [

      ]
    }
  },
  props: {
    typeName: {
      type: String,
      default: ''
    }
  },
  methods: {
    getImgList () {
      this.axios.get(host + `web/getImgList?type=${this.typeName}`).then((ret) => {
        // this.newsList=response.data.data;
        var data = ret.data || {}
        var retCode = data.ret
        if (retCode === 0) {
          let listData = data.data || []
          listData.forEach(item => {
            item.imgSrc = host + item.path
          })
          this.imgListData = listData
        } else {
          alert('服务器内部错误')
        }
      }).catch((err) => {
        console.log(err)
        alert('服务器内部错误')
      })
    }
  },
  created () {
    this.getImgList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .img-list {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
  }
  .every-img {
    height: 180px;
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    margin: 10px;
  }
  .every-img img {
    height: 100%;
  }
  .every-img p {
    position: absolute;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: rgba(0, 0, 0, .4);
    bottom: 0;
    left: 0;
    font-size: 18px;
    color: #fff;
  }
</style>
