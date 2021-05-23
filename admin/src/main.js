
import Vue from 'vue'
//import App from './views/login'
import App from './App'
//import VueRouter from 'vue-router'

//import Login from './views/login'
import router from './router';

Vue.config.productionTip = false
//Vue.use(VueRouter)

 // const routes = [
 //     { path: '*', redirect:'/login'  },
 //   { path: '/login', component: Login },
 //
 // ]
 //
 // const router = new VueRouter({
 //       mode:"history",
 //       routes // (缩写) 相当于 routes: routes
 //   })

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
