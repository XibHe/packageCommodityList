
const subPackagesWeapp = require('./subPackages.weapp')

/**
 * 账户
 */
const packageAccount = [
  'pages/entrance/authLogin/index',
  'pages/entrance/phoneLogin/index',
  'pages/company/select/index',
  'pages/finance/balance/index',
  'pages/finance/wallet/index',
  'pages/finance/repayment/index',
  'pages/finance/repayDetail/index'
]

/**
 * 商品
 */
const packageProducts = [
  'pages/detail/comboList/index',
  'pages/detail/comments/index',
  'pages/search/index',
  'pages/detail/index/index'
]

/**
 * 活动
 */
const packageActivity = [
  'pages/activityRule/index',
  'pages/cartAddOnItems/index'
]

/**
 * 交易
 */
const packageTrade = [
  'pages/tally/index/index',
  'pages/tally/preTally/index',
  'pages/tally/selectAddress/index',
  'pages/tally/selectCoupon/index',
  'pages/tally/goodList/index',
  'pages/tally/success/index',
  'pages/tally/couponGoodsLists/index',
  'pages/tally/orderRemark/index',
  'pages/order/detail/index',
  'pages/order/refundDetail/index',
  'pages/order/list/index',
  'pages/order/orderTrace/index',
  'pages/order/expressList/index',
  'pages/order/confirmBill/index',
  'pages/afterSale/billInstructions/index'
]

/**
 * 用户相关
 */
const packageUser = [
  'pages/setting/index',
  'pages/env/index',
  'pages/mineCoupon/index',
  'pages/newIM/index',
  'pages/about/index'
]

const subPackages = [
  {
    name: 'account',
    root: 'packageAccount',
    pages: process.env.TARO_ENV === 'weapp'
      ? [
        ...packageAccount,
        ...subPackagesWeapp.packageAccountWeapp
      ] : packageAccount
  },
  {
    name: 'products',
    root: 'packageProducts',
    pages: process.env.TARO_ENV === 'weapp'
      ? [
        ...packageProducts,
        ...subPackagesWeapp.packageProductsWeapp
      ] : packageProducts
  },
  {
    name: 'activity',
    root: 'packageActivity',
    pages: process.env.TARO_ENV === 'weapp'
      ? [
        ...packageActivity,
        ...subPackagesWeapp.packageActivityWeapp
      ] : packageActivity
  },
  {
    name: 'trade',
    root: 'packageTrade',
    pages: process.env.TARO_ENV === 'weapp'
      ? [
        ...packageTrade,
        ...subPackagesWeapp.packageTradeWeapp
      ] : packageTrade
  },
  {
    name: 'user',
    root: 'packageUser',
    pages: process.env.TARO_ENV === 'weapp'
      ? [
        ...packageUser,
        ...subPackagesWeapp.packageUserWeapp
      ] : packageUser
  }
]

module.exports = subPackages
