import GridView from '@mui/icons-material/GridView'
import React, { useState, useEffect, useMemo } from 'react'
import { Button, IconButton, Paper } from '@mui/material';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Select from 'react-select';
import authApi from '../../api/authApi';
import donviApi from '../../api/donviApi';
import CountUp from 'react-countup';
import SearchIcon from '@mui/icons-material/Search'
import TableBaocao from './components/TableCaocao';
import { CSVLink } from "react-csv";
import dayjs from "dayjs";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
let convert = (createdAt)=>{
  return dayjs(createdAt).format('HH:mm   ngày DD/MM/YYYY')
}
let headers = [
  { label: "STT", key: "stt" },
  { label: "Tài khoản", key: "tentaikhoan" },
  { label: "Đơn vị", key: "donvi" },
  { label: "Chất lượng dịch vụ công", key: "rank" },
  { label: "Thái độ của cán bộ", key: "thaido" },
  { label: "Thông tin công dân đánh giá", key: "sodienthoai" },
  { label: "Ghi chú", key: "ghichu" },
  { label: "Thời gian", key: "thoigian" }
];
const Baocao = () => {
  const [donvis, setDonvis] = useState([]);
  const [reports, setReports] = useState([]);
  const [rathailongCount, setRatHailongCount] = useState(0);
  const [hailongCount, setHailongCount] = useState(0);
  const [binhthuongCount, setBinhthuongCount] = useState(0);
  const [khonghailongCount, setKhongHailongCount] = useState(0);
  const [thaidorathailongCount, setThaidoRatHailongCount] = useState(0);
  const [thaidohailongCount, setThaidoHailongCount] = useState(0);
  const [thaidobinhthuongCount, setThaidoBinhthuongCount] = useState(0);
  const [thaidokhonghailongCount, setThaidoKhongHailongCount] = useState(0);
  let [excelExport, setExcelExport] = useState([]);
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
      tungay: "",
      denngay: "",
      xeploai: "",
      thaido: "",
      donvi: { label: "Tất cả", value: "" },

    },
  });

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res1 = await donviApi.getDonvis();
        let res = await authApi.getReports({
          donvi: { label: "Tất cả", value: "" },
          xeploai: "",
          tentaikhoan: "",
          tungay:"",
          denngay: '',
          thaido: ""
        });
        setHailongCount(res.data.hailong)
        setRatHailongCount(res.data.rathailong)
        setKhongHailongCount(res.data.ratkhonghailong)
        setBinhthuongCount(res.data.binhthuong)
        setThaidoHailongCount(res.data.thaidohailong)
        setThaidoRatHailongCount(res.data.thaidorathailong)
        setThaidoKhongHailongCount(res.data.thaidoratkhonghailong)
        setThaidoBinhthuongCount(res.data.thaidobinhthuong)
        setReports(res.data.data);
        setExcelExport(res.data.data.map((item, index )=>{
          return {
            stt: index + 1,
            tentaikhoan: item.account.tentaikhoan,
            donvi: item.account.donvi.kyhieu,
            rank: item.rank,
            thaido: item.thaido,
            sodienthoai: item.sodienthoai,
            ghichu: item.ghichu,
            thoigian: convert(item.createdAt)
          }
        }));
        setDonvis([{ label: "Tất cả", value: "" }].concat(res1.data.map(i => ({ label: i.tendonvi, value: i._id }))));
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

  const onSubmit = async (values) => {
    let data = { ...values };
    try {
      let res = await authApi.getReports(data);
      setHailongCount(res.data.hailong)
      setRatHailongCount(res.data.rathailong)
      setKhongHailongCount(res.data.ratkhonghailong)
      setBinhthuongCount(res.data.binhthuong)
      setThaidoHailongCount(res.data.thaidohailong)
      setThaidoRatHailongCount(res.data.thaidorathailong)
      setThaidoKhongHailongCount(res.data.thaidoratkhonghailong)
      setThaidoBinhthuongCount(res.data.thaidobinhthuong)
      setReports(res.data.data);
      setExcelExport(res.data.data.map((item, index )=>{
        return {
          stt: index + 1,
          tentaikhoan: item.account.tentaikhoan,
          donvi: item.account.donvi.kyhieu,
          rank: item.rank,
          thaido: item.thaido,
          sodienthoai: item.sodienthoai,
          ghichu: item.ghichu,
          thoigian: convert(item.createdAt)
        }
      }));
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


  return (
    <div>
      <div className='flex items-center space-x-1 ml-2 mt-2'>
        <GridView color='primary' fontSize="small" />
        <h4 className='font-bold text-black text-md'>Thống kê lượt tương tác khảo sát hài lòng của công dân: <span className='font-semibold'> Tổng số <span className='text-2xl font-bold text-red-700'>{reports.length > 0 && reports.length}</span> lượt tương tác</span></h4>
      </div>

      <p className='mt-4 font-semibold px-4'>Chất lượng dịch vụ công trực tuyến tại cơ quan một cửa</p>
      <div className='flex items-center px-4 flex-wrap md:flex-nowrap md:space-x-4'>
        <div className='relative flex shadow-md h-40 mt-2 items-center md:basis-1/4 basis-1/2 bg-gradient-to-r to-red-300 from-red-500 rounded-lg'>
          <p className='text-[32px] text-center flex-1 font-bold text-white'>
            <CountUp end={rathailongCount} duration={2} />
          </p>
          <p className='bottom-2 left-8 absolute font-semibold text-white'>Số lượt rất hài lòng</p>
        </div>
        <div className='relative flex shadow-md h-40 mt-2 items-center md:basis-1/4 basis-1/2 bg-gradient-to-r to-yellow-300 from-yellow-500 rounded-lg'>
          <p className='text-[32px] text-center flex-1 font-bold text-white'>
            <CountUp end={hailongCount} duration={2} />
          </p>
          <p className='bottom-2 left-8 absolute font-semibold text-white'>Số lượt hài lòng</p>
        </div>
        <div className='relative flex shadow-md h-40 mt-2 items-center md:basis-1/4 basis-1/2 bg-gradient-to-r to-blue-300 from-blue-500 rounded-lg'>
          <p className='text-[32px] text-center flex-1 font-bold text-white'>
            <CountUp end={binhthuongCount} duration={2} />
          </p>
          <p className='bottom-2 left-8 absolute font-semibold text-white'>Số lượt bình thường</p>
        </div>
        <div className='relative flex shadow-md h-40 mt-2 items-center md:basis-1/4 basis-1/2 bg-gradient-to-r to-green-300 from-green-500 rounded-lg'>
          <p className='text-[32px] text-center flex-1 font-bold text-white'>
            <CountUp end={khonghailongCount} duration={2} />
          </p>
          <p className='bottom-2 left-8 absolute font-semibold text-white'>Số lượt rất không hài lòng</p>
        </div>
      </div>

        <p className='mt-8 font-semibold px-4'>Thái độ của cán bộ hướng dẫn, thực hiện dịch vụ công trực tuyến</p>
      <div className='flex items-center px-4 flex-wrap md:flex-nowrap md:space-x-4'>
        <div className='relative flex shadow-md h-40 mt-2 items-center md:basis-1/4 basis-1/2 bg-gradient-to-r to-red-300 from-red-500 rounded-lg'>
          <p className='text-[32px] text-center flex-1 font-bold text-white'>
            <CountUp end={thaidorathailongCount} duration={2} />
          </p>
          <p className='bottom-2 left-8 absolute font-semibold text-white'>Số lượt rất hài lòng</p>
        </div>
        <div className='relative flex shadow-md h-40 mt-2 items-center md:basis-1/4 basis-1/2 bg-gradient-to-r to-yellow-300 from-yellow-500 rounded-lg'>
          <p className='text-[32px] text-center flex-1 font-bold text-white'>
            <CountUp end={thaidohailongCount} duration={2} />
          </p>
          <p className='bottom-2 left-8 absolute font-semibold text-white'>Số lượt hài lòng</p>
        </div>
        <div className='relative flex shadow-md h-40 mt-2 items-center md:basis-1/4 basis-1/2 bg-gradient-to-r to-blue-300 from-blue-500 rounded-lg'>
          <p className='text-[32px] text-center flex-1 font-bold text-white'>
            <CountUp end={thaidobinhthuongCount} duration={2} />
          </p>
          <p className='bottom-2 left-8 absolute font-semibold text-white'>Số lượt bình thường</p>
        </div>
        <div className='relative flex shadow-md h-40 mt-2 items-center md:basis-1/4 basis-1/2 bg-gradient-to-r to-green-300 from-green-500 rounded-lg'>
          <p className='text-[32px] text-center flex-1 font-bold text-white'>
            <CountUp end={thaidokhonghailongCount} duration={2} />
          </p>
          <p className='bottom-2 left-8 absolute font-semibold text-white'>Số lượt rất không hài lòng</p>
        </div>
      </div>

      <div className='mt-4 px-4'>
        <p className='font-bold'>Thống kê chi tiết</p>
        <IconButton>
        <CSVLink data={excelExport} headers={headers} filename={`danhsachdanhgiadichvucong`}>
          <div className='flex items-center shadow-md space-x-2 bg-green-300 px-2 py-1 rounded-md'>
            <FileDownloadIcon />
            <span className='text-sm text-green-800'>Xuất file excel</span>
          </div>
        </CSVLink>
      </IconButton>
        <form className='mt-2 mx-2 md:flex md:flex-wrap shadow-lg p-4' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex-col flex basis-1/6'>
            <label className='font-semibold text-[14px] text-black'>Tài khoản: </label>
            <input {...register("tentaikhoan")} type="text" className='outline-none my-1 text-sm border rounded-md p-2 
                  focus:border-2 focus:border-blue-500 mx-1 border-gray-300'/>
          </div>
          <div className='flex-col flex basis-1/6'>
            <label className='font-semibold text-[14px] text-black'>Từ ngày: </label>
            <input {...register("tungay")} type="date" className='outline-none my-1 text-sm border rounded-md p-2 
                  focus:border-2 focus:border-blue-500 mx-1 border-gray-300'/>
          </div>
          <div className='flex-col flex basis-1/6'>
            <label className='font-semibold text-[14px] text-black'>Đến ngày: </label>
            <input {...register("denngay")} type="date" className='outline-none my-1 text-sm border rounded-md p-2 
                  focus:border-2 focus:border-blue-500 mx-1 border-gray-300'/>
          </div>
          <div className='flex-col flex basis-1/6'>
            <label className='font-semibold text-[14px] text-black'>Chất lượng dịch vụ công: </label>
            <select {...register("xeploai")}>
              <option value="">Tất cả</option>
              <option value="Rất hài lòng">Rất hài lòng</option>
              <option value="Hài lòng">Hài lòng</option>
              <option value="Bình thường">Bình thường</option>
              <option value="Rất không hài lòng">Rất không hài lòng</option>
            </select>
          </div>
          <div className='flex-col flex basis-1/6'>
            <label className='font-semibold text-[14px] text-black'>Thái độ của cán bộ: </label>
            <select {...register("thaido")}>
              <option value="">Tất cả</option>
              <option value="Rất hài lòng">Rất hài lòng</option>
              <option value="Hài lòng">Hài lòng</option>
              <option value="Bình thường">Bình thường</option>
              <option value="Rất không hài lòng">Rất không hài lòng</option>
            </select>
          </div>
          <div className='flex-col flex basis-1/6'>
            <label className='font-semibold text-[14px] text-black'>Đơn vị: </label>
            <Controller
              control={control}
              name="donvi"
              render={({ field }) => (
                <Select
                  // defaultValue={{label: "Tất cả", value: ""}}
                  styles={{ margin: "0 0" }}
                  options={donvis}
                  className="basic-multi-select my-4"
                  classNamePrefix="select"
                  {...field}
                />
              )}
            />
          </div>
          <div className='flex-col flex basis-1/6'>
            <Button variant='contained' type='submit'>Tra cứu</Button>
          </div>
        </form>

        <div className='mt-4'>
          <TableBaocao
            list={reports} />
        </div>
      </div>
    </div>
  )
}

export default Baocao
