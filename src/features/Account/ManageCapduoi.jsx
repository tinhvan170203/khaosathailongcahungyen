import GridView from '@mui/icons-material/GridView'
import React, { useState, useEffect, useMemo } from 'react'
import { Button, IconButton, Paper } from '@mui/material';
import Switch from '@mui/material/Switch';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import querystring from "query-string";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import authApi from '../../api/authApi';
import { useOutletContext } from "react-router-dom";
import RoleItem from './components/RoleItem';
import roleApi from '../../api/roleApi';
import { useSelector } from 'react-redux';
import Select from 'react-select';
const checkedAll = (accountsDisplay, roles) => {
  let count = 0;
  accountsDisplay.forEach(i => {
    if (roles.includes(i.value)) {
      count += 1
    }
  })
  return count === accountsDisplay.length
}
const ManageCapduoi = () => {
  const [roles, setRoles] = useState([]); // danh sach id tai khoan cap duoi thuoc quyen
  const [checkAll, setCheckAll] = useState(false);
  const [userChoiced, setUserChoiced] = useState(null);
  const [accounts, setAccounts] = useState([]); // data for select 
  const [accountsDisplay, setAccountsDisplay] = useState([]); // data hien thi 
  const [search, setSearch] = useState('');
  const [handleLoading] = useOutletContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    resetField,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {

    },
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await authApi.getUsers();
        setAccounts(res.data.map(i => ({ value: i._id, label: i.tentaikhoan })));
        // setRoles(res.data.map(i => ({ value: i._id, name: i.tentaikhoan })));
        setAccountsDisplay(res.data.map(i => ({ value: i._id, name: i.tentaikhoan })));
      } catch (error) {
        if (
          error.message ===
          "Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại"
        ) {
          navigate("/login");
          toast.error(error.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
             pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        console.log(error.message)
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCapduoi = async () => {
      try {
        let res = await authApi.getManages(userChoiced)
        setCheckAll(checkedAll(accountsDisplay, res.data))
        setRoles(res.data)
      } catch (error) {
        console.log(error.message)
        if (
          error.message ===
          "Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại"
        ) {
          navigate("/login");
          handleLoading(false);
          toast.error(error.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    };

    if (userChoiced) {
      fetchCapduoi()
    }
  }, [userChoiced])

  //debounced input search
  useEffect(() => {
    if (accounts.length > 0) {
      const timer = setTimeout(() => {
        let arr = [...accounts];
        let newArr = arr.filter(i => i.label.toLowerCase().includes(search.toLowerCase())).map(e => ({
          value: e.value,
          name: e.label,
          isChecked: e.isChecked
        }));
        setAccountsDisplay(newArr)
        setCheckAll(checkedAll(newArr, roles))
      }, 500);
      return () => clearTimeout(timer)
    }
  }, [search]);

  //change checkbox
  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      if (checked) {
        let arr = [...roles];
        let tempRole = accountsDisplay.map(role => {
          return role.value
        });
        setRoles(Array.from(new Set(arr.concat(tempRole))))
        setCheckAll(true)
      } else { //bo check tat ca
        let arr1 = [...roles]
        accountsDisplay.forEach(acc => {
          let index = arr1.indexOf(acc.value);
          arr1.splice(index, 1)
        });
        setRoles(arr1);
        setCheckAll(false)
      }
    } else {
      if (checked) {
        let arr1 = [...roles];
        arr1.push(name);
        setRoles(arr1);
        setCheckAll(checkedAll(accountsDisplay, arr1))
      } else {
        let arr = [...roles];
        let index = arr.indexOf(name);
        arr.splice(index, 1)
        setRoles(arr);
        setCheckAll(false)
      }
    }
  };
  //    //fetch roles
  //    useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         handleLoading(true);
  //         let res = await roleApi.getRoles();

  //         setRoles(res.data);
  //         setTimeout(() => {
  //           handleLoading(false);
  //         }, 400);
  //       } catch (error) {
  //         if (
  //           error.message ===
  //           "Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại"
  //         ) {
  //           navigate("/login");
  //           handleLoading(false);
  //           toast.error(error.message, {
  //             position: "top-center",
  //             autoClose: 2000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //              pauseOnHover: false,
  //             draggable: true,
  //             progress: undefined,
  //             theme: "light",
  //           });
  //         }
  //         console.log(error.message)
  //       }
  //     };

  //     fetchData();
  //   }, []);
  //handle submit add role group
  const onSubmit = async (values) => {
  try {
      let res = await authApi.saveManages(userChoiced, {quantricapduoi: roles});

      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
         pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const rolesList = useSelector((state) => state.authReducer.roles_quanlydoanvien);
  return (
    <div data-aos="fade-left" data-aos-once="true">
      <div className='flex items-center space-x-1 ml-2'>
        <GridView color='primary' fontSize="small" />
        <h4 className='font-bold text-black text-md'>Phân quyền quản lý cấp dưới</h4>
      </div>

      <div className='mt-2 mx-2'>
        <Select
          options={accounts}
          className="basic-multi-select my-4 p-1"
          classNamePrefix="select"
          placeholder="Chưa chọn tài khoản"
          onChange={(e) => setUserChoiced(e.value)}
        />

      </div>
      <div className='mx-4'>
        <input type="text"
          className='outline-none my-1 text-sm w-full border rounded-md p-2 
                  focus:border-2 focus:border-blue-500 border-gray-300'
          placeholder='Tìm kiếm tài khoản cấp dưới'
          onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* {rolesList && rolesList.includes('thêm nhóm quyền') && ( */}
      <form className='mt-2 mx-2' onSubmit={handleSubmit(onSubmit)}>
        <div>


          <div className='flex mx-2 flex-col lg:flex-row flex-wrap'>
            <div className="my-2 lg:basis-1/2">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-semibold">Chọn tất cả:</span>
                <input
                  className="w-4 h-4"
                  type="checkbox"
                  checked={checkAll}
                  name="allSelect"
                  value="allSelect"
                  onChange={handleChange}
                />
              </div>

              <div className="h-[300px] overflow-y-scroll">
                {accountsDisplay && accountsDisplay.map((item, index) => (
                  <div className="flex items-center space-x-2 ml-2" key={item.name}>
                    <input
                      className="w-4 h-4"
                      type="checkbox"
                      checked={roles.length > 0 && roles.includes(item.value) || false}
                      name={item.value}
                      onChange={handleChange}
                    />
                    <label className="text-sm">{item.name}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='md:space-x-2 space-y-2 mx-1 mt-2 md:space-y-0 md:block flex flex-col items-center'>
          <Button disabled={userChoiced === null} type='submit' size='small' fullWidth color="primary" variant='contained'><AddIcon /> <span className='text-[12px]'>Lưu dữ liệu</span></Button>
        </div>
      </form>
      {/* )} */}

    </div>
  )
}

export default ManageCapduoi
