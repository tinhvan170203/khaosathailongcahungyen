import React, { useMemo, useState, useEffect } from 'react'
import GridViewIcon from '@mui/icons-material/GridView';
import { Button, IconButton, Paper } from '@mui/material';
import Switch from '@mui/material/Switch';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"
import AddIcon from '@mui/icons-material/Add';
import querystring from "query-string";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import ModalLoading from '../../components/ModalLoading';
import { toast } from 'react-toastify';
import EditModal from './components/EditModal';
import { useOutletContext } from "react-router-dom";
import DialogDelete from '../../components/DialogDelete';
import donviApi from '../../api/donviApi';
import TableDonvi from './components/TableDonvi';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const Donvis = () => {
  const [donvis, setDonvis] = useState([]);
  const [active, setActive] = useState(true)
  const navigate = useNavigate();
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
      tendonvi: "",
      kyhieu: ""
    },
  });


  //fetch notifications
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await donviApi.getDonvis();
        setDonvis(res.data);
      } catch (error) {
        if (
          error.message ===
          "Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại"
        ) {
          navigate("/login");
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

      }
    };

    fetchData();
  }, []);

  //handle submit add notification
  const onSubmit = async (values) => {
    let data = { ...values, active };
    try {
      let res = await donviApi.addDonvi(data);
      setDonvis(res.data.donvis)

      resetField('tendonvi');
      resetField('kyhieu');
      toast.success(res.data.message, {
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

  //handle submit edit notification
  const handleSubmitEdit = async (values) => {
    let data = { ...values };
    try {
      let res = await donviApi.editDonvi(data);
      setDonvis(res.data.donvis)
      toast.success(res.data.message, {
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

  // handle delete notification
  const handleConfirmDelete = async () => {
    try {
      let res = await donviApi.deleteDonvi(openDialogDelete.id_Delete);

      setDonvis(res.data.donvis)
      setOpenDialogDelete({
        ...openDialogDelete,
        status: false
      })
      toast.success(res.data.message, {
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
      setOpenDialogDelete({
        ...openDialogDelete,
        status: false
      });
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
    <div className='pr-2' data-aos="fade-left" data-aos-once="true">
      <div className='flex items-center space-x-1 ml-2'>
        <GridViewIcon color='primary' fontSize="medium" />
        <h4 className='font-bold text-gray-800 text-[16px]'>Quản lý đơn vị cấp phòng, huyện, thị xã, thành phố</h4>
      </div>
      <form className='mt-2 mx-8 md:flex md:flex-wrap' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex-col flex md:basis-1/3 px-2'>
          <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Tên đơn vị: </label>
          <input {...register("tendonvi", { required: true })} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400'/>
        </div>
        <div className='flex-col flex md:basis-1/3 px-2'>
          <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Ký hiệu đơn vị: </label>
          <input {...register("kyhieu", { required: true })} type="text" className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400'/>
        </div>
        <div className='flex items-center md:basis-1/3 space-x-2 px-2'>
          <label className='underline font-semibold'><span className='text-red-600 font-semibold'> (*)</span> Active: </label>
          <input type="checkbox" checked={active} onChange={()=>setActive(!active)} className='outline-none my-4 border rounded-md p-2 border-neutral-600
                  focus:ring-2 focus:border-blue-400'/>
        </div>
        <div className='md:space-x-2 space-y-2 md:space-y-0 md:block flex flex-col items-center'>
          <Button type='submit' sx={{ width: "220px", backgroundColor: "gray" }} color="primary" variant='contained'><AddIcon /> Thêm mới</Button>
        </div>
      </form>
      {/* table data  */}
      <div className='mt-6 mx-8'>
        <TableDonvi
          list={donvis}
          onClickOpenDialogDelete={handleOpenDialogDelete}
          onClickOpenDialogEdit={handleOpenDialogEdit} />
      </div>

      <EditModal
        open={openDialogEdit.status}
        item={openDialogEdit.item}
        onCloseDialogEdit={handleCloseDialogEdit}
        onSubmit={handleSubmitEdit}
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

export default Donvis
