import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:2202/api/v1',
});



export default instance;
