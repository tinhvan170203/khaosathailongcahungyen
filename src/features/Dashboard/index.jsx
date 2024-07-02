import React, { useState, useEffect, useRef } from 'react'
import MenuParent from './components/MenuParent';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import DehazeIcon from '@mui/icons-material/Dehaze';
import Person4Icon from '@mui/icons-material/Person4';
import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom';
import ModalLoading from '../../components/ModalLoading';
import ManIcon from '@mui/icons-material/Man';
import { IconButton } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { logoutAccount } from '../../auth/authSlice';
import { unwrapResult } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import DialogChangePassword from './components/DialogChangePassword';
import authApi from '../../api/authApi';
import KeyIcon from '@mui/icons-material/Key';
import LogoutIcon from '@mui/icons-material/Logout';


const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [openChangePass, setOpenChangePass] = useState(false);
  // let user = useSelector(state => state.authReducer.user)
  let id_user = useSelector(state => state.authReducer.id_user)
  // if(!user){
  //   return <Navigate to="/login" />
  // };


  const handleLoading = (boolane) => {
    setLoading(boolane)
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [openTask, setOpenTask] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    console.log(newOpen)
    setOpenTask(newOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const action = logoutAccount();
    try {
      const resultAction = await dispatch(action);
      const data = unwrapResult(resultAction);
      // Cookies.remove("refreshToken_khaosathailong");
      navigate("/login");
      toast.success("Đăng xuất tài khoản thành công.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      toast.error("Lỗi xảy ra khi đăng xuất tài khoản", {
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

  const handleSubmitChangePass = async (values) => {
    const action = logoutAccount();
    try {
      let res = await authApi.changePass({ ...values, id: id_user });
      console.log(res)
      const resultAction = await dispatch(action);
      const data = unwrapResult(resultAction);
      Cookies.remove("refreshToken_khaosathailong");
      navigate("/login");
      toast.success("Đổi mật khẩu thành công,. Vui lòng đăng nhập lại", {
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
      // navigate("/login");
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

  const handleCloseDialogChangePass = () => {
    setOpenChangePass(false)
  };

  return (
    <div>
      {/* menu  */}
      <Drawer open={openTask} onClose={toggleDrawer(false)}>
        <div className='w-[280px] min-h-full overflow-y-scroll no-scrollbar'>
          <div className='flex justify-between bg-blue-800 items-center px-4 py-[6px]'>
            <div className='flex items-center space-x-2'>
              <img src="/cong-an-hieu.png"
                alt="logo" className='w-10' />
              <div className='flex flex-col items-center'>
                {/* <span className='text-white uppercase text-[12px]'>Công an tỉnh Hưng Yên</span> */}
                <span className='text-white uppercase text-[12px]'>Quản trị hệ thống</span>
              </div>
            </div>

          </div>


          <ul className='p-2 pb-20'>
            <li className='hover:bg-blue-300 hover:text-white transition duration-300 hover:cursor-pointer border-b'>
              <MenuParent groupName="Phân hệ Admin" iconGroup={<ManageAccountsIcon sx={{ fontSize: '18px' }} />}
                options={[
                  { name: "Quản lý tài khoản", icon: <SupervisorAccountIcon sx={{ fontSize: "18px" }} />, link: "/dashboard/tai-khoan" },
                  { name: "Quản lý đơn vị", icon: <VpnKeyIcon sx={{ fontSize: "18px" }} />, link: "/dashboard/don-vi" },
                  { name: "Báo cáo thống kê", icon: <ManIcon sx={{ fontSize: "18px" }} />, link: "/dashboard/thong-ke" },
                ]}
              />
            </li>
            <li className='pl-2 py-2 flex space-x-1 items-end w-full hover:bg-blue-300 hover:text-white transition duration-300 hover:cursor-pointer'
              onClick={() => {
                 handleLogout()
                setOpenTask(false)
              }}>
              <LogoutIcon style={{ marginRight: "4px", fontSize: "18px" }} />
              <span className='text-[14px] font-semibold'>Đăng xuất</span>
            </li>
          </ul>

        </div>
      </Drawer>
      {/* end menu  */}

      <div className='relative'>
        <div className='flex justify-between absolute z-10 top-0 right-0 left-0 bg-blue-600 h-[68px] items-center px-2 space-x-2'>
          <div>
            <IconButton onClick={() => setOpenTask(true)}>
              <DehazeIcon sx={{ fontSize: "28px", color: "#fff" }} />
            </IconButton>
            <span className='font-bold text-white'>Khảo sát sự hài lòng trên dịch vụ công trực tuyến</span>
          </div>
          <div className='flex space-x-1 items-center hover:cursor-pointer'
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}>
            <Person4Icon sx={{ fontSize: "24px", color: "#fff" }} />
            <span className='text-white text-sm'><span className='text-sm'>{ }</span></span>
          </div>

        </div>

        <ModalLoading open={loading} />
        {/* main right */}
        <div className='pt-[68px]'>
          <Outlet context={[handleLoading]} />

          <div className='bg-blue-600 text-center px-1 py-2 mb-4 mt-4'>
            <div className='flex justify-center'>
            <img src="/cong-an-hieu.png" className='w-20' />
            </div>
            <h4 className='text-white font-normal text-[18px] uppercase'>Công an tỉnh Hưng Yên</h4>
            <h4 className='text-white font-normal text-[14px]'>Bản quyền thuộc về đội Công nghệ thông tin - PV01</h4>
            <p className='text-white text-[13px]'>@2024: <span className='font-bold italic text-[12px]'>Design by Vũ Văn Tính</span></p>
          </div>

        </div>
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {
          setOpenChangePass(true)
          handleClose()
        }}>
          <KeyIcon style={{ marginRight: "8px" }} /> Đổi mật khẩu</MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon style={{ marginRight: "8px" }} /> Đăng xuất tài khoản</MenuItem>
      </Menu>

      <DialogChangePassword
        open={openChangePass}
        onSubmit={handleSubmitChangePass}
        onCloseDialogChangePass={handleCloseDialogChangePass}
      />
    </div>
  )
}

export default Dashboard
