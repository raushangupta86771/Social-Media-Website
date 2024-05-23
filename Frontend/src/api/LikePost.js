import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });


export const likePost = (id, userId, deviceToken,sender_image) => API.put(`/post/${id}/like`, { userId: userId, deviceToken ,sender_image}); //userId which we are sending, 1st userId is database waala 2nd frontend wwaala
// export const likePost=(id, userId)=>API.put(`posts/${id}/like`, {userId: userId})

