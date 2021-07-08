/* eslint-disable */
/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */

import React from 'react'
import ReactNative, { StyleSheet, Dimensions, Text, ReactElement } from 'react-native'
import { color } from 'MCConfig/Css'
import EStyleSheet from 'react-native-extended-stylesheet'

export function HeadingBig({ style, ...props }: Object): ReactElement {
  return <Text style={[styles.h0, style]} {...props} />
}

export function Heading1({ style, ...props }: Object): ReactElement {
  return <Text style={[styles.h1, style]} {...props} />
}

export function Heading2({ style, ...props }: Object): ReactElement {
  return <Text style={[styles.h2, style]} {...props} />
}

export function Paragraph({ style, ...props }: Object): ReactElement {
  return <Text style={[styles.p, style]} {...props} />
}

export function Tip({ style, ...props }: Object): ReactElement {
  return <Text style={[styles.tip, style]} {...props} />
}

export function TextBlue({ style, ...props }: Object): ReactElement {
  return <Text style={[styles.TextBlue, style]} {...props} />
}

export function PriceTextGreen({ style, ...props }: Object): ReactElement {
  return <Text style={[styles.priceTextGreen, style]} {...props} />
}

export function PriceTextRed({ style, ...props }: Object): ReactElement {
  return <Text style={[styles.priceTextRed, style]} {...props} />
}

export function PriceTextBlack({ style, ...props }: Object): ReactElement {
  return <Text style={[styles.priceTextBlack, style]} {...props} />
}

const styles = EStyleSheet.create({
  h0: {
    fontSize: 40,
    color: color.theme
  },
  h1: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 16,
    color: '#222222'
  },
  h2: {
    fontSize: 14,
    color: '#222222'
  },
  p: {
    fontSize: 13,
    color: '#777777'
  },
  tip: {
    fontSize: 13,
    color: '#999999'
  },
  TextBlue: {
    fontSize: 16,
    color: '$theme',
    fontFamily: 'PingFangSC-Regular',
    fontWeight: '900'
  },
  priceTextGreen: {
    fontSize: 18,
    color: '#3DC644',
    fontFamily: 'PingFangSC-Regular',
    fontWeight: '900'
  },
  priceTextRed: {
    fontSize: 18,
    color: 'red',
    fontFamily: 'PingFangSC-Regular',
    fontWeight: '900'
  },
  priceTextBlack: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'PingFangSC-Regular',
    fontWeight: '900'
  }
})
