import axios from 'axios';
var env = process.env.NODE_ENV || 'development';

export const SERVER_NODE = 'SERVER_NODE';
export const SERVER_RUST = 'SERVER_RUST';

const getAxios = (type: String) => {
  axios.defaults.baseURL =
    env === 'development'
      ? `http://localhost:${type === SERVER_NODE ? 5000 : 8000}/api`
      : '/api';
  return axios;
};

export default getAxios;
