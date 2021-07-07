import request from '@/utils/request';

export async function getComments(params) {
  return request('/api/admin/comments', { params });
}

export async function getCommentDetail(id, params) {
  return request(`/api/admin/comments/${id}`, { params });
}

export async function replyComment(id, data) {
  return request.patch(`/api/admin/comments/${id}/reply`, { data });
}
