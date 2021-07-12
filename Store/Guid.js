
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
import navigator from '../../components/navigator'
import Header from '../../components/Header'
import {WhiteSpace, Button, WingBlank, List} from '@mc/mcrn'
import { inject, observer } from "mobx-react/native";
import Native from '../../utils/native'

const Item = List.Item;
const textList = ['添加店员', '添加桌台并绑定二维码', '添加菜谱', '链接打印机', '绑定银行卡']

@navigator
@inject('account', 'global')
@observer
class StoreGuid extends Component {

  goLaunch = () => {
    const { account, global } = this.props;
    global.changeStore(account.storeInfo);
    Native.changeAccount(account.storeInfo);
  };

  render() {
    const { goBack } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <Header onPressLeft={() => goBack()} title='开店引导' />
        <WhiteSpace size={59}/>
        <View style={{ flex: 1 }}>
          <WingBlank size={16} >
            <Text style={styles.titleStyle}>五步完成开店</Text>
            <WhiteSpace size={40}/>
          </WingBlank>
          <List bodyStyle={{ borderTopWidth: 0 }}>
            {
              textList.map((title) => (
                <Item
                  height={50}
                  border={false}
                  thumb={(<View style={styles.leftViewStyle}/>)}
                >
                  <Text style={styles.textStyle}>{title}</Text>
                </Item>
              ))
            }
          </List>
        </View>
        <WingBlank size={16}>
          <Button type={'primary'} onPress={this.goLaunch}>开始你的开店之旅吧</Button>
        </WingBlank>
        <WhiteSpace size={59}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 24,
    fontWeight:'bold'
  },
  textStyle: {
    marginLeft: 12,
    fontSize: 18,
    color: '#333333'
  },
  leftViewStyle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor:'#D8D8D8',
  },

});

export default StoreGuid