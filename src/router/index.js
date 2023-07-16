import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppLayout from '../layout/AppLayout.vue';
import productRouter from './product';
import staticRouter from './static';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children:[
        {
          path: '/',
          name: 'base',
          title: '首页',
          component: HomeView,
          meta: {title: '静态数据', icon: 'HomeFilled'}
        },
        staticRouter,
        productRouter
      ]
    }
  ]
})

export default router
