import React, { Component } from 'react'
import {
  SafeAreaView,
  View,
  FlatList,
  StatusBar,
  Text,
  Platform
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { NavBar } from '@mcrn/maple'
import { history } from '@mcrn/bridge'
import Tracer from '@/analytics/index'
import OrderPackageItem from '../orderPackage'
import SSUInforItem from '../orderSSUInforItem'
import GiftItem from '../orderGiftItem'
import styles from './index.styles'

// 商品清单
class CommodityList extends Component {
  constructor (props) {
    super(props)
    // params是上个页面的传入的参数
    const { params } = props
    this.state = {
      skuList: params.sku || '',
      giftList: params.gift || '',
      deliveryName: params.deliveryMsg || '',
      shopName: params.shopName || ''
    }
  }

  // 埋点参数
	_statisParams = { 
		refer_id: this.props.params.referId || '',
		session_id: this.props.params.sessionId || '',
		referrer: this.props.params.referrer || '',
	} || {}

  componentDidMount () {
    Tracer.setCurrentPage(this._statisParams)
		Tracer.page('CommodityList')
		this.setStatusBar()
	}

  setStatusBar = () => {
		StatusBar.setBackgroundColor('#ffffff')
		StatusBar.setTranslucent(false)
		StatusBar.setBarStyle('dark-content')
	}

  renderItem = (item, index) => {
    // console.warn(item.img)
    // console.log("index =",index)

    // emptyContent = giftList.map((obj) => {
    //   return (
    //     <GiftItem />
    //   )
    let giftContent = null
    if (index === this.state.skuList.length - 1 && this.state.giftList.length > 0) {
      // emptyContent = <GiftItem />
      giftContent = this.state.giftList.map((obj) => {
        return (
          <GiftItem key={obj.ssu_id} data={obj} style={styles.OrderPackageItem} />
        )
      })
    }

    return (
      <View style={styles.orderContainer}>
        <View style={styles.item}>
          <FastImage
            defaultSource={require('../../../assets/images/img_meicai.png')}
            resizeMode='cover'
            source={{ uri: item.img }}
            style={styles.goodImage}
          />
          <View style={styles.itemRightContent}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text numberOfLines={1} style={styles.goodNameText}>{item.name}</Text>
              <View style={styles.iconImageText}>
                <FastImage
                  source={require('../../../assets/images/order_detail_icon_ding.png')}
                  resizeMode='cover'
                  style={{ width: 12, height: 12 }}
                />
                <Text style={{ color: '#9F9F9F', fontSize: 12, left: 3 }}>{item.order_num_amount_str}</Text>
              </View>
            </View>
            {/* OrderSSUView 多包规对应的商品规格及价格 */}
            {item.ssu.map((obj) => {
              return (
                <SSUInforItem
                   key={obj.ssu_id}
                   data={obj}
                   style={styles.orderSSUView}
                />
              )
              // return <Text key={obj.ssu_id} style={styles.orderSSUText}>{`¥${obj.unit_price}/${obj.format}x${obj.num}`}</Text>
            })}
          </View>
        </View>

        {/* 包装物 */}
        {item.package.map((obj) => {
          return (
            <OrderPackageItem
              key={obj.name}
              data={obj}
              style={styles.OrderPackageItem}
            />
          )
        })}
        {/* 满赠 */}
        {giftContent}
        <View style={{
          paddingBottom: 1, flexDirection: 'row', alignItems: 'stretch', height: 1, backgroundColor: '#F5F5F5'
        }}
        >
        </View>
      </View>
    )
  };

  // 创建头部布局
  createListHeader = (count) => {
    return (
      <View>
        <View style={styles.listHeader}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{
              width: 3,
              height: 16,
              backgroundColor: '#15BB5C',
              borderRadius: 1.5
            }}
            ></View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.shopName}>{this.state.shopName}</Text>
              <Text style={styles.deliveryName}>{this.state.deliveryName}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 12 }}>
            <Text style={{ fontSize: 12, color: '#8C8C8C' }}>{`共${count}类商品`}</Text>
          </View>
        </View>

        <View style={{
          paddingBottom: 1, flexDirection: 'row', alignItems: 'stretch', height: 1, backgroundColor: '#F5F5F5'
        }}
        >
        </View>
      </View>
    )
  }

  render () {
    const count = this.state.skuList.length + this.state.giftList.length
    return (
      <SafeAreaView style={styles.container} marginTop={Platform.OS === 'ios' ? StatusBar.currentHeight || 0 : 0}>
        <NavBar
          leftArrow
          title='商品清单'
          onPressLeft={() => {
            history.goBack()
          }}
        />
        <View style={{ flex: 1, backgroundColor: '#F6F6F6' }}>
        <View style={{ height: 4, backgroundColor: '#F5F5F5' }}></View>
        {this.createListHeader(count)}
        <FlatList
          data={this.state.skuList}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          keyExtractor={(item, index) => String(index)}
        />
        </View>
      </SafeAreaView>
    )
  }
}

export default CommodityList
