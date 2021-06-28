import request from '@/utils/request';

export async function login(data) {
  return request('/api/auth/login', {
    method: 'POST',
    data,
  });
}

export async function logout() {
  return request('/api/auth/logout', {
    method: 'POST',
  });
}
