import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  Button,
  IconButton,
  styled,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form"
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import Select from 'react-select';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CancelButton = styled(IconButton)({
  position: "absolute",
  right: "16px",
  top: "4px",
});



export default function ModalEditAccount({
  open,
  item,
  onCloseDialogEdit,
  onSubmit,
  donvis,
}) {
console.log(item)
  const {
    register,
    handleSubmit,
    control,
    resetField,
    setValue,
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


  useEffect(() => {
    if (item) {
      setValue("tentaikhoan", item.tentaikhoan, { shouldValidate: true });
      setValue("matkhau", item.matkhau, { shouldValidate: true });
      setValue("tenhienthi", item.tenhienthi, { shouldValidate: true });
      setValue("donvicap1", item.donvicap1, { shouldValidate: true });
      setValue("donvicap1_en", item.donvicap1_en, { shouldValidate: true });
      setValue("donvicap2", item.donvicap2, { shouldValidate: true });
      setValue("donvicap2_en", item.donvicap2_en, { shouldValidate: true });
      setValue("role", item.role === "Admin" ? true: false, {});
      setValue("trangthai", item.trangthai);
      setValue("donvi", {value: item.donvi._id, label: item.donvi.tendonvi}, { shouldValidate: true });
    }
  }, [item]);

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      const data = { ...values, id_edit: item._id };
      await onSubmit(data);
      onCloseDialogEdit();
    }
  };


  return (
    <>
      <Dialog
        maxWidth="lg"
        fullWidth={true}
        disableEscapeKeyDown={true}
        onClose={(event, reason) => {
          // bỏ click ở nền đen mà mất dialog
          if (reason !== "backdropClick") {
            onCloseDialogEdit(event, reason);
          }
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          style={{
            backgroundColor: "#0561bb",
            margin: "0px",
            padding: "4px 4px"
          }}
        >

          <div className="flex items-center justify-between px-2">
            <span className="text-white text-[15px]">
              Chỉnh sửa tài khoản người dùng
            </span>
            <IconButton onClick={() => onCloseDialogEdit()}>
              <CancelIcon style={{ color: "white" }} />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <Box>

            <form className='mt-2 mx-1' onSubmit={handleSubmit(handleFormSubmit)}>
            <div className='flex-col flex basis-1/6'>
          <label className='font-semibold text-[14px] text-gray-600'><span className='text-red-600 font-semibold'> (*)</span> Tài khoản: </label>
          <input {...register("tentaikhoan", { required: true })} type="text" className='outline-none my-1 text-sm border rounded-md p-2 
                  focus:border-2 focus:border-blue-500 mx-1 border-gray-300'/>
        </div>
        <div className='flex-col flex basis-1/6'>
          <label className='font-semibold text-[14px] text-gray-600'><span className='text-red-600 font-semibold'> (*)</span> Tên hiển thị: </label>
          <input {...register("tenhienthi", { required: true })} type="text" className='outline-none my-1 text-sm border rounded-md p-2 
                  focus:border-2 focus:border-blue-500 mx-1 border-gray-300'/>
        </div>
        <div className='flex-col flex basis-1/3'>
          <label className='font-semibold text-[14px] text-gray-600'><span className='text-red-600 font-semibold'> (*)</span> Đơn vị cấp 1: </label>
          <input {...register("donvicap1", { required: true })} type="text" className='outline-none my-1 text-sm border rounded-md p-2 
                  focus:border-2 focus:border-blue-500 mx-1 border-gray-300'/>
        </div>
        <div className='flex-col flex basis-1/3'>
          <label className='font-semibold text-[14px] text-gray-600'><span className='text-red-600 font-semibold'> (*)</span> Đơn vị cấp 1 (Tiếng Anh): </label>
          <input {...register("donvicap1_en", { required: true })} type="text" className='outline-none my-1 text-sm border rounded-md p-2 
                  focus:border-2 focus:border-blue-500 mx-1 border-gray-300'/>
        </div>
        <div className='flex-col flex basis-1/3'>
          <label className='font-semibold text-[14px] text-gray-600'><span className='text-red-600 font-semibold'> (*)</span> Đơn vị cấp 2: </label>
          <input {...register("donvicap2", { required: true })} type="text" className='outline-none my-1 text-sm border rounded-md p-2 
                  focus:border-2 focus:border-blue-500 mx-1 border-gray-300'/>
        </div>
        <div className='flex-col flex basis-1/3'>
          <label className='font-semibold text-[14px] text-gray-600'><span className='text-red-600 font-semibold'> (*)</span> Đơn vị cấp 2 (Tiếng Anh): </label>
          <input {...register("donvicap2_en", { required: true })} type="text" className='outline-none my-1 text-sm border rounded-md p-2 
                  focus:border-2 focus:border-blue-500 mx-1 border-gray-300'/>
        </div>
        <div className='flex-col flex basis-1/3'>
          <label className='font-semibold text-[14px] text-gray-600'><span className='text-red-600 font-semibold'> (*)</span> Mật khẩu: </label>
          <input {...register("matkhau", { required: true })} type="text" className='outline-none my-1 text-sm border rounded-md p-2 
                  focus:border-2  focus:border-blue-500 mx-1 border-gray-300'/>
        </div>
        <div className='flex basis-1/3  items-center justify-start'>
          <label className='font-semibold text-[14px] text-gray-600'><span className='text-red-600 font-semibold'> (*)</span> Trạng thái hoạt động: </label>
          <input {...register("trangthai")} type="checkbox" className='outline-none my-1 text-sm border rounded-md p-2 
                  focus:border-2  focus:border-blue-500 mx-1 border-gray-300'/>
        </div>
        <div className='flex items-center justify-start basis-1/3'>
          <label className='font-semibold text-[14px] text-gray-600'><span className='text-red-600 font-semibold'> (*)</span> Quyền quản trị hệ thống: </label>
          <input {...register("role")} type="checkbox" className='outline-none my-1 text-sm border rounded-md p-2 
                  focus:border-2  focus:border-blue-500 mx-1 border-gray-300'/>
        </div>
        <div className='flex-col flex basis-1/3'>
          <label className='font-semibold text-[14px] text-gray-600'><span className='text-red-600 font-semibold'> (*)</span> Đơn vị: </label>
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
            <Button type='submit' size='small' fullWidth color="primary" variant='contained'><AddIcon /> <span className='text-[12px]'>Cập nhật</span></Button>
          </div>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
