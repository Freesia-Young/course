import Vue from "vue"
import Router from "vue-router"
import Login from "./views/login.vue"
import Admin from "./views/admin"
import Welcome from "./views/admin/welcome"

Vue.use(Router);

const routes = [
    { path: '*', redirect:'/login'  },
    { path: '/login', component: Login},
    {
        path: '/admin',
        component: Admin,
        children:[{
            path: 'welcome',
            component:Welcome
        }]
    },

]

const router = new Router({
    mode:"hash",
    //base: process.env.BASE_URL,
    routes // (缩写) 相当于 routes: routes
})

export default router