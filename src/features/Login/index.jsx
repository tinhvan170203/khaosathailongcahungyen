import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import { CircularProgress } from '@mui/material';
import AOS from "aos";
import "aos/dist/aos.css";
import { loginAccount } from '../../auth/authSlice';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from 'react-router-dom';
function Login() {
  const [tentaikhoan, setUsername] = useState('');
  const [matkhau, setPassword] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate()

  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const handleLogin = async () => {
    const action = loginAccount({tentaikhoan, matkhau});
    try {
      const resultAction = await dispatch(action);
      const data = unwrapResult(resultAction);
     
      toast.success('Đăng nhập thành công', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      Cookies.remove("refreshToken_khaosathailong");
      Cookies.set("refreshToken_khaosathailong", data.refreshToken, {
        expires: 7,
        secure: true,
      });
      navigate("/dashboard/thong-ke");
    } catch (error) {
          
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (

      <div className='flex items-center min-h-screen justify-center bg-blue-500'>
        <form className='p-8 shadow-xl  rounded-lg  border border-white bg-white' data-aos="fade-right">
          <div className='flex items-center justify-center space-x-2 mb-2'>
            <img src="/conganhieu.png" alt="logo" className='w-[100px]'/>
          </div>
          
          <h3 className='font-bold text-center text-black' style={{textShadow: "2px 2px 1px #fff"}}>
          Khảo sát sự hài lòng của công dân khi thực hiện <br></br> dịch vụ công trực tuyến tại Công an tỉnh Hưng Yên
          </h3>
          <hr />
          <div className='flex flex-col my-2 mt-8'>
            {/* <span className='text-md text-black font-bold mb-1'>Tên đăng nhập</span> */}
            <input defaultValue={tentaikhoan} type="text" placeholder='Tài khoản...' 
                    className='w-full outline-none my-2 p-2 rounded-md 
                     bg-slate-500 text-black' 
                    onChange={(e)=> setUsername(e.target.value)}
            />
          </div>
          <div className='flex flex-col my-2 mb-4'>
            {/* <span className='text-md text-black font-bold mb-1'>Mật khẩu</span> */}
            <input defaultValue={matkhau} type="password" placeholder='Mật khẩu...' 
                    className='w-full outline-none my-2 p-2 rounded-md
                   bg-slate-500 text-black'
                     onChange={(e)=> setPassword(e.target.value)}
            />
          </div>

            {isSubmit && (
              <div className='text-center'><CircularProgress /></div>
            )}

          <Button variant="contained" className='w-full' color="primary" onClick={handleLogin} disabled={isSubmit}>
            Đăng nhập
          </Button>

          {/* <p className='text-sm text-center mt-4 text-black'>Ứng dụng chuyển đổi số trong công tác công an tại công an cấp tỉnh</p> */}
          <p className='text-sm text-center underline mt-4 underline-offset-4 text-black'>Bản quyền thuộc về Đội Công nghệ thông tin - Công an tỉnh Hưng Yên</p>
         
        </form>
    </div>
  )
}

export default Login
