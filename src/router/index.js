import Vue from 'vue'
import Router from 'vue-router'
// 导入刚才编写的组件
import Login from '@/components/initPage/Login'
import Signup from '@/components/initPage/Signup'
import Modifypw from '../components/initPage/Modifypw'
import UpdateInfo from '../components/initPage/UpdateInfo'
import Chat from '../components/chatPage/Chat'
import Verify from '../components/initPage/Verify'
import Logout from '../components/initPage/Logout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // 下面都是固定的写法
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }

  ]
})


