import Vue from 'vue'
import Router from 'vue-router'
import PhotoList from '@/components/photoList'
import Login from '@/components/login'
import Regist from '@/components/regist'
import UploadImg from '@/components/uploadImg'
import ImgType from '@/components/imgType'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'PhotoList',
        component: PhotoList
      }
    },
    {
      path: '/photoList',
      name: 'PhotoList',
      component: PhotoList
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/regist',
      name: 'Regist',
      component: Regist
    },
    {
      path: '/uploadImg',
      name: 'UploadImg',
      component: UploadImg
    },
    {
      path: '/imgType',
      name: 'ImgType',
      component: ImgType
    }
  ]
})
