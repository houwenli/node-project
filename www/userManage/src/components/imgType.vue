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
          <el-form ref="form" label-width="100px">
            <el-form-item label="类型名称">
              <el-input v-model="typeName"></el-input>
            </el-form-item>
            <el-form-item label="类型描述">
                <el-input v-model="typeDesc"></el-input>
              </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addType">立即创建</el-button>
            </el-form-item>
          </el-form>
          <el-table
            :data="tableData"
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
              prop="imageType"
              label="类型名称"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="typeDesc"
              label="类型描述"
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
  .el-form {
    margin-top: 40px;
  }
</style>

<script>
import utils from '@/utils/index.js'
import leftMenu from '@/components/leftMenu'
import Header from '@/components/header'
let host = utils.serverHost()
export default {
  name: 'imgType',
  data () {
    return {
      msg: 'Welcome to uploadImg',
      imgUrl: '',
      typeName: '',
      typeDesc: '',
      tableData: []
    }
  },
  methods: {
    addType () {
      if (!this.typeName || !this.typeDesc) {
        alert('必须填写图片类型和类型描述')
        return false
      }
      this.axios.get(host + 'server/addImgType', {
        params: {
          typename: this.typeName,
          typedesc: this.typeDesc
        }
      }).then((ret) => {
        // this.newsList=response.data.data;
        var data = ret.data || {}
        var retCode = data.ret
        if (retCode === 0) {
          alert('类型添加成功')
          this.getTypes()
        } else if (retCode === 1000) {
          alert('参数错误')
        } else if (retCode === 7000) {
          alert('已被存在此图片类型')
        } else {
          alert('服务器内部错误')
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
          this.tableData = data.data
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
