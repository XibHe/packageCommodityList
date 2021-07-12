import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { Alert, List, Tag, Button, WingBlank, WhiteSpace, Toast, portal } from '@mc/mcrn'
import navigator from '../../components/navigator'
import MCIcon from '../../components/MCIcon'
import Header from '../../components/Header'
import * as storeSrv from '../../api/store'
import { inject, observer } from "mobx-react/native";

const Item = List.Item;
const Brief = Item.Brief;

@navigator
@inject('global', 'account')
@observer
class StoreList extends Component {
  state = {
    stores: [],
    selected: {}
  };

  componentDidMount() {
    const { global } = this.props;
    this.setState({
      selected: {
        'store_id': global.app.userInfo.employeeInfo.store_id,
        'is_registered_mjt': 1
      }
    });
    this.fetchStoreList();
  }

  resetStore = () => {
    const { is_registered_mjt, store_id } = this.state.selected;
    const { global, account, navigation } = this.props;
    const key = Toast.loading('切换中');
    (is_registered_mjt == 1 ?
      storeSrv.changeStore(store_id) :
      storeSrv.registerStore(store_id)
    ).then(rep => {
      if(rep.data.isNewRegistered) {
        account.setStoreInfo(rep.data)
        navigation.navigate('StoreGuid')
      } else {
        global.changeStore(rep.data)
      }
      portal.remove(key)
    })
  };

  fetchStoreList() {
    storeSrv
      .fetchList()
      .then(rep => {
        this.setState({ stores: rep.data })
      })
  }

  selectedItem = (item) => {
    this.setState({ selected: item })
  }

  render() {
    const { stores, selected } = this.state;
    const { goBack } = this.props.navigation;
    return (
      <View style={{ flex: 1, backgroundColor : '#F5F5F5' }}>
        <Header onPressLeft={() => goBack()} title='选择门店' />
        <Alert msg={'选择门店后，会自动开通该门店的美家通服务'} />
          <List style={{ flex: 1 }}>
          {
            stores.map((item, index) => (
              <Item
                height={64}
                border={index != stores.length - 1}
                onPress={this.selectedItem.bind(this, item)}
                extra={(
                  item.is_registered_mjt == 1
                    ? <Tag text={item.role_name}></Tag>
                    : <Tag text='未开通' style={{ backgroundColor:'#D8D8D8' }}></Tag>
                )}
                thumb={
                  <MCIcon
                    icon={`checkbox_${item.store_id == selected.store_id ? 'checked' : 'unChecked'}`}
                    size={16}
                    style={{ marginRight: 12 }}
                  />
                }
              >
                <Text>{item.store_name}</Text>
                <WhiteSpace size={'sm'}/>
                <Brief>{item.address}</Brief>
              </Item>
            ))
          }
          </List>
        <WhiteSpace size={12}/>
        <WingBlank size={'lg'}>
          <Button type={'primary'} onPress={this.resetStore}>确定</Button>
        </WingBlank>
        <WhiteSpace size={12}/>
      </View>
    );
  }
}


export default StoreList