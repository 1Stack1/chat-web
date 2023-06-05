import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginPage.vue")
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("../views/ChatPage.vue"),
    meta:{
      requireAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
      if (to.meta.requireAuth) {
        if(to.query.userId != undefined){
          next()
        }else{
          next({path: '/login'})
        }
      } else {
        next()
      }
    }
)
export default router
