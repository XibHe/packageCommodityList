import { handleActions } from 'redux-actions';

const PriceList = handleActions({
  PRICE_LIST_UPDATAE_COMPLETED(preData, action) {
    return {
      ...preData,
      list: action.payload,
    };
  },
  CITY_LIST_UPDATAE_COMPLETED(preData, action) {
    return {
      ...preData,
      cities: action.payload,
    };
  },
  PRICE_LIST_CITY_SELECT(preData, action) {
    return {
      ...preData,
      selectedCity: action.payload,
    };
  },
}, {
  list: [],
  cities: [],
  selectedCity: {},
});

export default PriceList;
