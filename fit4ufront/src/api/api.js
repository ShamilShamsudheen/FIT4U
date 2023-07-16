import axios from 'axios';

// Create an instance of Axios with custom configuration
export const UserApi = axios.create({
  baseURL: 'http://localhost:3000/', // Replace with your base URL
  // Other custom configurations if needed
});
export const AdminApi = axios.create({
  baseURL: 'http://localhost:3000/admin/',
});
export const TrainerApi = axios.create({
  baseURL: 'http://localhost:3000/trainer/',
});

