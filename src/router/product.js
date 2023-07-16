import ProductHistory from '../views/ProductHistory.vue'
import { RouterView } from 'vue-router'


const productRouter =  {
  path:'/product',
  name: 'product',
  title: '项目管理',
  component : RouterView,
  meta: {title: '静态数据', icon: 'Management'},
  children: [
    {
      path:'detail',
      name: 'detail',
      title: '项目管理',
      component : () => import('../views/product.vue')
    },
    {
      path:'history',
      name: 'history',
      title: '历史版本',
      component : () => import('../views/ProductHistory.vue')
    }
  ]
}
export default productRouter