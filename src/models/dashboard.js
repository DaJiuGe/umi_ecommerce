import { fetchDashboard } from '@/services/dashboard';

export default {
  namespace: 'dashboard',
  state: {
    usersCount: 0,
    goodsCount: 0,
    orderCount: 0,
  },
  effects: {
    *fetchDashboard(_, { call, put }) {
      const response = yield call(fetchDashboard);
      if (response.status === undefined) {
        yield put({
          type: 'setDashboard',
          payload: response,
        });
      }
    },
  },
  reducers: {
    // 这里传的是action而不是payload
    setDashboard: (state, action) => {
      return {
        ...state,
        usersCount: action.payload.users_count,
        goodsCount: action.payload.goods_count,
        orderCount: action.payload.order_count,
      };
    },
  },
};
