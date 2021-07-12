/*
 核对收款信息
*/

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Header, List, WhiteSpace, Button, Flex } from '@mc/mcrn'
import navigator from '../../components/navigator'
import { inject, observer } from "mobx-react/native";

const Item = List.Item;
const FlexItem = Flex.Item;

@navigator
@inject('account')
@observer
class StoreVerify extends Component {

  submit = () => {

  };

  render() {
    const { navigation: { navigate, goBack }, account } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header onPressLeft={() => goBack()} title='核对信息' />
        <ScrollView style={{ flex: 1 }}>
          
          <View style={[styles.flexCenter]}>
            <Image source={require('../../assets/icons/checklog.png')} />
            <Text style={[styles.title]}>请核对账户信息</Text>
            <Text style={[styles.content]}>此账户将作为接受资金使用</Text>
          </View>

          <List>
            <Item border={false}>
              <Flex justify={'between'}>
                <Text>账户类型</Text>
                <Text>{ account.apply.personal ? '个人账户' : '对公账户'}</Text>
              </Flex>
            </Item>
            <Item border={false}>
              <Flex justify={'between'}>
                <Text>银行卡账户</Text>
                <Text>123123123</Text>
              </Flex>
            </Item>
            <Item border={false}>
              <Flex justify={'between'}>
                <Text>开户人</Text>
                <Text>123123123</Text>
              </Flex>
            </Item>
            <Item border={false}>
              <Flex justify={'between'}>
                <Text>电话</Text>
                <Text>123123123</Text>
              </Flex>
            </Item>
            <Item border={false}>
              <Flex justify={'between'}>
                <Text>身份证号</Text>
                <Text>123123123</Text>
              </Flex>
            </Item>
          </List>
        </ScrollView>
        <Button onPress={this.submit} type={'primary'} radius={false}>确认并提交</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24,
  },
  title: {
    color: '#333333',
    fontSize: 14,
    paddingTop: 15,
  },
  content: {
    color: '#999999',
    fontSize: 12,
    paddingTop: 4,
    paddingBottom: 24,
  }
});

export default StoreVerify