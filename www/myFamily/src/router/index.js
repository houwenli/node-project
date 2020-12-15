import Vue from 'vue'
import Router from 'vue-router'
import familyIndex from '@/pages/familyIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'familyIndex',
      component: familyIndex
    }
  ]
})
