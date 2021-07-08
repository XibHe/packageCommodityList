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
import { screen, tool } from '../common'
import EStyleSheet from 'react-native-extended-stylesheet'

// create a component
class Separator extends PureComponent {
  render() {
    return <View style={[styles.line, this.props.style]} />
  }
}

// define your styles
const styles = EStyleSheet.create({
  line: {
    width: screen.width,
    height: screen.onePixel,
    backgroundColor: color.border
  }
})

//make this component available to the app
export default Separator
