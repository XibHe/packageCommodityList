import React, { Component } from 'react'
import { View, Text } from 'react-native'
import SsuInfo from '@/components/GoodsInfo/BaseGoods/SsuInfo'
import UIImage from '@/components/UIImage'
import SkuHeader from '@/components/GoodsInfo/BaseGoods/SkuHeader'
import styles from './index.styles'

export default class DishSSUItem extends Component {
    // constructor (props) {
    //     super(props)
    // }
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

    render () {
        const { skuInfo, ssuInfo, isUpdateCount } = this.props
        // console.log('ssu --- skuInfo = ', skuInfo)
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
                    <SsuInfo
                        skuInfo={skuInfo}
                        ssuInfo={ssuInfo}
                        isUpdateCount={isUpdateCount}
                        addClick={this.addGoodsCount.bind(this)}
                        subClick={this.subtractGoodsCount.bind(this)}
                    />
                </View>
            </View>
        )
    }
}
