import request from '@/utils/request';

export const fetchDashboard = async () => {
  return request.get('/api/admin/index');
};
