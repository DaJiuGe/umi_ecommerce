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
export async function addUser(data) {
  return request.post(`/api/admin/users`, { data });
}
export async function updateUser(uid, data) {
  return request.put(`/api/admin/users/${uid}`, { data });
}
export async function queryCurrent() {
  return request('/api/admin/user');
}
export async function queryNotices() {
  return request('/api/notices');
}
