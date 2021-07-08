/* eslint-disable */
import React, { Component } from 'react'
import {
  Image,
  Text,
  TextInput,
  View,
  Platform,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { isIphoneX, isIphoneXR, isIOS } from 'MCUtil/device'
import { navigation } from 'mcrn-expand'
import EStyleSheet from 'react-native-extended-stylesheet'

export default class NavBar extends Component {
  onLeftPress = () => {
    navigation.back()
  }
  render() {
    let leftIcon = this.props.showLeftIcon && !!this.props.leftIcon && (
      <Image style={[styles.navIcon, this.props.leftIconStyle]} source={this.props.leftIcon} />
    )
    let rightIcon = !!this.props.rightIcon && (
      <Image style={[styles.navIcon, this.props.rightIconStyle]} source={this.props.rightIcon} />
    )
    let leftTitle = !!this.props.leftTitle && (
      <Text style={[styles.itemTitle, this.props.leftTitleStyle]}>{this.props.leftTitle}</Text>
    )
    let rightTitle = !!this.props.rightTitle && (
      <Text style={[styles.itemTitle, this.props.rightTitleStyle]}>{this.props.rightTitle}</Text>
    )
    //若this.props.leftTitlePosition的值为'right'则交换右标题和右图标的位置
    this.props.LeftExchange && ([leftTitle, leftIcon] = [leftIcon, leftTitle]) // this.props.LeftExchange && (leftIcon = [leftTitle,leftTitle=leftIcon][0]) //兼容性更好
    let onLeftPress = this.props.onLeftPress ? this.props.onLeftPress : this.onLeftPress
    let xStyle = (isIphoneX || isIphoneXR) && styles.isIphoneX
    return (
      <View style={[styles.container, xStyle, this.props.navBarStyle]}>
        <TouchableOpacity
          activeOpacity={1}
          style={[{ flex: 1, alignItems: 'flex-start' }, this.props.leftContainerStyle]}
          onPress={onLeftPress}
        >
          <View style={styles.navItem}>
            {leftTitle}
            {leftIcon}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}
          onPress={this.props.titlePress}
        >
          <Text style={[styles.titleStyle, this.props.navTitleStyle]} numberOfLines={1}>
            {this.props.navTitle}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={{ flex: 1, alignItems: 'flex-end' }}
          onPress={this.props.onRightPress}
        >
          {this.props.rightPart ? (
            this.props.rightPart
          ) : (
            <View style={styles.navItem}>
              {rightTitle}
              {rightIcon}
            </View>
          )}
        </TouchableOpacity>
      </View>
    )
  }
}

NavBar.defaultProps = {
  leftIcon: require('../img/public/back.png'),
  showLeftIcon: true
}
const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row', // 水平排布
    paddingTop: isIOS ? 20 : 0, // 处理iOS状态栏
    height: isIOS ? 65 : 45, // 处理iOS状态栏
    backgroundColor: '$bgCorF',
    alignItems: 'center', // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
    justifyContent: 'center'
    // borderBottomWidth: 1,
    // borderColor: '#C5C5C5',
  },
  titleStyle: {
    fontSize: 18,
    color: '$TColor',
    fontFamily: '$boldFF',
    textAlignVertical: 'center'
  },
  navItem: {
    flex: 1,
    paddingHorizontal: 15,
    // padding: 15,
    alignItems: 'center',
    flexDirection: 'row'
  },
  itemTitle: {
    fontSize: 13,
    color: '$TColor'
  },
  navIcon: {
    // width:13,
    // height:13
  },
  isIphoneX: {
    paddingTop: 40,
    height: 85
  }
})
