/*
 填写收款账户信息
*/

import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImagePickerIOS,
  Image,
} from 'react-native';
import { Header, List, Button, Flex, WingBlank, InputItem, ActionSheet } from '@mc/mcrn'
;
import { inject, observer } from 'mobx-react/native';

import navigator from '../../components/navigator';
import native from '../../utils/native';
import theme from '../../theme';
import * as accountSrv from '../../api/account'; 

const Item = List.Item;
const FlexItem = Flex.Item;

@navigator
@inject('account')
@observer
class StorePersonal extends Component {

  constructor(props) {
    super(props);
    const { bankCard, merchant, IDCardDicA, IDCardDicB } = this.props.account;
    this.state = {
      bankCard: bankCard.bankCardNo,
      name: bankCard.bankCertName,
      phone: merchant.principalMobile,
      wx: bankCard.wx_code,
      identity: bankCard.certNo,
      photoList: [],
      IDCardAfile_path: IDCardDicA.saved_file_path,
      IDCardBfile_path: IDCardDicB.saved_file_path
    };
  }

  next = () => {
    const { navigation: { navigate }, account } = this.props;
    account.setBankCard({
      accountType: '01',
      certType: '01'
    });
    navigate(account.merchant != '01' ? 'StoreBizCert' : 'StoreInfo');
  };

  onChangeBankCard = (value) => {
    this.setState({ bankCard: value });
    this.props.account.setBankCard({ bankCardNo: value });
  };

  onChangeName = (value) => {
    this.setState({ name: value });
    this.props.account.setBankCard({ bankCertName: value });
  };

  onChangePhone = (value) => {
    this.setState({ phone: value });
    this.props.account.setMerchant({ principalMobile: value });
  };

  onChangeWX = (value) => {
    this.setState({ wx: value });
    this.props.account.setBankCard({ wx_code: value });
  };

  onChangeIdentity = (value) => {
    this.setState({ identity: value });
    this.props.account.setBankCard({ certNo: value });
  };

  option = ['拍照', '从相册选择', '取消'];
  onPressSelectImage = (photoType) => {
    ActionSheet.showActionSheetWithOptions({
      options: this.option,
      cancelButtonIndex: 2
    }, (index) => {
      if (index === 0) {

        native.getTakePhoto().then(data => {
          console.log('getTakePhoto path = ' + data.imagePath);
          accountSrv.uploadImage(data.imagePath, photoType).then(rep => {
            if (rep.ret === 1) {
              this.imageResData(rep, photoType);
            }
            console.log('getTakePhoto rep = ' + JSON.stringify(rep));
          });
  
        }).catch((error) => {

        });

      } else if (index === 1) {

        native.getImagePicker().then(data => {
          console.log('getImagePicker path = ' + data.imagePath);
          accountSrv.uploadImage(data.imagePath, photoType).then(rep => {
            if (rep.ret === 1) {
              this.imageResData(rep, photoType);
            }
            console.log('getImagePicker rep = ' + JSON.stringify(rep));
          });
  
        }).catch((error) => {

        });
      }
    });
  }
  
  // 保存上传照片后返回的数据
  imageResData = (rep, photoType) => {
    if (photoType === '01') {
      // this.props.account.IDCardDicA = rep.data;
      this.props.account.setIDCardDicA(rep.data);
      this.setState({
        IDCardAfile_path: rep.data.saved_file_path,
      });
    } else {
      this.props.account.setIDCardDicB(rep.data);
      this.setState({
        IDCardBfile_path: rep.data.saved_file_path,
      });
    }
  }

  render() {
    const { navigation: { goBack, navigate } } = this.props;
    const { bankCard, name, phone, wx, identity, IDCardAfile_path, IDCardBfile_path } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header statusBar={true} onPressLeft={() => goBack()} title='填写收款账户' />
        <ScrollView style={{ flex: 1 }}>
          <List>
            <InputItem
              placeholder="请输入，仅限储蓄卡"
              type="bankCard"
              labelNumber={7}
              textAlign="right"
              value={bankCard}
              onChange={this.onChangeBankCard}
            >
              银行账号
            </InputItem>
            <InputItem
              placeholder="请输入姓名"
              labelNumber={7}
              textAlign="right"
              value={name}
              onChange={this.onChangeName}
            >
              开户人姓名
            </InputItem>
            <InputItem
              placeholder="请输入手机号"
              type="phone"
              labelNumber={7}
              textAlign="right"
              value={phone}
              onChange={this.onChangePhone}
            >
              银行预留手机号
            </InputItem>
            <InputItem
              placeholder="开户人实名验证微信号"
              labelNumber={7}
              textAlign="right"
              value={wx}
              onChange={this.onChangeWX}
            >
              开户人微信
            </InputItem>
            <Item
              border={false}
              height={20}
              extra={<Text style={styles.link} onPress={() => navigate('')}>如何找到微信号，查看示例</Text>}
            />
            <Item
              border={false}
              height={40}
              extra={<Text style={styles.link} onPress={() => navigate('')}>查看示例</Text>}
            >
              上传证件照片

            </Item>

            <WingBlank size={16}>
              <Flex justify='between'>
                <TouchableOpacity onPress={() => {this.onPressSelectImage('01')}}>
                  {IDCardAfile_path ? (
                    <Image
                      style={[styles.uploadBackImage]}
                      source={{ uri: IDCardAfile_path }}
                    />
                  ): (
                    <View style={[styles.uploadBackImage, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
                      <Image style={{ width: 30, height: 22 }} source={require('../../assets/icons/shopInfo_uploadImage.png')} />
                      <Text style={[styles.remindTitle]}>身份证照片面</Text>
                    </View>
                  )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {this.onPressSelectImage('02')}}>
                  {IDCardBfile_path ? (
                    <Image
                      style={[styles.uploadBackImage]}
                      source={{ uri: IDCardBfile_path }}
                    />
                  ): (
                    <View style={[styles.uploadBackImage, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
                      <Image source={require('../../assets/icons/shopInfo_uploadImage.png')} />
                      <Text style={[styles.remindTitle]}>身份证国徽面</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </Flex>
            </WingBlank>

            <InputItem
              placeholder="请输入身份证号"
              labelNumber={7}
              textAlign="right"
              value={identity}
              onChange={this.onChangeIdentity}
            >
              身份证号
            </InputItem>
          </List>
        </ScrollView>
        <Button onPress={this.next} type="primary" radius={false}>下一步</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  link: {
    fontSize: 12,
    color: theme.$global_base,
  },
  uploadBackImage: {
    width: 158,
    height: 106,
    backgroundColor: '#EAF4F9',
  },
  remindTitle: {
    color: '#1CA7F7',
    fontSize: 14,
    paddingTop: 8,
  }
});

export default StorePersonal;