import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogDelete({ open, onCloseDialogDelete, onConfirmDelete, onCancelDelete }) {

  return (
    <div>
      <Dialog
        disableEscapeKeyDown={true}
        onClose={(event, reason) => { // bỏ click ở nền đen mà mất dialog
          if (reason !== "backdropClick") {
            onCloseDialogDelete(event, reason);
          }
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >

        <span className='text-[15px] text-center p-2 bg-red-800 text-white'>Xác nhận thao tác xóa ?</span>

        <DialogContent>
          <img className='pt-4  px-8 mx-auto w-50' src="https://www.freeiconspng.com/thumbs/delete-button-png/blue-delete-button-png-29.png" alt="icon-trash" />
          <DialogContentText id="alert-dialog-slide-description">

          </DialogContentText>
        </DialogContent>
        <div className="flex justify-evenly pb-4">
          <Button variant="contained" size='small' color='success' onClick={onConfirmDelete}><CheckIcon style={{fontSize:'18px', marginRight: "4px"}}/> <span className='text-[12px]'>Đồng ý</span></Button>
          <Button variant="contained" size='small' color='error' onClick={onCancelDelete}><CancelIcon style={{fontSize:'18px', marginRight: "4px"}}/> <span className='text-[12px]'>Hủy</span></Button>
        </div>
      </Dialog>
    </div>
  );
}
