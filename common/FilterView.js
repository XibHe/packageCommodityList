/**
 * 订单筛选
 */
import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    Modal,
    ListView,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


const styles = EStyleSheet.create({
  container: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  line: {
    width: '$DEVICE_WIDTH',
    height: '$onePixel',
    backgroundColor: '#e0e0e0',
  },
  searchInput: { marginTop: 10, marginHorizontal: 10, borderWidth: 1, borderColor: '#999', paddingHorizontal: 10, paddingVertical: 10 },
});

export default class FilterView extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      modalVisible: false,
      dataSource: ds,
      dataList: [],
      selectList: [],
      searchText: '',
    };
  }
  showModal(dataList, selectList) {
    this.setState({
      modalVisible: true,
      selectList,
      dataList,
      dataSource: this.state.dataSource.cloneWithRows(dataList),
      searchText: '',
    });
  }
  closeModal() {
    this.setState({
      modalVisible: false,
    });
  }
  selectRow(rowData) {
    this.setState({
      modalVisible: false,
    }, () => {
      this.props.filterSelect(rowData);
    });
  }

  renderRow = (rowData) => {
    const index = this.state.selectList.indexOf(rowData.name);
    return (<View style={{ flex: 1, paddingHorizontal: 15, height: 44 }}>
      <TouchableOpacity
        key={rowData.id} style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
        onPress={() => this.selectRow(rowData)}
      >
        <Text style={[{ flex: 1 }, index > -1 ? { color: '#1180FD' } : { color: '#2A2A2A' }]}>{rowData.name}</Text>
        {index > -1 ?
          <Image source={require('../img/checkmark_selected.png')} /> : null
        }
      </TouchableOpacity>
      <View style={[styles.line]} />
    </View>);
  }

  onChangeSearchText = (text) => {
    this.setState({
      searchText: text,
      dataSource: this.state.dataSource
      .cloneWithRows(this.state.dataList.filter(v => v.name.indexOf(text) >= 0)),
    });
  }

  render() {
    return (
      <Modal animationType="fade" transparent visible={this.state.modalVisible} justifyContent="flex-end">
        <View style={styles.container}>
          {/* 上边空处，点击关闭Modal*/}
          <TouchableOpacity style={{ flex: 1 }} onPress={() => this.closeModal()} />
          {/* 内容主体部分*/}
          <View style={[{ backgroundColor: '#fff', maxHeight: 240 }, this.props.mainContainerStyle]}>
            {this.props.inputSearchShow ? <TextInput
              underlineColorAndroid="transparent"
              style={styles.searchInput}
              placeholderTextColor="#B2B2B2"
              placeholder="请输入筛选条件"
              clearButtonMode="while-editing"
              value={this.state.searchText}
              onChangeText={this.onChangeSearchText}
            /> : null}
            <ListView
              style={{ paddingVertical: 10 }}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

