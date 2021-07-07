import { handleActions } from 'redux-actions';
/*  eslint-disable */
const AccountActions = handleActions({
  USER_ACCOUNT_RESET_SHOP(preData, action) {
    return {
      ...preData,
      ...action.payload,
    };
  },
  USER_ACCOUNT_LOGIN_COMPLETED(preData, action) {
    return {
      ...action.payload,
    };
  },
  USER_ACCOUNT_LOGIN_FAILED(preData, action) {
    return {
      ...action.payload,
    };
  },
  USER_ACCOUNT_INFO_UPDATE_COMPLETED(preData, action) {
    return {
      ...preData,
      ...action.payload,
    };
  },
  USER_ACCOUNT_REGIST_COMPLETED(preData, action) {
    return {
      ...action.payload,
    };
  },
  USER_ACCOUNT_RESET_PWD_COMPLETED(preData, action) {
    return {
      ...action.payload,
    };
  },
  USER_ACCOUNT_LOGOUT(preData, action) {
    return {
      ...preData,
      userToken: '',
    };
  },
}, {
  user_id: '',
  phone: '',
  token: '',
});

export default AccountActions;
