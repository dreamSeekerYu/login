<template>
  <div id="app">
    <ucarheader></ucarheader>
    <div id="nav">
      <router-link to="/pullnew/home">pullnew</router-link>|
      <router-link to="/cash/home">cash</router-link>
    </div>
    <router-view />
    <p>
      <input type="text" ref="username" v-model="username" />
    </p>
    <p>{{ username }}</p>
    <p>
      <input type="text" ref="password" v-model="password" />
    </p>
    <p>{{ password }}</p>
    <p>
      <button @click="login">登录</button>
    </p>
    {{ logindata }}
  </div>
</template>

<script>
// import Mock from '@/mock'
import Mock from '@/mock'

import Vconsole from 'vconsole'
// import loginrequest from "@/api/login"
import axios from 'axios'

import ucarheader from '@/components/header.vue'
new Vconsole()
Mock
export default {
  data() {
    return {
      username: '18810493057',
      password: 'bai',
      logindata: null
    }
  },
  components: {
    ucarheader
  },
  methods: {
    login() {
      const query = { username: this.username, password: this.password }
      alert(JSON.stringify(query))
      axios.get('/action/user/getVerifyCode', query).then(({ data }) => {
        // alert(JSON.stringify(data));
        this.logindata = data
        if (data.code === 0) {
          // const redirect = "http://10.101.194.116:8081/";
          // const upManageUrlr =
          // "http://10.101.194.116:9001/#/account?" + redirect;
          // location.assign(upManageUrlr);
        }
      })
    }
  },
  mounted() {
    // console.log(00)
  }
}
</script>
