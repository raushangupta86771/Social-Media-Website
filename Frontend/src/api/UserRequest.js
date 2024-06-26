import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });


export const getUser = (userId) => API.get(`/user/${userId}`);
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);
export const getAllUser = () => API.get(`/user`);
export const followUser = (id, data) => API.put(`/user/${id}/follow`, { _id: data });
export const unfollowUser = (id, data) => API.put(`/user/${id}/unfollow`, { _id: data });
