// api.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_baseURL;
const userBaseURL = baseURL;
const trainerBaseURL = `${baseURL}trainer`;
const adminBaseURL = `${baseURL}/admin`;

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 20000,
    timeoutErrorMessage: 'Request Timeout... Please try again!..',
  });
  return instance;
};

const attachToken = (req, tokenName) => {
  let authToken = localStorage.getItem(tokenName);
  if (authToken) {

    req.headers.Authorization = `Bearer ${authToken}`;
  }
  return req;
};

// User Axios Instance
export const userAxiosInstance = createAxiosInstance(userBaseURL);
userAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, 'userToken');
  return modifiedReq;
});

// Trainer Axios Instance
export const trainerAxiosInstance = createAxiosInstance(trainerBaseURL);
trainerAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, 'trainerToken');
  console.log(modifiedReq)
  return modifiedReq;
});

// Admin Axios Instance
export const adminAxiosInstance = createAxiosInstance(adminBaseURL);
adminAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, 'adminToken');
  return modifiedReq;
});
