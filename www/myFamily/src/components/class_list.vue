<template>
  <div class="img-list-pannel">
    <div class="tab-pannel">
      <div v-for="(item, index) in tabArr"
      v-bind:key="index"
      class="every-tab"
      :class="{ 'tab-select' : index == 0 }">
        {{item.tabName}}
      </div>
    </div>
    <div class="class-list">
      <div class="every-class"
      v-for="(item, index) in classListData"
      v-bind:key="index"
      @click="changePage(item.type)">
        <img :src="item.imgSrc">
        <p class="type-name">{{item.type}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '@/utils/index.js'
let host = utils.serverHost()
export default {
  name: 'familyIndex',
  data () {
    return {
      tabIndex: 0,
      tabArr: [
        {
          tabName: '所有图片'
        }
      ],
      classListData: [

      ]
    }
  },
  methods: {
    getTypeList () {
      this.axios.get(host + 'web/getTypesImg').then((ret) => {
        // this.newsList=response.data.data;
        var data = ret.data || {}
        var retCode = data.ret
        if (retCode === 0) {
          let listData = data.data || []
          listData.forEach(item => {
            item.imgSrc = host + item.path
          })
          this.classListData = listData
        } else {
          alert('服务器内部错误')
        }
      }).catch((err) => {
        console.log(err)
        alert('服务器内部错误')
      })
    },
    changePage (typeName) {
      let data = {
        page: 'detail',
        typeName
      }
      this.$emit('changePage', data)
    }
  },
  created () {
    this.getTypeList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tab-pannel {
    margin: 50px 0 28px;
    display: flex;
    justify-content: center;
  }
  .tab-pannel .every-tab {
    display: inline-block;
    text-align: center;
    height: 40px;
    line-height: 33px;
    width: 102px;
    cursor: pointer;
    font-size: 18px;
    font-weight: 300;
    letter-spacing: 0.57px;
    color: rgba(109, 109, 109, 0.61);
    transition: 0.2s all ease-in-out;
  }
  .tab-pannel .every-tab::after {
    content: '';
    display: block;
    width: 18px;
    height: 4px;
    margin: 3px auto 0;
    border-radius: 2px;
    background-image: linear-gradient(to left, #f58365, #ff188a);
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    transition: 0.2s all ease-in-out;
  }
  .tab-pannel .tab-select {
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 0.77px;
    color: #222222;
  }
  .tab-pannel .tab-select::after {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
  .class-list {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
  }
  .every-class {
    height: 180px;
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    margin: 10px;
  }
  .every-class img {
    height: 100%;
  }
  .every-class p {
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
