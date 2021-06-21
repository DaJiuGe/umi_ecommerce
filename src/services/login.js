import request from '@/utils/request';

export async function login(params) {
  return request('/api/auth/login', {
    method: 'POST',
    data: params,
  });
}

export async function logout() {
  return request('/api/auth/logout', {
    method: 'POST',
  });
}
