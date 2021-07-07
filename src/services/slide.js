import request from '@/utils/request';

export const getSlides = async () => {
  return request.get('/api/admin/slides');
};

export const getSlideDetail = async (id) => {
  return request.get(`/api/admin/slides/${id}`);
};

export const addSlide = async (data) => {
  return request.post(`/api/admin/slides`, { data });
};

export const updateSlide = async (id, data) => {
  return request.put(`/api/admin/slides/${id}`, { data });
};

export const deleteSlide = async (id) => {
  return request.delete(`/api/admin/slides/${id}`);
};

export const seqSlide = async (id, params) => {
  return request.patch(`/api/admin/slides/${id}/seq`, { params });
};

export const updateSlideStatus = async (id) => {
  return request.patch(`/api/admin/slides/${id}/status`);
};
