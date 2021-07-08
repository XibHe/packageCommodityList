/* eslint-disable */
import React, { PureComponent } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

export default class AutoColorText extends PureComponent {
  constructor(props) {
    super(props)
  }
  judgeNumberColor = value =>
    value > 0 ? { color: '#46CC55' } : value < 0 ? { color: '#F04B4C' } : ''
  render() {
    let { value, style } = this.props
    return (
      <Text
        {...this.props}
        style={[
          { fontSize: 15, fontFamily: 'PingFangSC-Regular' },
          this.judgeNumberColor(value),
          style
        ]}
      >
        {value > 0 ? '+' + value : value}
      </Text>
    )
  }
}
