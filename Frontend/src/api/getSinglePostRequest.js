import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });


export const getSinglePost = (id) => API.get(`/post/${id}/getSinglePost`);

