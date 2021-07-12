/*
 填写门店信息
*/

import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Header, List, Button, Flex, InputItem, ActionSheet, WingBlank } from '@mc/mcrn'
;
import { inject, observer } from 'mobx-react/native';

import navigator from '../../components/navigator';
import native from '../../utils/native';
import * as accountSrv from '../../api/account'; 
import theme from '../../theme';

const Item = List.Item;
const FlexItem = Flex.Item;
const Brief = Item.Brief;

@navigator
@inject('account')
@observer
class StoreInfo extends Component {

  constructor(props){
    super(props);
    const { bankCard, merchant, outDoorPhotoDic, innerPhotoDic } = this.props.account;

    this.state = {
      shopName: merchant.alias,
      contactName: merchant.contactName,
      contactPhone: merchant.contactMobile,
      servicePhone: merchant.servicePhoneNo,
      province: merchant.province,   // 省
      city: merchant.city,           // 市
      district: merchant.district,   // 县
      detailAddress: merchant.address, // 详细地址
      outDoorPhotoPath: outDoorPhotoDic.saved_file_path,
      innerPhotoPath: innerPhotoDic.saved_file_path
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

  onChangeDetailAddress = (value) => {
    this.setState({ detailAddress: value });
    this.props.account.setMerchant({ address: value });
  }

  onChangePlatform = (value) => {
    console.log('多选框'+value);
  }

  next = () => {
    const { navigation: { navigate } } = this.props;
    navigate('StoreVerify');
  }

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
    if (photoType === '06') {
      this.props.account.setOutDoorPhotoDic(rep.data);
      this.setState({
        outDoorPhotoPath: rep.data.saved_file_path,
      });
    } else {
      this.props.account.setInnerPhotoDic(rep.data);
      this.setState({
        innerPhotoPath: rep.data.saved_file_path,
      });
    }
  }  

  render() {
    const { account, navigation: { navigate, goBack } } = this.props;
    const { shopName, contactName, contactPhone, servicePhone, detailAddress, outDoorPhotoPath, innerPhotoPath } = this.state;
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
            <InputItem
              placeholder="请选择"
              labelNumber={7}
              textAlign="right"
            >
              住址
            </InputItem>
            <InputItem
              placeholder="请填写详细地址"
              labelNumber={7}
              textAlign="right"
              value={detailAddress}
              onChange={this.onChangeDetailAddress}
            >
              详细住址
            </InputItem>
            <Item
              extra={<Text style={styles.link} onPress={() => navigate('')}>查看示例</Text>}
            >
              上传门店照片
              <Brief>照片信息清晰可见</Brief>
            </Item>
            
            <WingBlank size={16}>
            
              <TouchableOpacity onPress={() => {this.onPressSelectImage('06')}}>
                {outDoorPhotoPath ? (
                  <Image
                    style={[styles.uploadBackImage]}
                    source={{ uri: outDoorPhotoPath }}
                  />
                ) : (
                  <View style={[styles.flexCenter, styles.uploadBackImage]}>
                    <Image style={{ width: 30, height: 22 }} source={require('../../assets/icons/shopInfo_uploadImage.png')} />
                    <Text style={[styles.remindTitle, { paddingTop: 6 }]}>门店头图照</Text>
                    <Text style={[styles.remindTitle, { paddingTop: 6 }]}>需拍出完整门匾、门槛并与系统中门店名称一致</Text>
                  </View>
                )}
              </TouchableOpacity> 

              <TouchableOpacity onPress={() => {this.onPressSelectImage('09')}}>
                {innerPhotoPath ? (
                  <Image
                    style={[styles.uploadBackImage, { marginTop: 15 }]}
                    source={{ uri: innerPhotoPath }}
                  />
                ) : (
                  <View style={[styles.flexCenter, styles.uploadBackImage, { marginTop: 15 }]}>
                    <Image style={{ width: 30, height: 22 }} source={require('../../assets/icons/shopInfo_uploadImage.png')} />
                    <Text style={[styles.remindTitle, { paddingTop: 6 }]}>店内环境照</Text>
                    <Text style={[styles.remindTitle, { paddingTop: 6 }]}>展示门店的整体环境，不可仅拍摄一桌一椅</Text>
                  </View>
                )}
              </TouchableOpacity> 
            </WingBlank>
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
  link: {
    fontSize: 12,
    color: theme.$global_base,
  },
  uploadBackImage: {
    height: 186, 
    backgroundColor: '#EAF4F9',
  },
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  remindTitle: {
    color: '#1CA7F7',
    fontSize: 14,
  },
  agreementTitle: {
    color: '#333333',
    fontSize: 12,
  }

});

export default StoreInfo;