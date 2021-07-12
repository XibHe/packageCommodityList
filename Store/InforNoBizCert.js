/*
 门店信息（不上传营业执照）
*/

import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Header, List, Button, InputItem } from '@mc/mcrn';
import { inject, observer } from 'mobx-react/native';

import navigator from '../../components/navigator';

@navigator
@inject('account')
@observer

class StoreInfoNoBizCert extends Component {

  constructor(props){
    super(props);
    const { merchant } = this.props.account;
    
    this.state = {
      shopName: merchant.alias,
      contactName: merchant.contactName,
      contactPhone: merchant.contactMobile,
      servicePhone: merchant.servicePhoneNo,
    };
  }

  onChangeShopName = (value) => {
    this.setState({ shopName: value });
    this.props.account.setMerchant({ alias: value });
  }

  onChangeContactName = (value) => {
    this.setState({ contactName: value });
    this.props.account.setMerchant({ contactName: value });
  }

  onChangeContactPhone = (value) => {
    this.setState({ contactPhone: value });
    this.props.account.setMerchant({ contactMobile: value });
  }

  onChangeServicePhone = (value) => {
    this.setState({ servicePhone: value });
    this.props.account.setMerchant({ servicePhoneNo: value });
  }

  render(){
    const { navigation: { navigate, goBack } } = this.props;
    const { shopName, contactName, contactPhone, servicePhone } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header statusBar={true} onPressLeft={() => goBack()} title='填写门店信息' />
        <ScrollView style={{ flex: 1 }}>
          <List>
            <InputItem
              placeholder="请输入商户名"
              labelNumber={7}
              textAlign="right"
              value={shopName}
              onChange={this.onChangeShopName}
            >
              商户简称
            </InputItem>
            <InputItem
              placeholder="请输入姓名"
              labelNumber={7}
              textAlign="right"
              value={contactName}
              onChange={this.onChangeContactName}
            >
              联系人姓名
            </InputItem>
            <InputItem
              placeholder="请输入手机号"
              labelNumber={7}
              textAlign="right"
              value={contactPhone}
              onChange={this.onChangeContactPhone}
            >
              联系人手机号
            </InputItem>
            <InputItem
              placeholder="请输入电话"
              labelNumber={7}
              textAlign="right"
              value={servicePhone}
              onChange={this.onChangeServicePhone}
            >
              客服电话
            </InputItem>
          </List>
          <View style={{ marginLeft: 16, marginVertical: 30 }}>
            <Text style={[styles.agreementTitle]}>我已阅读并同意《特约商户受理条码业务协议》</Text>
          </View> 
        </ScrollView>         
        <Button onPress={this.next} type="primary" radius={false}>下一步</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  agreementTitle: {
    color: '#333333',
    fontSize: 12,
  }
});

export default StoreInfoNoBizCert;