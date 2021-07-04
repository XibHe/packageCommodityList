import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './index.styles'

export default class SSUInforItem extends Component {
    render () {
        const {
            vendor_name, unit_price, format, num
        } = this.props.data

        let vendorNameView = null
        if (this.props.data && this.props.data.vendor_name) {
            vendorNameView = (
                <View style={styles.vendorNameView}>
                    <Text style={styles.vendorName}>{vendor_name}</Text>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                {vendorNameView}
                <Text style={styles.orderSSUText}>{`¥${unit_price}/${format}x${num}`}</Text>
            </View>
        )
    }
}
