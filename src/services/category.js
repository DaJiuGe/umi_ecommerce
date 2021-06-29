import request from '@/utils/request';

export async function getCategories(params) {
  return request('/api/admin/category', { params });
}

export async function getCategoryDetail(id) {
  return request(`/api/admin/category/${id}`);
}

export async function lockCategory(id) {
  return request.patch(`/api/admin/category/${id}/status`);
}

export async function addCategory(data) {
  return request.post(`/api/admin/category`, { data });
}

export async function updateCategory(id, data) {
  return request.put(`/api/admin/category/${id}`, { data });
}
