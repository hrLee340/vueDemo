<template>
  <el-col class="table-box">
    <!--query 查询-->
    <div class="query-box">
      <el-col :span="8">
        <el-input v-model="queryInput" placeholder="请输入姓名搜索" />
      </el-col>
    </div>
    <div class="toolbar">
      <el-button type="primary" @click="handleAdd">增加</el-button>
      <el-button type="danger" @click="handleListDel" v-if="multipleSelection.length > 0">删除</el-button>
    </div>
    <!--table 表格-->
    <el-table :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange"
      ref="multipleTableRef">
      <el-table-column type="selection" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="email" label="邮件" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="state" label="状态" />
      <el-table-column prop="address" label="地址" />
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button link type="danger" size="small" @click="handleRowDel(scope.row.id)">删除</el-button>
          <el-button type="danger" size="small" @click="handleRowDetail(scope.row.id)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-block">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[1, 10, 20, 30]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!--dialog 弹窗-->
    <el-dialog v-model="dialogFormVisible" :title="dialogType === 'add' ? '新增' : '编辑'">
      <el-form :model="tableForm" label-width="auto">
        <el-form-item label="姓名">
          <el-input v-model="tableForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="tableForm.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="tableForm.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="tableForm.state" autocomplete="off" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="tableForm.address" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogConfirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </el-col>
</template>

<script setup>
import { ref, watch } from 'vue'
import { onMounted, reactive, toRefs } from 'vue'
import router from '../router'
import { getProductHistoryList } from '../api/product'

//数据
const queryInput = ref("")
let tableData = ref([])
let currentPage=ref(1)
let pageSize=ref(10)
let total=ref(0)
let tableDataCopy = tableData.value
const multipleSelection = ref([]);//多选
const dialogFormVisible = ref(false);//是否打开
const formLabelWidth = "80px";//弹出框 标题长度
const tableForm = ref({})
const dialogType = ref("add")

const getNewsList = () => {
  const params = {
    pageNum: currentPage.value,
    pageSize: pageSize.value
  }
  getProductHistoryList(params).then(res => {
    console.log(res)
    const { data, code, total_num} = res
    if (code === 200) {
      tableData.value = data
      total.value = total_num
    }
  })
}
onMounted(getNewsList)

//监控数据
watch(queryInput, (val) => {
  if (val.length > 0) {
    tableData.value = tableData.value.filter(item => item.name.toLowerCase().match(val.toLowerCase()));
  } else {
    tableData.value = tableDataCopy;
  } 
})
//handleSizeChange
const handleSizeChange = (val) => {
  pageSize.value = val
  getNewsList()
}
//handleCurrentChange
const handleCurrentChange = (val) => {
  currentPage.value = val
  getNewsList()
}
//选择事件
const handleSelectionChange = (val) => {
  multipleSelection.value = [];
  val.forEach(item => {
    multipleSelection.value.push(item.id)
  });
}
//添加按钮
const handleAdd = (val) => {
  tableForm.value = {}
  dialogType.value = "add"
  dialogFormVisible.value = true
}
//编辑按钮
const handleEdit = (val) => {
  tableForm.value = val
  dialogType.value = "edit"
  dialogFormVisible.value = true
}
//删除一条按钮
const handleRowDel = (id) => {
  console.log(id)
  let index = tableData.value.findIndex(item => item.id === id)
  tableData.value.splice(index, 1)
}
//handleRowDetail
const handleRowDetail = (id) => {
  router.push({
    name: "detail",
    params: {
      id: id,
    }
  })
}
//删除多条
const handleListDel = () => {
  multipleSelection.value.forEach(id => {
    handleRowDel(id)
  })
  multipleSelection.value = [];
}
//确认按钮
const dialogConfirm = () => {
  if (dialogType.value === 'add') {
    tableData.value.push({
      id: tableData.value.length + 1,
      ...tableForm.value
    })
  } else {
    let index = tableData.value.findIndex(item => item.id === tableForm.id);
    tableData[index] = tableForm
  }
  dialogFormVisible.value = false
}
</script>

<style>
.table-box {
  margin: 0 auto;
}
.toolbar {
  margin-bottom: 8px;
}
.pagination-block {
  margin-top: 8px;
}
.title {
  text-align: center;
}

.query-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
