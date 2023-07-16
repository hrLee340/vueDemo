<template>
  <el-container class="container">
    <el-aside class="aside" :style="{'width':(isCollapse?'63px':'230px')}">
      <AppMenu :isCollapse="isCollapse"/>
    </el-aside>
    <el-container>
      <el-header class="header">
        <el-row>
          <el-col :span="1">
            <!-- el-icon size:number -->
            <el-button type="text" @click="toggle"><el-icon :size="25"><Fold /></el-icon></el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="main"><router-view/></el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import AppMenu from '@/components/AppMenu.vue';
import {ref} from 'vue'
import {Fold} from '@element-plus/icons-vue';
let isCollapse= ref(false)
const toggle = () =>{
  isCollapse.value = !isCollapse.value
}

</script>
<style scoped lang="scss">
.container{
.aside{
  background-color: #ebf1f5;
  overflow: hidden;
}
.header{
  background:#ebf1f5;
  height:80px;
}
.main{

}
}

</style>