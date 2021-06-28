import request from '@/utils/request';

export async function getGoods(params) {
  return request.get('/api/admin/goods', { params });
}
export async function addGoods(params) {
  return request.post(`/api/admin/goods`, { data: params });
}
export async function getGoodsDetail(id) {
  return request.get(`/api/admin/goods/${id}?include=category`);
}
export async function updateGoods(id, params) {
  return request.put(`/api/admin/goods/${id}`, { data: params });
}
export async function onGoods(id) {
  return request.patch(`/api/admin/goods/${id}/on`);
}
export async function recommendGoods(id) {
  return request.patch(`/api/admin/goods/${id}/recommend`);
}
