import Vue from 'vue'
import Router from 'vue-router'
import index from "@/home/index"
import fabu from "@/home/fabu"
import login from "@/home/login"
import register from "@/home/register"
import article from "@/home/article"
import articlelist from "@/home/articlelist"
import search from "@/home/search"
import about from "@/home/about"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index
    },
    {
      path: '/fabu',
      component: fabu
    },{
      path: '/login',
      component: login
    },{
      path: '/register',
      component: register
    },
    {
      path: '/article',
      component: article
    },
    {
      path: '/articlelist',
      component: articlelist
    },{
      path: '/search',
      component: search
    },{
      path: '/about',
      component: about
    },
  ]
})
