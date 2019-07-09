<template>
    <el-container>
      <el-aside width="200px">
        <LeftMenu></LeftMenu>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <el-table
            :data="photoList"
            stripe
            style="width: 100%"
            >
            <el-table-column
              prop="id"
              label="ID"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              label="图片"
              width="180"
              align="center">
              <template slot-scope="scope">
                <img :src="scope.row.imgSrc"  min-width="70" height="70" />
              </template>
            </el-table-column>
            <el-table-column
              prop="type"
              label="图片类型"
              align="center">
            </el-table-column>
            <el-table-column
              prop="isrecStr"
              label="是否轮播"
              align="center">
            </el-table-column>
            <el-table-column
              prop="timeStr"
              label="上传时间"
              align="center">
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    height: 100vh;
    text-align: left;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /* line-height: 160px; */
  }
  body > .el-container {
    margin-bottom: 40px;
  }
</style>

<script>
import utils from '@/utils/index.js'
import leftMenu from '@/components/leftMenu'
import Header from '@/components/header'
let host = utils.serverHost()

Date.prototype.Format = function (formatStr) {
  var str = formatStr
  var Week = ['日', '一', '二', '三', '四', '五', '六']
  str = str.replace(/yyyy|YYYY/, this.getFullYear())
  str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100))
  str = str.replace(/MM/, this.getMonth() > 9 ? this.getMonth().toString() : '0' + this.getMonth())
  str = str.replace(/M/g, this.getMonth())
  str = str.replace(/w|W/g, Week[this.getDay()])
  str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate())
  str = str.replace(/d|D/g, this.getDate())
  str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours())
  str = str.replace(/h|H/g, this.getHours())
  str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes())
  str = str.replace(/m/g, this.getMinutes())
  str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds())
  str = str.replace(/s|S/g, this.getSeconds())
  return str
}
export default {
  name: 'photoList',
  data () {
    return {
      photoList: []
    }
  },
  methods: {
    getPhotoList () {
      this.axios.get(host + 'server/photoList').then((ret) => {
        // this.newsList=response.data.data;
        var data = ret.data || {}
        var retCode = data.ret
        if (retCode === 0) {
          let photoListArr = data.data
          photoListArr.forEach(item => {
            // 重新组装数组
            item.imgSrc = host + item.path
            if (item.isrec === '1' || item.isrec === 1) {
              item.isrecStr = '是'
            } else {
              item.isrecStr = '否'
            }
            item.timeStr = new Date(item.time * 1000).Format('yyyy MM-DD')
          })
          this.photoList = photoListArr
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
    this.getPhotoList()
  },
  components: {
    LeftMenu: leftMenu,
    Header: Header
  }
}
</script>
