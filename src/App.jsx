import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "./components/NotFound";
import Chuyentrang from "./components/Chuyentrang.jsx";
import "./App.css"
import Donvis from "./features/Donvi/index.jsx";
import Baocao from "./features/Baocao/index.jsx";

const Login = lazy(() => import("./features/Login"));
const Dashboard = lazy(() => import("./features/Dashboard"));
const Accounts = lazy(() => import("./features/Account"));


function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

 

  return (
    <Suspense fallback={<Chuyentrang />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/" element={<Dashboard/>}>
        {/* <Route path="/dashboard/" element={<Dashboard/>}/> */}
          {/* <Route path="notification" element={<NotificationComponent />} /> */}
          <Route path="tai-khoan" element={<Accounts />} />
          <Route path="don-vi" element={<Donvis />} />
          <Route path="thong-ke" element={<Baocao />} />
         
        </Route>
        <Route path='*' element={<NotFound/>} />
      </Routes>
      <ToastContainer style={{width:'450px', fontSize: "12px", margin: 0}} />
    </Suspense>
  )
}

export default App
