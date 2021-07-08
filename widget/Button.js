/* eslint-disable */
/**
 * 杨景帅
 */

//import liraries
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ViewPropTypes, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

// create a component
class Button extends PureComponent {
  static propTypes = {
    ...ViewPropTypes,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    style: Text.propTypes.style,
    containerStyle: ViewPropTypes.style,
    title: PropTypes.string,
    activeOpacity: PropTypes.number
  }

  static defaultProps = {
    onPress: () => {},
    disabled: false,
    activeOpacity: 0.8
  }

  render() {
    let { onPress, disabled, style, containerStyle, title, activeOpacity } = this.props
    return (
      <TouchableOpacity
        style={[styles.container, containerStyle]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={activeOpacity}
      >
        <Text style={style}>{title}</Text>
      </TouchableOpacity>
    )
  }
}
// define your styles
const styles = EStyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

//make this component available to the app
export default Button
