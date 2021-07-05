import request from '@/utils/request';

export async function getOrders(params) {
  return request('/api/admin/orders', { params });
}

export async function getOrderDetail(id, params) {
  return request(`/api/admin/orders/${id}`, { params });
}

export async function postOrder(id) {
  return request.patch(`/api/admin/orders/${id}/post`);
}
