import { history } from 'umi';
import { login, logout } from '@/services/login';
import { message } from 'antd';

const Model = {
  namespace: 'login',
  state: {},
  effects: {
    *login({ payload }, { call, put }) {
      // loading
      const loading = message.loading('登录中...');

      const response = yield call(login, payload);
      if (response.status === undefined) {
        message.success('登录成功');
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        }); // Login successfully

        // 跳转到首页
        history.replace('/');
      }

      loading();
    },

    *logout(_, { call }) {
      // loading
      const loading = message.loading('退出中...');

      const response = yield call(logout);
      if (response.status === undefined) {
        message.success('退出成功');
        localStorage.removeItem('access_token');
        localStorage.removeItem('userInfo');
        history.replace('/login');
      }

      loading();
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      localStorage.setItem('access_token', payload.access_token);
      // setAuthority(payload.currentAuthority);
      return { ...state };
    },
  },
};
export default Model;
