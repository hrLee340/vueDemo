import request from './request' // 引入封装得axios

// 获取新闻列表
export function getProductHistoryList (params) {
  return request({
    url: '/user',
    method: 'GET',
    params
  })
}
