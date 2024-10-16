import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { format } from 'date-fns'

import fetchMiddleware from '../services/fetch-middleware'

export const fetchArticles = createAsyncThunk(
  'blog/fetchArticles',
  async (activePagination, { rejectWithValue }) => {
    try {
      const offset = (activePagination - 1) * 5
      const token = localStorage.getItem('userToken') // тут типо получаю токен и кидаю его в обработчик запросов на следующей
      const response = await fetchMiddleware('get',`articles?limit=5&offset=${offset}`, token)
      if (!response.ok) {
        const errorData = await response.json()
        return rejectWithValue(errorData)
      }
      const body = await response.json()
      const { articles, articlesCount } = body
      const dataArticle = articles.map((item) => ({
        title: item.title,
        likes: item.favoritesCount,
        tags: item.tagList,
        description: item.description,
        user: item.author.username,
        avatar: item.author.image,
        data:format(item.createdAt, 'PP'),
        slug: item.slug,
        favorited:item.favorited
      }))

      return { dataArticle, articlesCount }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchOneArticle = createAsyncThunk(
  'blog/fetchOneArticle',
  async (slug, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken') // тут типо получаю токен и кидаю его в обработчик запросов на следующей
      const response = await fetchMiddleware('get',`articles/${slug}`, token)
      if (!response.ok) {
        const errorData = await response.json()
        return rejectWithValue(errorData)
      }
      const body = await response.json()

      const { article } = body
      const dataArticle = {
        title: article.title,
        likes: article.favoritesCount,
        tags: article.tagList,
        description: article.description,
        user: article.author.username,
        avatar: article.author.image,
        data: article.createdAt,
        slug: article.slug,
        body: article.body,
        favorited:article.favorited
      }

      return { dataArticle }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchCreateArticle = createAsyncThunk(
  'blog/fetchCreateArticle',
  async ({data}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      if (!token) {
        throw new Error('No authentication token found')
      }

      const response = await fetchMiddleware('post', 'articles', token, { 'article': data })
      
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

export const fetchEditArticle = createAsyncThunk(
  'blog/fetchEditArticle',
  async ({slug, data}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      if (!token) {
        throw new Error('No authentication token found')
      }
  
      const response = await fetchMiddleware('put',`articles/${slug}`, token, {'article':{...data}})
        
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

export const fetchDeleteArticle = createAsyncThunk(
  'blog/fetchDeleteArticle',
  async ({slug}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      if (!token) {
        throw new Error('No authentication token found')
      }
    
      const response = await fetchMiddleware('delete',`articles/${slug}`, token)
          
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

export const fetchFavoritedArticle = createAsyncThunk(
  'blog/fetchFavoritedArticle',
  async ({slug}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      if (!token) {
        throw new Error('No authentication token found')
      }
      
      const response = await fetchMiddleware('post',`articles/${slug}/favorite`, token)
            
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

export const fetchUnFavoritedArticle = createAsyncThunk(
  'blog/fetchUnFavoritedArticle',
  async ({slug}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('userToken')
      if (!token) {
        throw new Error('No authentication token found')
      }
        
      const response = await fetchMiddleware('delete',`articles/${slug}/favorite`, token)
              
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

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    articles: [],
    selectArticle: null,
    totalArticle: 0,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (bilder) => {
    bilder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false
        state.articles = action.payload.dataArticle
        state.totalArticle = action.payload.articlesCount
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(fetchOneArticle.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchOneArticle.fulfilled, (state, action) => {
        state.loading = false
        state.selectArticle = action.payload.dataArticle
      })
      .addCase(fetchOneArticle.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(fetchCreateArticle.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCreateArticle.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(fetchCreateArticle.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(fetchEditArticle.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchEditArticle.fulfilled, (state) => {
        state.loading = false
 
      })
      .addCase(fetchEditArticle.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(fetchDeleteArticle.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchDeleteArticle.fulfilled, (state) => {
        state.loading = false
        
      })
      .addCase(fetchDeleteArticle.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(fetchFavoritedArticle.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchFavoritedArticle.fulfilled, (state,action) => {
        state.loading = false
       
        const newArr = state.articles.map((item)=>(
          action.payload.article.slug===item.slug? {...item,favorited:true, likes:action.payload.article.favoritesCount}:item
        ))
        state.articles = newArr
        if(state.selectArticle && state.selectArticle.slug===action.payload.article.slug){
          state.selectArticle = {...state.selectArticle, favorited:true, likes:action.payload.article.favoritesCount }
        }
       
      })
      .addCase(fetchFavoritedArticle.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(fetchUnFavoritedArticle.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUnFavoritedArticle.fulfilled, (state,action) => {
        state.loading = false
        const newArr = state.articles.map((item)=>(
          action.payload.article.slug===item.slug? {...item,favorited:false, likes:action.payload.article.favoritesCount}:item
        ))
        state.articles = newArr
        if(state.selectArticle && state.selectArticle.slug===action.payload.article.slug){
          state.selectArticle = {...state.selectArticle, favorited:false, likes:action.payload.article.favoritesCount }
        }
      })
      .addCase(fetchUnFavoritedArticle.rejected, (state) => {
        state.loading = false
        state.error = true
      })
  },
  selectors: {
    totalArticle: (state) => state.totalArticle,
    articlesArr: (state) => state.articles,
    selectArticle: (state) => state.selectArticle,
  },
})

export const { totalArticle, articlesArr, selectArticle } = blogSlice.selectors


export default blogSlice.reducer
