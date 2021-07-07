import { handleActions } from 'redux-actions';

const TenantList = handleActions({
  TENANT_LIST_UPDATE_COMPLETED: (perData, action) => ({
    ...perData,
    listData: action.payload,
  }),
  TENANT_LIST_SELECT_CHANGED: (perData, action) => ({
    ...perData,
    defaultTenant: action.payload,
  }) }, {
    listData: [],
    defaultTenant: {},
  });

export default TenantList;
