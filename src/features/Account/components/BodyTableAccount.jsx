import * as React from "react";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";


const BodyTableAccount = ({
  row,
  page,
  rowsPerPage, 
  index,
  onClickOpenDialogEdit,
  onClickOpenDialogDelete,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const roles = useSelector((state) => state.authReducer.roles_quanlydoanvien);

  return (
    <TableRow key={row._id} className="hover:bg-slate-200 transition duration-300">
      <TableCell
        className="border-r border-slate-300"
        align="left"
        style={{ fontWeight: "bold" }}
      >
        <span className="text-[12px]">{page * rowsPerPage + index}</span>
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        <span className="text-[12px]">{row.tentaikhoan}</span>
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        <span className="text-[12px]">{row.tenhienthi}</span>
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        <span className="text-[12px]">{row.trangthai === true ? "Active" : "NonActive"}</span>
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        <span className="text-[12px]">{row.role}</span>
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        <span className="text-[12px]">{row.donvicap1}</span>
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        <span className="text-[12px]">{row.donvicap1_en}</span>
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        <span className="text-[12px]">{row.donvicap2}</span>
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        <span className="text-[12px]">{row.donvicap2_en}</span>
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        <span className="text-[12px]">{row.donvi.kyhieu}</span>
      </TableCell>
      <TableCell
        align="center"
      >
         <IconButton onClick={() => onClickOpenDialogEdit(row)} >
                    <EditIcon style={{ fontSize: "24px", color: "blue" }} />
            </IconButton>
            <IconButton onClick={() => onClickOpenDialogDelete(row._id)}>
                    <DeleteOutlineIcon  style={{ fontSize: "24px", color: "red" }} />
            </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default BodyTableAccount;
