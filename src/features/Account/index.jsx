import GridView from '@mui/icons-material/GridView'
import React, { useState, useEffect, useMemo } from 'react'
import { Button, IconButton, Paper } from '@mui/material';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"
import AddIcon from '@mui/icons-material/Add';
import querystring from "query-string";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useOutletContext } from "react-router-dom";
import Select from 'react-select';
import authApi from '../../api/authApi';
import TableAccounts from './components/TableAccount';
import DialogDelete from '../../components/DialogDelete';
import ModalEditAccount from './components/ModalEditAccount';
import donviApi from '../../api/donviApi';
import SearchIcon from '@mui/icons-material/Search'

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState('');
  const [roles, setRoles] = useState([]);
  const [donvis, setDonvis] = useState([])
  const navigate = useNavigate();
  const [handleLoading] = useOutletContext();

  // console.log(roleList.includes("thêm tài khoản"))
  const [openDialogEdit, setOpenDialogEdit] = useState({
    status: false,
    item: null,
  });

  const handleCloseDialogEdit = () => {
    setOpenDialogEdit({
      ...openDialogEdit,
      status: false,
    });
  };

  //open dialog edit
  const handleOpenDialogEdit = (item) => {
    setOpenDialogEdit({
      item,
      status: true,
    });
  };

  //state mở hộp thoại delete
  const [openDialogDelete, setOpenDialogDelete] = useState({
    status: false,
    id_Delete: null,
  });

  //open dialog delete
  const handleOpenDialogDelete = (id) => {
    setOpenDialogDelete({
      status: true,
      id_Delete: id,
    });
  };

  const handleCancelDelete = () => {
    setOpenDialogDelete({
      ...openDialogDelete,
      status: false,
    });
  };

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete({
      ...openDialogDelete,
      status: false,
    });
  };



  const {
    register,
    handleSubmit,
    control,
    resetField,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tentaikhoan: "",
      matkhau: "",
      tenhienthi: "",
      donvi: "",
      role: false,
      trangthai: true
    },
  });


  //fetch account
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await authApi.getUsers({ tentaikhoan: "" });
        let res1 = await donviApi.getDonvisActive();
        setDonvis(res1.data.map(i => ({ label: i.tendonvi, value: i._id })));
        setAccounts(res.data);
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

  const searchAccount = async () => {
    try {
      let res = await authApi.getUsers({ tentaikhoan: search });
      setAccounts(res.data);
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
  }
  //handle submit add account group
  const onSubmit = async (values) => {
    let data = { ...values };
    try {
      let res = await authApi.addUser(data);
      setAccounts(res.data.users);


      resetField('tentaikhoan');
      // resetField("matkhau");
      resetField("tenhienthi");
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

  //handle submit edit account
  const handleSubmitEdit = async (values) => {
    let data = { ...values };
    try {
      let res = await authApi.editUser(data);
      setAccounts(res.data.users);


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
      };

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

  // hanle delete account 
  const handleConfirmDelete = async () => {
    handleLoading(true);
    try {
      let res = await authApi.deleteUser(openDialogDelete.id_Delete);
      setAccounts(res.data.users);

      setTimeout(() => {
        handleLoading(false);
      }, 400);

      setOpenDialogDelete({
        ...openDialogDelete,
        status: false
      });

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
      setOpenDialogDelete({
        ...openDialogDelete,
        status: false
      });
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


  return (
    <div data-aos="fade-left" data-aos-once="true">
      <div className='flex items-center space-x-1 ml-2'>
        <GridView color='primary' fontSize="small" />
        <h4 className='font-bold text-black text-md'>Quản lý tài khoản hệ thống</h4>
      </div>
      {/* {roleList && roleList.includes('thêm tài khoản') && ( */}
      <form className='mt-2 mx-2 md:flex md:flex-wrap' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex-col flex basis-1/6'>
          <label className='font-semibold text-[14px] text-black'><span className='text-red-600 font-semibold'> (*)</span> Tài khoản: </label>
          <input {...register("tentaikhoan", { required: true })} type="text" className='outline-none my-1 text-sm border rounded-md p-2 
                  focus:border-2 focus:border-blue-500 mx-1 border-gray-300'/>
        </div>
        <div className='flex-col flex basis-1/6'>
          <label className='font-semibold text-[14px] text-black'><span className='text-red-600 font-semibold'> (*)</span> Tên hiển thị: </label>
          <input {...register("tenhienthi", { required: true })} type="text" className='outline-none my-1 text-sm border rounded-md p-2 
                  focus:border-2 focus:border-blue-500 mx-1 border-gray-300'/>
        </div>
        <div className='flex-col flex basis-1/3'>
          <label className='font-semibold text-[14px] text-black'><span className='text-red-600 font-semibold'> (*)</span> Đơn vị cấp 1: </label>
          <input {...register("donvicap1", { required: true })} type="text" className='outline-none my-1 text-sm border rounded-md p-2 
                  focus:border-2 focus:border-blue-500 mx-1 border-gray-300'/>
        </div>
        <div className='flex-col flex basis-1/3'>
          <label className='font-semibold text-[14px] text-black'><span className='text-red-600 font-semibold'> (*)</span> Đơn vị cấp 1 (Tiếng Anh): </label>
          <input {...register("donvicap1_en", { required: true })} type="text" className='outline-none my-1 text-sm border rounded-md p-2 
                  focus:border-2 focus:border-blue-500 mx-1 border-gray-300'/>
        </div>
        <div className='flex-col flex basis-1/3'>
          <label className='font-semibold text-[14px] text-black'><span className='text-red-600 font-semibold'> (*)</span> Đơn vị cấp 2: </label>
          <input {...register("donvicap2", { required: true })} type="text" className='outline-none my-1 text-sm border rounded-md p-2 
                  focus:border-2 focus:border-blue-500 mx-1 border-gray-300'/>
        </div>
        <div className='flex-col flex basis-1/3'>
          <label className='font-semibold text-[14px] text-black'><span className='text-red-600 font-semibold'> (*)</span> Đơn vị cấp 2 (Tiếng Anh): </label>
          <input {...register("donvicap2_en", { required: true })} type="text" className='outline-none my-1 text-sm border rounded-md p-2 
                  focus:border-2 focus:border-blue-500 mx-1 border-gray-300'/>
        </div>
        <div className='flex-col flex basis-1/3'>
          <label className='font-semibold text-[14px] text-black'><span className='text-red-600 font-semibold'> (*)</span> Mật khẩu: </label>
          <input {...register("matkhau", { required: true })} type="text" className='outline-none my-1 text-sm border rounded-md p-2 
                  focus:border-2  focus:border-blue-500 mx-1 border-gray-300'/>
        </div>
        <div className='flex basis-1/3  items-center justify-start'>
          <label className='font-semibold text-[14px] text-black'><span className='text-red-600 font-semibold'> (*)</span> Trạng thái hoạt động: </label>
          <input {...register("trangthai")} type="checkbox" className='outline-none my-1 text-sm border rounded-md p-2 
                  focus:border-2  focus:border-blue-500 mx-1 border-gray-300'/>
        </div>
        <div className='flex items-center justify-start basis-1/3'>
          <label className='font-semibold text-[14px] text-black'><span className='text-red-600 font-semibold'> (*)</span> Quyền quản trị hệ thống: </label>
          <input {...register("role")} type="checkbox" className='outline-none my-1 text-sm border rounded-md p-2 
                  focus:border-2  focus:border-blue-500 mx-1 border-gray-300'/>
        </div>
        <div className='flex-col flex basis-1/3'>
          <label className='font-semibold text-[14px] text-black'><span className='text-red-600 font-semibold'> (*)</span> Đơn vị: </label>
          <Controller
            control={control}
            name="donvi"
            render={({ field }) => (
              <Select
                // defaultValue={[colourOptions[2], colourOptions[3]]}
                styles={{ margin: "0 0" }}
                required={true}
                options={donvis}
                className="basic-multi-select my-4"
                classNamePrefix="select"
                {...field}
                placeholder="Vui lòng chọn đơn vị"
              />
            )}
          />
        </div>
        <div className='md:space-x-2 space-y-2 mx-1 mt-2 md:space-y-0 md:block flex flex-col items-center'>
          <Button type='submit' size='small' fullWidth color="primary" variant='contained'><AddIcon /> <span className='text-[12px]'>Thêm mới</span></Button>
        </div>
      </form>
      {/* )} */}

      <div className='mx-4 mt-4'>
          <label className='text-xl text-black font-bold'>Tìm kiếm tài khoản</label>
        <div className='flex-col md:flex-row flex items-center justify-between space-x-2'>
          <input type="text" placeholder='Tên tài khoản' value={search} onChange={(e)=> setSearch(e.target.value)} className='py-2 px-4 border rounded-xl my-2 flex-1'/>
          <Button variant='outlined' className='basis-1/6' onClick={()=>searchAccount()}><SearchIcon />Tìm kiếm</Button>
        </div>
      </div>

      <div className='mt-6 mx-3'>
        <TableAccounts
          list={accounts}
          onClickOpenDialogDelete={handleOpenDialogDelete}
          onClickOpenDialogEdit={handleOpenDialogEdit} />
      </div>

      <ModalEditAccount
        open={openDialogEdit.status}
        item={openDialogEdit.item}
        onCloseDialogEdit={handleCloseDialogEdit}
        onSubmit={handleSubmitEdit}
        donvis={donvis}
      />

      <DialogDelete
        open={openDialogDelete.status}
        onCloseDialogDelete={handleCloseDialogDelete}
        onConfirmDelete={handleConfirmDelete}
        onCancelDelete={handleCancelDelete}
      />
    </div>
  )
}

export default Accounts
