import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });


export const getNotifications = (userId) => API.get(`/NotificationRoutes/${userId}`);