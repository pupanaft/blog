import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchCreateUser = createAsyncThunk('user/fetchCreateUser', async (data, { rejectWithValue }) => {
  const response = await fetch('https://blog-platform.kata.academy/api/users', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'user': {
        'username': data.name,
        'email': data.mail,
        'password': data.password
      }
    })
  }).then(async (responce) => await responce.json()).catch((e) => e) // eslint-disable-line
  return response instanceof Error ? rejectWithValue(response.message) : response
})

export const fetchExitingUser = createAsyncThunk('user/fetchExitingUser', async (data, { rejectWithValue }) => {
  const response = await fetch('https://blog-platform.kata.academy/api/users/login', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'user': {
        'email': data.mail,
        'password': data.password
      }
    })
    }).then(async (responce) => await responce.json()).catch((e) => e) // eslint-disable-line
  return response instanceof Error ? rejectWithValue(response.message) : response
})

export const fetchEditUser = createAsyncThunk('user/fetchEditUser', async ({newUser, token},
  { rejectWithValue }
) => {
  const response = await fetch('https://blog-platform.kata.academy/api/user', {
    method: 'put',
    headers: {
      'Authorization':`Token ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({...newUser})}).then(async (responce) => await responce.json()).catch((e) => e) // eslint-disable-line
  return response instanceof Error ? rejectWithValue(response.message) : response
})
    
  

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    error: null,
    errorServer: null,
    loading: false,
  },
  reducers: {
    logOut(state) {
      state.user = null
    },
  },
  extraReducers: (bilder) => {
    bilder
      .addCase(fetchCreateUser.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        state.loading = false
        if(action.payload.errors){
          state.errorServer = action.payload.errors
        }else{
          state.user = action.payload.user
          state.errorServer = null
        }
      })
      .addCase(fetchCreateUser.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(fetchExitingUser.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchExitingUser.fulfilled, (state, action) => {
        state.loading = false
        if(action.payload.errors){
          state.errorServer = action.payload.errors
        }else{
          state.user = action.payload.user
          state.errorServer = null
        }
      })
      .addCase(fetchExitingUser.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(fetchEditUser.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchEditUser.fulfilled, (state, action) => {
        state.loading = false
        if(action.payload.errors){
          state.errorServer = action.payload.errors
        }else{
          state.user = action.payload.user
          state.errorServer = null
        }
      })
      .addCase(fetchEditUser.rejected, (state) => {
        state.loading = false
        state.error = true
      })
  },
  selectors: {
    user: (state) => state.user,
    errorServer:(state) => state.errorServer
  },
})

export const { user, errorServer } = userSlice.selectors

export const { logOut } = userSlice.actions
export default userSlice.reducer
