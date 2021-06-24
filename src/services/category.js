import request from '@/utils/request';

export async function getCategories(params) {
  return request('/api/admin/category', { params });
}
