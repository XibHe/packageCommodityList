/*
 店铺基本信息 
*/

import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { Header, Button, Flex, WingBlank, List } from '@mc/mcrn'
;
import { inject, observer } from 'mobx-react/native';

import theme from '../../theme';
import navigator from '../../components/navigator';

const Item = List.Item;
const FlexItem = Flex.Item;

@navigator
@inject('account')
@observer
class StoreApply extends Component {

  constructor(props) {
    super(props);
    const { account: { merchant } } = this.props;
    this.state = {
      bizCert: merchant.merchantType != '01',
      personal: merchant.merchantType != '03',
      dataList: [],
    };
  }

  setBizCert = (value) => {
    this.setState({ bizCert: value, personal: value ? this.state.personal : true });
    console.log('营业执照 value = ' + value,'营业执照 BizCert = ' + this.state.bizCert);
    this.checkList();
  };

  setPersonal = (value) => {
    this.setState({ personal: value });
    this.checkList();
  };

  checkList = () => {


    const personalList =
    [{ title: '开户人身份证正反面照片', content: '请保证身份证信息清晰可辩，无遮挡', image: require('../../assets/icons/id_example.png') }];
    const personalAccountList = 
    [{ title: '开户人身份证正反面照片', content: '请保证身份证信息清晰可辩，无遮挡', image: require('../../assets/icons/id_example.png') },
      { title: '营业执照照片', content: '需在有效期内，资料清晰可辩，复印件需加盖印章', image: require('../../assets/icons/license_example.png') },
      { title: '门店头图', content: '需拍出完整的门边、门槛（建议正对门店2米处拍摄）', image: require('../../assets/icons/outdoor_example.png') },
      { title: '店内环境照片', content: '需拍摄店内整体用餐环境（收银台、用餐桌椅等）', image: require('../../assets/icons/indoor_example.png') }
    ];
    const publicAccountList = 
    [{ title: '对公账户开户许可证', content: '请保证证件信息清晰可辩，无遮挡', image: require('../../assets/icons/openaccount_example.png') },
      { title: '营业执照照片', content: '需在有效期内，资料清晰可辩，复印件需加盖印章', image: require('../../assets/icons/license_example.png') },
      { title: '法人身份证正反面照片', content: '请保证身份证信息清晰可辩，无遮挡，复印件需加盖印章', image: require('../../assets/icons/id_example.png') },
      { title: '门店头图', content: '需拍出完整的门边、门槛（建议正对门店2米处拍摄）', image: require('../../assets/icons/outdoor_example.png') },
      { title: '店内环境照片', content: '需拍摄店内整体用餐环境（收银台、用餐桌椅等）', image: require('../../assets/icons/indoor_example.png') }
    ];

    console.log('是否上传营业执照:' + this.state.bizCert, '对公/对私账户:' + this.state.personal);

    if (this.state.bizCert) {
      if (this.state.personal) {
        this.setState({
          dataList: publicAccountList,
        });
      } else {
        this.setState({
          dataList: personalAccountList,
        });
      }
    } else {
      this.setState({
        dataList: personalList,
      });
    }
  };

  next = () => {
    const { navigation: { navigate }, account } = this.props;
    const { bizCert, personal } = this.state;
    account.setMerchant({ merchantType: bizCert ? (personal ? '02' : '03') : '01' });
    account.setBankCard({ accountType: personal ? '01' : '02' });
    navigate(personal ? 'StorePersonal' : 'StoreCorporate');
  };

  render() {
    const { navigation: { navigate, goBack } } = this.props;
    const { bizCert, personal, dataList } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header statusBar={true} onPressLeft={() => goBack()} title='店铺基本信息' />
        <ScrollView style={{ flex: 1 }}>
          <WingBlank>
            <View style={{ marginBottom: 24 }}>
              <Text style={[styles.title]}>是否上传营业执照</Text>
              <Text style={[styles.remindTitle]}>如上传营业执照，营业执照法人与银行卡开户人为同一人</Text>
            </View>
    
            <Flex>
              <FlexItem style={[styles.checkbox, bizCert && styles.active]} onPress={this.setBizCert.bind(this, true)}>
                <Text style={[styles.checkboxText, bizCert && styles.textActive]}>上传营业执照</Text>
              </FlexItem>
              <FlexItem style={[styles.checkbox, !bizCert && styles.active, { marginRight: 0 }]} onPress={this.setBizCert.bind(this, false)}>
                <Text style={[styles.checkboxText, !bizCert && styles.textActive]}>不上传营业执照</Text>
              </FlexItem>
            </Flex>
            <View style={{ marginBottom: 30 }}>
              <Text style={[styles.title]}>绑定的银行卡类型是哪种？</Text>
              <Text style={[styles.remindLimitTitle]}>不上传营业执照：线上支付金额，单日单笔限额5000元，单日累计限额20000元</Text>
            </View>  
            <Flex>
              <FlexItem style={[styles.checkbox, personal && styles.active]} onPress={this.setPersonal.bind(this, true)}>
                <Text style={[styles.checkboxText, personal && styles.textActive]}>个人账户</Text>
              </FlexItem>
              { bizCert ? (
                <FlexItem style={[styles.checkbox, !personal && styles.active, { marginRight: 0 }]} onPress={this.setPersonal.bind(this, false)}>
                  <Text style={[styles.checkboxText, !personal && styles.textActive]}>对公账户</Text>
                </FlexItem>
              ):
                <FlexItem />
              }
            </Flex>
          </WingBlank>

          <View style={{ paddingLeft: 16 }}>
            <Text style={[styles.title]}>必备材料</Text>
            <Text style={[styles.materialText, { paddingTop: 4, paddingLeft: 0 }]}>设置前请准备好，建议在店内操作</Text>
          </View>  


          <List>
            {
              dataList.map((item, index) => (

                <Flex>
                  <View style={{ marginLeft: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>            
                      <Text style={{ color: '#1CA7F7', fontSize: 18 }}>
                        {index +1}
.
                      </Text>
                      <Text style={[styles.materialTitle]}>{item.title}</Text>
                    </View>
                    <Text style={[styles.materialText, styles.materialTextWidth]}>{item.content}</Text>
                  </View>
                  <Image 
                    style={{ height: 86, width: 138, marginTop: 18 }} 
                    source={item.image}
                  />
                </Flex>
                
              ))
            }
          </List>


          




          {/* <Flex>
            <View style={{ marginLeft: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>            
                <Text style={{ color: '#1CA7F7', fontSize: 18 }}>1.</Text>
                <Text style={[styles.materialTitle]}>对公账户开户许可证</Text>
              </View>
              <Text style={[styles.materialText, styles.materialTextWidth]}>请保证证件信息清晰可辩，无遮挡</Text>
            </View>
            <Image 
              style={{ height: 86, width: 138, marginTop: 18 }} 
              source={require('../../assets/icons/openaccount_example.png')}
            />
          </Flex>

          <Flex>
            <View style={{ marginLeft: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#1CA7F7', fontSize: 18 }}>2.</Text>
                <Text style={[styles.materialTitle]}>营业执照照片</Text>
              </View>
              <Text style={[styles.materialText, styles.materialTextWidth]}>需在有效期内，资料清晰可辩，复印件需加盖印章</Text>
            </View>
            <Image 
              style={{ height: 86, width: 138, marginTop: 18 }} 
              source={require('../../assets/icons/license_example.png')}
            />
          </Flex>

          <Flex>
          
            <View style={{ marginLeft: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#1CA7F7', fontSize: 18 }}>3.</Text>
                <Text style={[styles.materialTitle]}>法人身份证正反面照片</Text>
              </View>
              <Text style={[styles.materialText, styles.materialTextWidth]}>请保证身份证信息清晰可辩，无遮挡，复印件需加盖印章</Text>
            </View>
            <Image 
              style={{ height: 86, width: 138, marginTop: 18 }} 
              source={require('../../assets/icons/id_example.png')}
            />
          </Flex>

          <Flex>
            <View style={{ marginLeft: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#1CA7F7', fontSize: 18 }}>4.</Text>
                <Text style={[styles.materialTitle]}>门店头图</Text>
              </View>
              <Text style={[styles.materialText, styles.materialTextWidth]}>需拍出完整的门边、门槛（建议正对门店2米处拍摄）</Text>
            </View>
            <Image 
              style={{ height: 86, width: 138, marginTop: 18 }} 
              source={require('../../assets/icons/outdoor_example.png')}
            />
          </Flex>

          <Flex>
            <View style={{ marginLeft: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#1CA7F7', fontSize: 18 }}>5.</Text>
                <Text style={[styles.materialTitle]}>店内环境照片</Text>
              </View>
              <Text style={[styles.materialText, styles.materialTextWidth]}>需拍摄店内整体用餐环境（收银台、用餐桌椅等）</Text>
            </View>
            <Image 
              style={{ height: 86, width: 138, marginTop: 18 }} 
              source={require('../../assets/icons/indoor_example.png')}
            />
          </Flex> */}

        </ScrollView>
        <Button onPress={this.next} type="primary" radius={false}>我准备好了</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#333333',
    fontSize: 18,
    marginTop: 24,
  },
  remindTitle: {
    color: '#666666',
    fontSize: 12,
    paddingTop: 6,
  },
  remindLimitTitle: {
    color: '#F96E15',
    fontSize: 12,
    paddingTop: 6,
  },
  materialTitle: {
    color: '#333333',
    fontSize: 14,
    paddingLeft: 4
  },
  materialText: {
    color: '#999999',
    fontSize: 14,
    paddingTop: 6,
    paddingLeft: 16,
  },
  materialTextWidth: {
    width: 220,
  },
  checkbox: {
    borderRadius: 4,
    borderWidth: 1,
    marginRight: 10,
    height: 44,
    justifyContent: 'center',
    borderColor: '#999999',
  },
  active: {
    borderColor: theme.$global_base,
  },
  checkboxText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#999999',
  },
  textActive: {
    color: theme.$global_base,
  }
});

export default StoreApply;