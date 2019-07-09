<template>
  <div>
    <img class="admin-img" src="http://jdc.jd.com/img/310">
    <el-menu
      :router=true
      :default-active="routeArr[$route.name]"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>图片管理</span>
        </template>
        <!-- <el-menu-item index="1-1"><router-link to="/photoList">图片列表</router-link></el-menu-item>
        <el-menu-item index="1-2"><router-link to="/uploadImg">上传图片</router-link></el-menu-item>
        <el-menu-item index="1-3"><router-link to="/imgType">图片类型管理</router-link></el-menu-item> -->
        <el-menu-item :index="routeArr.PhotoList">图片列表</el-menu-item>
        <el-menu-item :index="routeArr.UploadImg">上传图片</el-menu-item>
        <el-menu-item :index="routeArr.ImgType">图片类型管理</el-menu-item>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'leftMenu',
  props: {
  },
  data () {
    return {
      menuIndex: '1-1',
      routeArr: {
        PhotoList: '/photoList',
        UploadImg: '/uploadImg',
        ImgType: '/imgType'
      }
    }
  },
  methods: {
    gotoRoute (router) {
      let currentRouteObj = this.$router.currentRoute || {}
      let currentRoute = currentRouteObj.name || ''
      this.menuIndex = this.routeArr[currentRoute]
      this.$router.push(router)
    }
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .admin-img {
    width: 100px;
    height: 100px;
    display: block;
    margin: 50px auto;
  }
  .el-menu-item a {
    color: #fff;
  }
  .el-menu-item.is-active a {
    color: rgb(255, 208, 75);
  }
</style>
