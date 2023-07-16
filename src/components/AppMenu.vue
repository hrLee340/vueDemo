<template>
  <div class="logo"></div>
  <el-menu
    default-active="2"
    :collapse="props.isCollapse"
    :collapse-transition="false"
    background-color="#ebf1f5"
    text-color="#606266"
    active-text-color="#2F74FF"
    class="menu"
    router
  >
    <template v-for="(first,index) in Router.options.routes[0].children">
      <el-sub-menu :index="first.path" v-if="first.children" :key="index" >
        <template  v-if="first.children">
          <el-menu-item-group v-for="(second,sec_index) in first.children"  :key="sec_index"> 
          <!--这个:index需要将上级菜单的路由组合一起-->
              <el-menu-item :index="first.path+'/'+second.path">
                  {{second.title}}
                </el-menu-item>
        </el-menu-item-group>
        </template>
        <template #title>
          <el-icon><component :is="first.meta.icon"/></el-icon>
          <span>{{first.title}}</span>
        </template>
      </el-sub-menu>
      <el-menu-item v-else :index="first.path" :key="'item'+index">
        <el-icon><component :is="first.meta.icon"/></el-icon>  
        <span>{{first.title}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import Router from '../router'
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const props = defineProps(['isCollapse'])
// const handleOpen = (key, keyPath) => {
//   console.log(key, keyPath)
// }
// const handleClose = (key, keyPath) => {
//   console.log(key, keyPath)
// }
console.log("-----Router---->", Router);
</script>

<style>
.logo{
  height:80px;
  background: #e1eaf4;
}
.menu .el-menu-item:hover {
  background-color:#FFFFFF80;
}
.menu .el-menu-item.is-active{
  background-color: #FFFFFF80!important;
  color: #2f74ff !important;
}
</style>