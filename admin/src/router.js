import Vue from "vue"
import Router from "vue-router"
import Login from "./views/login.vue"
import Admin from "./views/admin"

Vue.use(Router);

const routes = [
    { path: '*', redirect:'/login'  },
    { path: '/login', component: Login },
    { path: '/admin', component: Admin },

]

const router = new Router({
    mode:"history",
    routes // (缩写) 相当于 routes: routes
})

export default router