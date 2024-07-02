import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import dayjs from "dayjs";
function setColor(rank){
    console.log(rank)
    if(rank === "Hài lòng"){
        return 'text-green-500 font-bold'
    }
    if(rank === "Rất hài lòng"){
        return 'text-red-700 font-bold'
    }
    if(rank === "Bình thường"){
        return 'font-bold'
    }
    if(rank === "Không hài lòng"){
        return 'text-blue-700 font-bold'
    };
}

const BodyTable = ({
  row,
  page,
  rowsPerPage, 
  index,
}) => {
  return (
    <TableRow key={row._id} className="hover:bg-slate-200 transition duration-300">
      <TableCell
        className="border-r border-slate-300"
        align="left"
        style={{ fontWeight: "bold" }}
      >
        {page * rowsPerPage + index}
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {row.account.tentaikhoan}
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {row.account.donvi.kyhieu}
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        <span className={setColor(row.rank)}>{row.rank}</span>
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        <span className={setColor(row.thaido)}>{row.thaido}</span>
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {row.hoten} <span className="font-bold">{row.sodienthoai}</span>
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {row.ghichu}
      </TableCell>
      <TableCell
        className="border-r border-slate-300"
        align="left"
      >
        {dayjs(row.createdAt).format('HH:mm   ngày DD/MM/YYYY')}
      </TableCell>
    </TableRow>
  );
};

export default BodyTable;
