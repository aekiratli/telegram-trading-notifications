import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5007/api/v1',
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
