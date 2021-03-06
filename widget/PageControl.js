/* eslint-disable */
/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ViewPropTypes, View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import assign from 'object-assign'
import EStyleSheet from 'react-native-extended-stylesheet'

class PageControl extends PureComponent {
  static propTypes = {
    ...ViewPropTypes,
    numberOfPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number,
    hidesForSinglePage: PropTypes.bool,
    pageIndicatorTintColor: PropTypes.string,
    currentPageIndicatorTintColor: PropTypes.string,
    indicatorSize: PropTypes.object,
    indicatorStyle: ViewPropTypes.style,
    currentIndicatorStyle: ViewPropTypes.style,
    onPageIndicatorPress: PropTypes.func
  }

  static defaultProps = {
    numberOfPages: 0,
    currentPage: 0,
    hidesForSinglePage: false,
    pageIndicatorTintColor: 'gray',
    currentPageIndicatorTintColor: 'white',
    indicatorSize: { width: 8, height: 8 },
    indicatorStyle: {},
    currentIndicatorStyle: {},
    onPageIndicatorPress: function() {}
  }

  onPageIndicatorPress(index: number) {
    this.props.onPageIndicatorPress(index)
  }

  render() {
    var { style, ...props } = this.props

    var defaultStyle = {
      height: this.props.indicatorSize.height
    }

    var indicatorItemStyle = {
      width: this.props.indicatorSize.width,
      height: this.props.indicatorSize.height,
      borderRadius: this.props.indicatorSize.height / 2,
      marginLeft: 5,
      marginRight: 5
    }

    var indicatorStyle = assign({}, indicatorItemStyle, this.props.indicatorStyle, {
      backgroundColor: this.props.pageIndicatorTintColor
    })

    var currentIndicatorStyle = assign({}, indicatorItemStyle, this.props.currentIndicatorStyle, {
      backgroundColor: this.props.currentPageIndicatorTintColor
    })

    var pages = []
    for (var i = 0; i < this.props.numberOfPages; i++) {
      pages.push(i)
    }

    return this.props.hidesForSinglePage && pages.length <= 1 ? null : (
      <View style={[styles.container, defaultStyle, style]}>
        {pages.map((el, i) => (
          <TouchableWithoutFeedback key={i} onPress={this.onPageIndicatorPress.bind(this, i)}>
            <View style={i == this.props.currentPage ? currentIndicatorStyle : indicatorStyle} />
          </TouchableWithoutFeedback>
        ))}
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
})

export default PageControl
