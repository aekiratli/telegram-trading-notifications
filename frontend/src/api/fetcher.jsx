import axios from 'axios';

axios.defaults.withCredentials = true;

export const api = axios.create({
  baseURL:'http://localhost:5007/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

const apiFetch = (url, data, config) => {
  return api.post(url, data, config).then(res => res.data);
};

export default apiFetch;
