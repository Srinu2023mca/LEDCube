import axios from 'axios';

// Create an Axios instance with a base URL
const Axios = axios.create({
    // baseURL: 'http://localhost:5002/', // Replace with your API's base URL
    baseURL: 'https://ledcube-server.onrender.com/',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  
  export default Axios;