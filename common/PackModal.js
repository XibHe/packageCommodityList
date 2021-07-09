/**
 * PackModal 是简单一个modal弹出层的封装，只有“取消”，“确定”两个按钮，和一个半透明的背景
 *
 * [params]
 * visible 弹出层的显示隐藏
 * topContainerStyle 顶部按钮容器的样式
 * cancelFontStyle 取消按钮的样式
 * confirmFontStyle 确认按钮的样式
 * confirmTxt 确定按钮的文案
 *
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  outerContainer: {
    height,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  topContainStyle: {
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});


export default class PackModal extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      visible: false,
      confirmTxt: this.props.confirmTxt || '确认',
    };
  }
  closeModal = () => {
    this.setState({ visible: false });
  }
  showModal() {
    this.setState({ visible: true });
  }
  render() {
    return (<Modal
      transparent
      visible={this.state.visible}
      style={{ height: 300 }}
    >
      <KeyboardAvoidingView behavior={this.props.behavior}>
        <View style={styles.outerContainer}>
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: '#000', opacity: 0.7 }}
            onPress={this.closeModal}
          />
          <View style={{ backgroundColor: '#fff' }}>
            {/* 顶部按钮部分*/}
            <View style={[styles.topContainStyle, this.props.topContainerStyle]}>
              <TouchableOpacity style={{ padding: 15 }} onPress={this.closeModal}>
                <Text style={[{ color: '#757575' }, this.props.cancelFontStyle]}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ padding: 15 }}
                onPress={() => { this.props.clickConfirm(); }}
              >
                <Text
                  style={[{ color: '#0496FE' }, this.props.confirmFontStyle]}
                >
                  {this.state.confirmTxt}
                </Text>
              </TouchableOpacity>
            </View>
            {/* 传入内容部分*/}
            <ScrollView>
              {this.props.children}
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>);
  }
}

