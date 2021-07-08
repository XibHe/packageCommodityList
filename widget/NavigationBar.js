/* eslint-disable */
/**
 * NavigationBar
 * @authors 杨景帅 (yangjingshuai@meicai.cn)
 * @date    2018-08-06 13:54:05
 * @version $Id$
 */

import React, { Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Text, View } from 'react-native'
import { isIphoneX, isIphoneXR, isIOS } from 'MCUtil/device'
import NavigationItem from './NavigationItem'
export default class NavigationBar extends Component {
  render() {
    let leftNavigationItem =
      this.props.leftIcon || this.props.leftTitle ? (
        <NavigationItem
          icon={this.props.leftIcon}
          title={this.props.leftTitle}
          onPress={this.props.onLeftPress}
        />
      ) : null
    let rightNavigationItem =
      this.props.rightIcon || this.props.rightTitle ? (
        <NavigationItem
          icon={this.props.rightIcon}
          title={this.props.rightTitle}
          onPress={this.props.onRightPress}
        />
      ) : null

    let title = this.props.title && (
      <Text style={[styles.titleStyle, this.props.titleStyle]}>{this.props.title}</Text>
    )

    let { leftStyle, centerStyle, rightStyle, leftNavItem, rightNavItem, titleItem } = this.props

    let xStyle = isIphoneX || isIphoneXR ? styles.isIphoneX : null
    return (
      <View style={[styles.container, xStyle, this.props.navBarStyle]}>
        <View style={[{ flex: 1, alignItems: 'flex-start' }, leftStyle]}>
          {leftNavigationItem}
          {leftNavItem}
        </View>
        <View style={[{ flex: 2, alignItems: 'center', justifyContent: 'center' }, centerStyle]}>
          {title}
          {titleItem}
        </View>
        <View style={[{ flex: 1, alignItems: 'flex-end' }, rightStyle]}>
          {rightNavigationItem}
          {rightNavItem}
        </View>
      </View>
    )
  }
}
const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row', // 水平排布
    paddingTop: isIOS ? 20 : 0, // 处理iOS状态栏
    height: isIOS ? 64 : 44, // 处理iOS状态栏
    backgroundColor: '$bgCorF',
    alignItems: 'center', // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
    justifyContent: 'center'
  },
  titleStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 18,
    color: '$TColor',
    fontFamily: '$boldFF'
    // textAlignVertical: 'center',
  },
  navItem: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row'
  },
  itemTitle: {
    fontSize: 13,
    color: 'white'
  },
  isIphoneX: {
    paddingTop: 44,
    height: 88
  }
})
