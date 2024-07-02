import axios from 'axios'
import jwt_decode from "jwt-decode"
import Cookies from 'js-cookie';



const axiosConfig = axios.create({
    baseURL: 'https://khaosathailong.vercel.app/',
    headers: {
    // 'Content-Type': 'multipart/form-data',
    },
    withCredentials: true, // Để request gửi kèm cookie
});

//Interceptors : nơi làm gì đấy cho tất cả các request hoặc respone thì gắn interceptors
// Add a request interceptor

let refreshTokenRequest = null;
axiosConfig.interceptors.request.use(async function (config) {
    // Do something before request is sent
    //TH login hoặc refreshToken thì k cần kiểm 
    if(config.url.indexOf('login') >= 0 || config.url.indexOf('refresh') >= 0 || config.url.indexOf('change-pass') >= 0){
      return config
    };

    // let date = new Date();

    const accessToken = localStorage.getItem('accessToken_khaosathailong');
    if(accessToken){
      config.headers.token = `Bearer ${accessToken}`;
    }


    return config;
  }, function (error) {
    // console.log(error.message)
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosConfig.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // status = 401, 403, 500 thì hiện thông báo và return k làm gì tiếp theo
    // console.log('hihi',response)
    
    return response;
  }, function (error) {
    console.log(error)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const {config, data, status} = error.response;
    // console.log(error)
    // console.log(config, data, status)
    if(data.message === "Token is not valid" || 
    data.message === "You are not authenticated"  ||
    data.message === "Token đã hết hạn, vui lòng đăng nhập lại"  ||
    config.ulr === "auth//requestRefreshToken" &&  status === 403  ){
      throw new Error("Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại")
    } 

    return Promise.reject(error.response.data);
  });



export default axiosConfig;
