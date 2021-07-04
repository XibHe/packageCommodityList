import { StyleSheet, StatusBar } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: StatusBar.currentHeight || 0,
  },
  orderContainer: {
    flex: 1,
    flexDirection: 'column',
    // paddingTop: 8
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    //   marginVertical: 8,
    // marginHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row'
  },
  goodImage: {
    paddingTop: 6,
    marginLeft: 6,
    width: 50,
    height: 50,
  },
  itemRightContent: {
    flex: 1,
    justifyContent: 'space-between',
    left: 6,
    fontSize: 12,
    color: '#333333'
  },
  listHeader: {
    flexDirection: 'row',
    height: 48,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  orderPackageItem: {
    marginTop: 0,
    color: '#9F9F9F',
    height: 62
  },
  orderSSUView: {
    marginTop: 6
  },
  shopName: {
    paddingLeft: 14,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333'
  },
  deliveryName: {
    paddingLeft: 0,
    fontSize: 14,
    color: '#333333'
  },
  goodNameText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    flex: 1
  },
  iconImageText: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 3,
    marginRight: 8,
    alignItems: 'center'
  }
})

export default styles
