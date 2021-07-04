import React, { Component } from 'react'
import { View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import styles from './index.styles'

export default class OrderPackageItem extends Component {
    // constructor (props) {
    //     super(props)
    // }

    render () {
        // console.log('data + ', +this.props.data)
        let iconImgPath = ''
        if (this.props.data.received_msg.length > 0) {
            iconImgPath = require('@/assets/images/tag_group.png')
        } else {
            iconImgPath = require('@/assets/images/tags_yajin.png')
        }

        const {
            received_msg, pack_unit_price, unit_name, order_package_num, return_pack_msg, order_num_amount_str
        } = this.props.data

        // 拼接押金包装物规格
        const contentText = `${received_msg}¥${pack_unit_price}/${unit_name}x${order_package_num}`

        // 订或者收的 icon 及文案
        let orderNumAmountView = null
        if (this.props.data && this.props.data.order_num_amount_str) {
            orderNumAmountView = (
                <View style={styles.iconImageText}>
                    <FastImage
                        source={require('@/assets/images/order_detail_icon_ding.png')}
                        resizeMode='cover'
                        style={{ width: 12, height: 12 }}
                    />
                    <Text style={styles.orderNumAmount}>{order_num_amount_str}</Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 14 }}>
                    <View style={{
                        flexDirection: 'row',
                        // justifyContent: 'flex-start',
                        alignItems: 'center',
                        paddingRight: 2,
                        flex: 1 // 可弹性
                        }}
                    >
                        <FastImage
                            source={iconImgPath}
                            resizeMode='contain'
                            style={styles.iconImage}
                        />
                        <Text numberOfLines={1} style={styles.nameTitle}>{this.props.data.name}</Text>
                        <Text numberOfLines={1} style={styles.packMsg}>{return_pack_msg}</Text>
                    </View>
                    {orderNumAmountView}
                </View>

                <View style={{ flexDirection: 'row' }}>
                    {/* {this.props.data.received_msg+'¥'+this.props.data.pack_unit_price+'/'+this.props.data.unit_name+'x'+this.props.data.order_package_num} */}
                    <Text style={styles.contentText}>{contentText}</Text>
                </View>

            </View>
        )
    }
}
