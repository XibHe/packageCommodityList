import React, { Component } from 'react'
import { Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import styles from './index.styles'

export default class GiftItem extends Component {
   constructor (props) {
       super(props)
       this.props
   }

    render () {
        const {
            gift_source, name, vendor_name, format, num, order_num_amount_str
        } = this.props.data

        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', paddingLeft: 14 }}>
                        <View style={styles.giftSourceView}>
                            <Text style={styles.giftSourceText}>{gift_source}</Text>
                        </View>
                        <Text style={styles.nameTitle}>{name}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', paddingRight: 6, alignItems: 'center' }}>
                        <FastImage
                            source={require('../../../assets/images/order_detail_icon_ding.png')}
                            resizeMode='cover'
                            style={{ width: 12, height: 12 }}
                        />
                        <Text style={{
                            color: '#9F9F9F',
                            fontSize: 12,
                            paddingLeft: 3,
                            paddingRight: 6
                            }}
                        >
                        {order_num_amount_str}
                        </Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', paddingLeft: 14 }}>
                        {!!vendor_name &&
                        <View style={styles.vendorNameView}>
                            <Text style={styles.vendorName}>{vendor_name}</Text>
                        </View>}
                        <Text style={styles.formatNum}>{`${format}x${num}`}</Text>
                    </View>
                </View>
            </View>
        )
    }
}
