import request from '@/utils/request';

export async function getUsers(params) {
  return request('/api/admin/users', { params });
}
export async function lockUser(uid) {
  return request.patch(`/api/admin/users/${uid}/lock`);
}
export async function getUser(uid) {
  return request.get(`/api/admin/users/${uid}`);
}
export async function addUser(params) {
  return request.post(`/api/admin/users`, { data: params });
}
export async function updateUser(uid, params) {
  return request.put(`/api/admin/users/${uid}`, { data: params });
}
export async function queryCurrent() {
  return request('/api/admin/user');
}
export async function queryNotices() {
  return request('/api/notices');
}
