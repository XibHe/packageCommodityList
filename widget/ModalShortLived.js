/* eslint-disable */
import React, { PureComponent } from 'react'
import { View, Text, Modal } from 'react-native'

//import function
import screen from '../common/screen'

export default class extends PureComponent {
  //传入参数 content ,内容, 以及回调函数callback
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      modalVisible: props.visable
    })
  }

  closeModal = () => {
    this.setState({ modalVisible: false })
  }

  showModalHandler = () => {
    setTimeout(() => {
      this.props.callback()
    }, 1400)
  }

  render() {
    let { content } = this.props
    let { modalVisible } = this.state
    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={modalVisible}
        onShow={this.showModalHandler}
        onRequestClose={this.closeModal}
      >
        <View
          style={{
            height: screen.height,
            width: screen.width,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              backgroundColor: 'rgba(0,0,0,.7)',
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 16,
              fontSize: 18,
              marginHorizontal: 30,
              lineHeight: 30,
              color: '#fff',
              textAlign: 'center'
            }}
          >
            {content}
          </Text>
        </View>
      </Modal>
    )
  }
}
