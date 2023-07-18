import axios from "axios";


const baseURL = import.meta.env.VITE_baseURL;
const userBaseURL = baseURL;
const trainerBaseURL = `${baseURL}/trainer`;
const adminBaseURL = `${baseURL}/admin`;

const createAxiosInstance = (baseURL) =>{
    const instance = axios.create({
        baseURL,
        timeout:20000,
        timeoutErrorMessage:'Request Timeout... Please try again!..'
    })
    return instance;
}

const attachToken = (req, tokenName) => {
    let authToken = localStorage.getItem(tokenName)
    if (authToken) {
      req.headers.Authorization = `Bearer ${authToken}`
    }
    return req
  }
  
  const userAxiosInstance = createAxiosInstance(userBaseURL)
  userAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req,"token")
    return modifiedReq
  })

  const trainerAxiosInstance = createAxiosInstance(trainerBaseURL)
  trainerAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req,"token")
    return modifiedReq
  })

  const adminAxiosInstance = createAxiosInstance(adminBaseURL)
  adminAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req,"token")
    return modifiedReq
  })