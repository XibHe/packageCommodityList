/**
 * Radio 单选框封装组件
 *
 * [params]
 * inner_container_style
 * modal_content_style
 * showModal
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  iconActiveStyle: { backgroundColor: '#0496FE', margin: 3, borderRadius: 15, flex: 1 },
  iconStyle: { borderRadius: 15, width: 15, height: 15, borderColor: '#AEAEAE', borderWidth: 1, marginRight: 15 },
});

export default class PackModal extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      activeId: this.props.activeId,
      dataList: this.props.dataList || [],
    };
  }
  componentWillReceiveProps(newProps) {
    this.setState({ activeId: newProps.activeId || '' });
  }
  clickItem = (item) => {
    this.setState({
      activeId: item.id,
    });
    this.props.onChange(item);
  }
  rendRadioList() {
    const dataList = this.state.dataList || [];
    return (<View>
      {dataList.map((item = {}) => {
        const iconHtml = <View style={styles.iconStyle} />;
        const iconHtmlActive = (<View style={[styles.iconStyle, { borderColor: '#0496FE' }]}>
          <View style={styles.iconActiveStyle} />
        </View>);
        return (<TouchableOpacity
          key={item.id}
          onPress={() => this.clickItem(item)}
          style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}
        >
          {/* icon*/}
          {item.id === this.state.activeId ? iconHtmlActive : iconHtml}
          {/* 文字*/}
          <Text>{item.name}</Text>
        </TouchableOpacity>);
      })}
    </View>);
  }
  render() {
    return (<View style={this.props.containStyle}>
      {this.rendRadioList()}
    </View>);
  }
}

