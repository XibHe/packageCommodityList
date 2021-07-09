/**
 * modal_background_style
 * inner_container_style
 * modal_content_style
 * showModal
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    Modal,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  modalBackgroundStyle: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  modal_title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
  },
  modal_content: {
    marginTop: 20,
  },
});


export default class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  showModal() {
    this.setState({
      modalVisible: true,
    });
  }
  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    return (
      <Modal
        transparent
        visible={this.state.modalVisible}
      >
        <View style={[styles.modalBackgroundStyle, this.props.modal_background_style]}>
          <View style={[styles.innerContainer, this.props.inner_container_style]}>
            {this.props.modalTitle ?
              <View style={styles.modal_title}>
                <View style={{ flex: 1 }} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: '#2A2A2A', fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>{this.props.modalTitle}</Text>
                </View>
                <TouchableOpacity style={{ flex: 1 }} onPress={this.closeModal}>
                  {/* <Image style={{alignSelf:'flex-end',width:40,height:40}}
                source={require('../images/close_bule.png')} />*/}
                </TouchableOpacity>
              </View> : null
            }
            <View style={[styles.modal_content, this.props.modal_content_style]}>
              {this.props.modalContent}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

