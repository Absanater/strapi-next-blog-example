import axios from 'axios';

const apiRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BLOG_API
})

export const fetcher = (url) => apiRequest(url).then((res) => res.data);

export default apiRequest;
