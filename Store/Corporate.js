import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Header, List, Button, Flex, InputItem } from '@mc/mcrn'
import navigator from '../../components/navigator'
import { inject, observer } from "mobx-react/native";
import theme from "../../theme";

const Item = List.Item;
const FlexItem = Flex.Item;
const Brief = Item.Brief;

@navigator
@inject('account')
@observer
class StoreCorporate extends Component {

  constructor(props) {
    super(props);
    const { bankCard, merchant } = this.props.account;
    this.state = {
      bankCard: bankCard.bankCardNo,
      name: bankCard.bankCertName,
      phone: merchant.principalMobile,
      wx: '',
      identity: '',
      photoList: []
    }
  }

  next = () => {
    const { navigation: { navigate, goBack }, account } = this.props;
    navigate(account.merchant != '01' ? 'StoreBizCert' : 'StoreInfo')
  };

  render() {
    const { navigation: { navigate, goBack } } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header statusBar={true} onPressLeft={() => goBack()} title='填写收款账户' />
        <ScrollView style={{ flex: 1 }}>
          <Item>
            填写对公账号信息
            <Brief>需为营业执照的法人名下对公账户</Brief>
          </Item>
          <Item
            extra={<Text style={styles.link} onPress={() => navigate('')}>查看示例</Text>}
          >
            开户许可证
          </Item>
          <InputItem
            labelNumber={7}
            placeholder={'请输入'}
          >
            银行账号
          </InputItem>
          <InputItem
            labelNumber={7}
            placeholder={'请输入联行号'}
          >
            联行号
          </InputItem>
          <InputItem
            labelNumber={7}
            placeholder={'请输入账号名称'}
          >
            对公账号名称
          </InputItem>
          <InputItem
            placeholder={'开户人实名验证微信号'}
            labelNumber={7}
          >
            开户人微信
          </InputItem>
          <Item
            border={false}
            height={20}
            extra={<Text style={styles.link} onPress={() => navigate('')}>如何找到微信号，查看示例</Text>} />
          <Item
            extra={<Text style={styles.link} onPress={() => navigate('')}>查看示例</Text>}
          >
            上传证件照片
            <Flex>
              <FlexItem></FlexItem>
              <FlexItem></FlexItem>
            </Flex>
          </Item>
          <InputItem
            placeholder={'请输入姓名'}
            labelNumber={7}
          >
            法人代表姓名
          </InputItem>
          <InputItem
            placeholder={'请输入身份证号'}
            labelNumber={7}
          >
            身份证号
          </InputItem>
        </ScrollView>
        <Button onPress={this.next} type={'primary'} radius={false}>下一步</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  link: {
    fontSize: 12,
    color: theme.$global_base,
  }
});

export default StoreCorporate