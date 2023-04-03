import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

const apiFetch = (url, data, config = {}) => {
  const accessToken = localStorage.getItem('token');
  if (accessToken) {
    config.headers = { Authorization: `Bearer ${accessToken}` };
  }
  return api.post(url, data, config).then((res) => res.data);
};

export default apiFetch;
