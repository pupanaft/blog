import { configureStore } from '@reduxjs/toolkit'

import blogReduser from './blogSlice'
import userReduser from './userSlice'

export default configureStore({
  reducer: {
    blog: blogReduser,
    user: userReduser,
  },
})
