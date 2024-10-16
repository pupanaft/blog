import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import fetchMiddleware from '../services/fetch-middleware'


export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      if (!token) {
        throw new Error('No authentication token found')
      }
          
      const response = await fetchMiddleware('get','user', token) 
                
      if (!response.ok) {
        const errorData = await response.json()
        return rejectWithValue(errorData)
      }
          
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred')
    }
  }
) 
export const fetchCreateUser = createAsyncThunk(
  'user/fetchCreateUser',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      const body = {
        'user': {
          'username': data.name,
          'email': data.mail,
          'password': data.password
        }
      }    
      const response = await fetchMiddleware('post','users', token, body)                  
      if (!response.ok) {
        const errorData = await response.json()
        return rejectWithValue(errorData)
      }
            
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const fetchExitingUser = createAsyncThunk(
  'user/fetchExitingUser',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      const body = {
        'user': {
          'email': data.mail,
          'password': data.password
        }
      }    
      const response = await fetchMiddleware('post','users/login', token, body)                
      if (!response.ok) {
        const errorData = await response.json()
        return rejectWithValue(errorData)
      }
              
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const fetchEditUser = createAsyncThunk(
  'user/fetchEditUser',
  async ({newUser}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      const body = {...newUser}
      const response = await fetchMiddleware('put','user', token, body)           
      if (!response.ok) {
        const errorData = await response.json()
        return rejectWithValue(errorData)
      }
                
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
  


    
  

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
      state.errorServer= null
    },
    
  },
  extraReducers: (bilder) => {
    bilder
      .addCase(fetchCreateUser.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        state.loading = false
    
        state.user = action.payload.user
        state.errorServer = null
       
      })
      .addCase(fetchCreateUser.rejected, (state,action) => {
        state.loading = false
        state.error = true
        if(action.payload.errors){
          state.errorServer = action.payload.errors
        }
      })
      .addCase(fetchExitingUser.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchExitingUser.fulfilled, (state, action) => {
        state.loading = false
        
        state.user = action.payload.user
        state.errorServer = null
        localStorage.setItem('userToken', action.payload.user.token)
        
      })
      .addCase(fetchExitingUser.rejected, (state,action) => {
        state.loading = false
        state.error = true
        if(action.payload.errors){
          state.errorServer = action.payload.errors
        }
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true
      })
      .addCase(checkAuth.fulfilled, (state,action ) => {
        state.loading = false
        if(action.payload.errors){
          state.errorServer = action.payload.errors
        }else{
          state.user = action.payload.user
          state.errorServer = null
        }
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false
        state.error = true

      })
      .addCase(fetchEditUser.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchEditUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.errorServer = null
        
      })
      .addCase(fetchEditUser.rejected, (state,action) => {
        state.loading = false
        state.error = true
        if(action.payload.errors){
          state.errorServer = action.payload.errors
        }
      })

  },
  selectors: {
    user: (state) => state.user,
    errorServer:(state) => state.errorServer,

  },
})

export const { user, errorServer } = userSlice.selectors

export const { logOut } = userSlice.actions
export default userSlice.reducer
