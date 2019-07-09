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
          <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
            <el-form-item label="图片类型">
              <el-select v-model="sizeForm.typeName" placeholder="请选择图片类型">
                <el-option v-for="item in typeData" :key="item.id" :label="item.imageType" :value="item.imageType"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否轮播">
              <el-radio-group v-model="sizeForm.isLunbo" size="medium">
                <el-radio border label="1">是</el-radio>
                <el-radio border label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="上传图片">
              <input type="file" ref="file">
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="uploadImg">提交</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import utils from '@/utils/index.js'
import leftMenu from '@/components/leftMenu'
import Header from '@/components/header'
let host = utils.serverHost()
export default {
  name: 'uploadImg',
  data () {
    return {
      msg: 'Welcome to uploadImg',
      imgUrl: '',
      uploadUrl: host + 'server/uploadImg',
      sizeForm: {
        typeName: '',
        isLunbo: ''
      },
      typeData: []
    }
  },
  methods: {
    uploadImg () {
      var file = this.$refs.file.files[0]
      // 因为准备用post提交，又因为图片的内容比较大，所以我们选择使用formdata来承载数据
      // 创建formdata对象
      var formData = new FormData()
      // 给formdata对象中放入数据(键值对的方式)
      formData.append('file', file)
      formData.append('typeName', this.sizeForm.typeName)
      formData.append('isLunbo', this.sizeForm.isLunbo)
      if (!formData.get('typeName') || !formData.get('file') || !formData.get('isLunbo')) {
        alert('请填写所有选项')
        return false
      }
      this.axios.post(host + 'server/uploadImg', formData).then((ret) => {
        // this.newsList=response.data.data;
        var data = ret.data || {}
        var retCode = data.ret
        if (retCode === 0) {
          alert('图片提交成功')
          this.imgUrl = host + data.url
        } else if (retCode === 6000) {
          alert(data.msg)
        }
      }).catch((err) => {
        console.log(err)
        alert('服务器内部错误')
      })
    },
    getTypes () {
      this.axios.get(host + 'server/getTypes').then((ret) => {
        // this.newsList=response.data.data;
        var data = ret.data || {}
        var retCode = data.ret
        if (retCode === 0) {
          this.typeData = data.data
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
    this.getTypes()
  },
  components: {
    LeftMenu: leftMenu,
    Header: Header
  }
}
</script>

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
