import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userApi from '../api/authApi';

const initialState = {
  user:  localStorage.getItem('user_khaosathailong') || null,
  id_user: localStorage.getItem('id_user_khaosathailong') || null,
};


export const loginAccount = createAsyncThunk(
  'user/login', // tên action khi dispatch
  async(payload) => {    
          let {data} = await userApi.login(payload);
          //save accessToken vào localstorerage
              localStorage.setItem('accessToken_khaosathailong', data.accessToken)
              localStorage.setItem('user_khaosathailong', data.tentaikhoan)         
              localStorage.setItem('id_user_khaosathailong', data._id)              
          return data

  }
);

export const logoutAccount = createAsyncThunk(
  'user/logout',
  async() => {
      await userApi.logout();  
      localStorage.removeItem('user_khaosathailong');
      localStorage.removeItem('id_user_khaosathailong');   
      localStorage.removeItem('accessToken_khaosathailong');   
  }
)



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    refreshToken: (state, action) => {
      localStorage.setItem('accessToken_khaosathailong', action.payload)
  },
    changeRole: (state, action) => {
      state.roles_khaosathailong = action.payload;    
    },
    logout: (state, action) => {
      state.user = null;
      state.id_user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAccount.fulfilled, (state, action) => {
        // action is inferred correctly here if using TS
                state.user = action.payload.tentaikhoan; // action.payload là cái return từ createAsyncThunk         
                state.id_user = action.payload._id; // action.payload là cái return từ createAsyncThunk 
      })
    .addCase(loginAccount.rejected, (state, action) => {
        // action is inferred correctly here if using TS
                state.user = null; // action.payload là cái return từ createAsyncThunk 
      })
      .addCase(logoutAccount.fulfilled, (state, action) => {
        // action is inferred correctly here if using TS
                state.user = null; // action.payload là cái return từ createAsyncThunk         
                state.id_user = null; // action.payload là cái return từ createAsyncThunk  
      })
    .addCase(logoutAccount.rejected, (state, action) => {
        // action is inferred correctly here if using TS
                state.user = null; // action.payload là cái return từ createAsyncThunk         
      })
  }
})

// Action creators are generated for each case reducer function
export const {changeRole, logout} = authSlice.actions

export default authSlice.reducer