import React, { Component } from 'react'
import { View, Text } from 'react-native'
import SkuHeader from '@/components/GoodsInfo/BaseGoods/SkuHeader'
import SkuInfo from '@/components/GoodsInfo/BaseGoods/SkuInfo'
import SsuInfo from '@/components/GoodsInfo/BaseGoods/SsuInfo'
import UIImage from '@/components/UIImage'
import styles from './index.styles'

export default class DishSKUItem extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isShowSSUList: false // 展开或者收起
        }
    }

    /**
     * 加购
     */
    addGoodsCount = () => {
        const { skuInfo, onAddCart } = this.props
        onAddCart && onAddCart(skuInfo.sku_id, true)
    }

    /**
     * 减购
     */
    subtractGoodsCount = () => {
        const { skuInfo, onAddCart } = this.props
        onAddCart && onAddCart(skuInfo.sku_id, false)
    }

    /**
   * 点击收起或者展开更过规格按钮
   */
    bindOpenSsuList = () => {
        const { isShowSSUList } = this.state
        this.setState({
            isShowSSUList: !isShowSSUList
        })
    }

    render () {
        const { skuInfo, isUpdateCount } = this.props
        const { isShowSSUList } = this.state
        // console.log('sku --- skuInfo = ', skuInfo)
        return (
            <View style={styles.container}>
                {/* 商品图片 */}
                <UIImage
                    wrapperStyle={styles.goodsImage}
                    uri={skuInfo?.img_url}
                    showMask={skuInfo?.expect_arrived_remind || false}
                >
                    <View style={styles.maskContentStyle}>
                        <Text style={styles.maskTextStyle}>{skuInfo?.expect_arrived_remind || ''}</Text>
                    </View>
                </UIImage>
                {/* 右侧商品信息 */}
                <View style={styles.goodsInfoView}>
                    {/* sku 头部信息 (商品名称、规格、属性、核心属性等) */}
                    <SkuHeader
                        skuInfo={skuInfo}
                    />
                    {/* ssu 信息 */}
                    <SkuInfo
                        skuInfo={skuInfo}
                        onOpenSsuList={this.bindOpenSsuList}
                        isOpenSsu={isShowSSUList}
                    />
                    {/* 展开 ssuList */}
                    {skuInfo?.ssu_list?.length > 0 && isShowSSUList && (
                        skuInfo.ssu_list.map((item) => {
                            return (
                                <SsuInfo
                                    key={item.ssu_id}
                                    skuInfo={skuInfo}
                                    ssuInfo={item}
                                    isUpdateCount={isUpdateCount}
                                    addClick={this.addGoodsCount.bind(this)}
                                    subClick={this.subtractGoodsCount.bind(this)}
                                    ssuInfoStyle={styles.ssuItemWrapper}
                                />
                            )
                        })
                    )}
                </View>
            </View>
        )
    }
}
