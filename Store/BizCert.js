/*
 营业执照信息页面
*/

import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  ImagePickerIOS,
  TouchableOpacity
} from 'react-native';
import { Header, List, Button, Flex, InputItem, ActionSheet, WingBlank } from '@mc/mcrn'
;
import { inject, observer } from 'mobx-react/native';

import * as accountSrv from '../../api/account'; 
import native from '../../utils/native';
import navigator from '../../components/navigator';
import theme from '../../theme';

const Item = List.Item;
const FlexItem = Flex.Item;
const Brief = Item.Brief;

@navigator
@inject('account')
@observer
class StoreBizCert extends Component {

  constructor(props) {
    super(props);
    const { licensePhotoDic, merchant } = this.props.account;
    this.state = {
      registerCode: merchant.bussAuthNum,
      ownerName: merchant.principalPerson,
      licenseName: merchant.merchantName,
      licensePhotoPath: licensePhotoDic.saved_file_path,
    };
  }

  componentDidMount() {
    console.warn(this.props.account.bank);
  }

  onChangeRegisterCode = (value) => {
    this.setState({ registerCode: value });
    this.props.account.setMerchant({ bussAuthNum: value });
  };

  onChangeLicenseName = (value) => {
    this.setState({ licenseName: value });
    this.props.account.setMerchant({ merchantName: value });
  };

  next = () => {
    const { navigation: { navigate } } = this.props;
    navigate('StoreInfo');
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
              this.imageResData(rep);
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
              this.imageResData(rep);
            }
            console.log('getImagePicker rep = ' + JSON.stringify(rep));
          });
  
        }).catch((error) => {

        });
      } 
    }); 
  }

  // 保存上传照片后返回的数据
  imageResData = (rep) => {
    this.props.account.setLicensePhotoDic(rep.data);
    this.setState({
      licensePhotoPath: rep.data.saved_file_path,
    });
  }  

  render() {
    const { navigation: { navigate, goBack } } = this.props;
    const { registerCode, ownerName, licenseName, licensePhotoPath } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header statusBar={true} onPressLeft={() => goBack()} title='营业执照信息' />
        <ScrollView style={{ flex: 1 }}>
          <List>
            <Item
              extra={<Text style={styles.link} onPress={() => navigate('')}>查看示例</Text>}
            >
              上传营业执照
              <Brief>需在有效期内，复印件加盖公章/合同章/手印</Brief>
              <Flex>
                <FlexItem />
              </Flex>
            </Item>

            <WingBlank size={16}>
              <TouchableOpacity onPress={() => {this.onPressSelectImage('03')}}>
                {licensePhotoPath ? (
                  <Image 
                    style={[styles.uploadBackImage]}
                    source={{ uri: licensePhotoPath }} 
                  />
                ): (
                  <View style={[styles.uploadBackImage, { alignItems: 'center', justifyContent: 'center' }]}>
                    <Image source={require('../../assets/icons/shopInfo_uploadImage.png')} />
                    <Text style={[styles.remindTitle]}>营业执照正面</Text>
                  </View>
                )}
              </TouchableOpacity>
            </WingBlank>

            <InputItem
              placeholder="请输入注册号/统一社会信用代码"
              labelNumber={7}
              textAlign="right"
              value={registerCode}
              onChange={this.onChangeRegisterCode}
            >
              注册号
            </InputItem>
            <InputItem
              placeholder=""
              labelNumber={9}
              textAlign="right"
              value={ownerName}
              // onChange={this.onChangeOwnerName}
            >
              法定代表人/经营者
            </InputItem>
            <InputItem
              placeholder="请输入营业执照上的公司名称"
              labelNumber={7}
              textAlign="right"
              value={licenseName}
              onChange={this.onChangeLicenseName}
            >
              执照名称
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
    // width: 330, 
    height: 186,
    backgroundColor: '#EAF4F9',
  },
  remindTitle: {
    color: '#1CA7F7',
    fontSize: 14,
    paddingTop: 8,
  }
});

export default StoreBizCert;