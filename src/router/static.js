import Static from '../views/Static.vue'

const staticRouter =  {
  path:'/static',
  name: 'static',
  title: '静态数据',
  component : Static,
  meta: {title: '静态数据', icon: 'Grid'}
}

export default staticRouter