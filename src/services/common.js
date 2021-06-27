import request from '@/utils/request';

export const getOSSConifg = async () => {
  return request.get('/api/auth/oss/token');
};
