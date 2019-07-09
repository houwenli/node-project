<template>
  <div>
    <span>{{msg}}</span>
    <div>
      <span>用户名：</span><input type="text" v-model="name" placeholder="请填写用户名"/>
    </div>
    <div>
      <span>密码：</span><input type="password" v-model="password" placeholder="请填写密码"/>
    </div>
    <div>
      <span @click="login">登陆</span><span><router-link to="/regist">注册</router-link></span>
    </div>
  </div>
</template>

<script>
import utils from '@/utils/index.js'
let host = utils.serverHost()
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to login',
      name: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.axios.get(host + 'server/login', {
        params: {
          username: this.name,
          password: this.password
        }
      }).then((ret) => {
        // this.newsList=response.data.data;
        var data = ret.data || {}
        var retCode = data.ret
        if (retCode === 0) {
          alert('登陆成功')
        } else if (retCode === 3000) {
          alert('账号或则密码错误，请稍后重试！')
        } else if (retCode === 1000) {
          alert('参数错误')
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

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
