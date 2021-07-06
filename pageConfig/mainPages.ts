
const mainPagesWeapp = require('./mainPages.weapp.js')

const pages = [
  // tab页
  'pages/home/index/index',
  'pages/allGoods/index',
  'pages/purchase/index',
  'pages/cart/shopCart/index',
  'pages/mine/index',
  // 其他主包页
  'pages/cart/subCart/index',
  'pages/goods/detail/index',
  'pages/order/detail/index', // 目前是redirect页，下期删除
  'pages/common/webView/index',
]

module.exports = process.env.TARO_ENV === 'weapp'
? [...pages, ...mainPagesWeapp]
: pages
