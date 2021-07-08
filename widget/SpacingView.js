/* eslint-disable */
/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */

//import liraries
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { color } from 'MCConfig/Css'
import EStyleSheet from 'react-native-extended-stylesheet'

// create a component
class SpacingView extends PureComponent {
  render() {
    return <View style={[styles.container, this.props.style]} />
  }
}

// define your styles
const styles = EStyleSheet.create({
  container: {
    height: 14,
    backgroundColor: color.background
  }
})

//make this component available to the app
export default SpacingView
