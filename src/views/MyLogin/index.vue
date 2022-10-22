<template>
  <div id="out-login">
    <div class="Login">
      <div class="title">
        <h1>Login</h1>
      </div>
      <div class="form">
        <input
          v-model="loginForm.phone"
          type="text"
          placeholder="phone"
        >
        <input
          v-model="loginForm.password"
          type="password"
          placeholder="password"
        >
        <input v-model="loginForm.code" type="text">

      </div>
      <div class="getcode">
        <img :src="CodeUrl" @click="getimgcode()">
        <div style="font-size:13px;color:	#CD6600; margin-left:4px; font-family:'宋体'">点击更新验证码</div>
      </div>
      <div class="button">
        <button @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getRandom } from '@/utils/random'
export default {
  name: 'MyLogin',
  data() {
    return {
      loginForm: {
        phone: '',
        password: '',
        code: '', // 验证码
        uuid: ''
      },

      loading: false,
      // passwordType: "password",
      redirect: undefined
    }
  },
  beforeMount() {
    // 获取uuid
    this.loginForm.uuid = getRandom()
    // 获取图形验证码
    this.getimgcode()
  },
  computed: {
    ...mapState({
      CodeUrl(state) {
        return state.code.codeurl
      }
    })
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    // 登录
    async login() {
      try {
        {
          await this.$store.dispatch('user/Login', this.loginForm)
          this.$router.push({ path: this.redirect || '/' })
          this.loading = true
          this.$message(
            {
              message: '恭喜你,登录成功',
              type: 'success'
            }
          )
        }
      } catch (error) {
        this.loading = false
      }
    },
    // 获取图形验证码并且刷新
    getimgcode() {
      this.loginForm.uuid = getRandom()
      this.$store.dispatch('code/GetImgCode', this.loginForm.uuid)
    }
  }
}
</script>

<style lang="less" scoped>
#out-login {
  width: 100vw;
  height: 100vh;
  background-image: url(~@/assets/images/background.png);
  background-size: cover;
  background-position-y: -130px;
  position: relative;
  .Login {
    background-color: rgba(255, 255, 255, 0.265);
    border-radius: 10px;
    position: absolute;
    width: 300px;
    height: 400px;
    right: 250px;
    top: 100px;
    .title {
      width: 100px;
      height: 50px;
      margin: 0 auto;
      color: rgba(0, 0, 0, 0.768);
    }
    .form {
      width: 100%;
      height: 110px;
      margin-top: 40px;
      input {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.754);
        outline: none;
        border: none;
        background: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.452);
        margin-left: 25px;
        width: 80%;
        height: 35px;
        margin-bottom: 10px;
        &:last-child{
          width:35%;
        }
        &::placeholder {
          font-size: 13px;
          color: grey;
          font-family: '楷体';
        }
      }
    }
    //获取验证码的按钮
    .getcode{
      width:100px;
      font-size: 14px;
      position: relative;
      left:160px;
      top:-25px;
      img{
        width:100%;
        height:100%;
        cursor: pointer;
      }
    }
    .button {
      width: 90%;
      height: 30px;
      margin-left: 5%;
      margin-top:40px;
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.651);
        border: none;
        cursor: pointer;
        border-radius: 7px;
        &:hover{
          background-color: #fff;
        }
      }

    }
  }
}
</style>
