import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchArticles = createAsyncThunk('blog/fetchArticles', async (activePagination, { rejectWithValue }) => {
  try {
    const offset = (activePagination - 1) * 5
    const response = await fetch(`https://blog-platform.kata.academy/api/articles?limit=5&offset=${offset}`)

    const body = await response.json()
    const { articles, articlesCount } = body

    const dataArticle = articles.map((item) => ({
      title: item.title,
      likes: item.favoritesCount,
      tags: item.tagList,
      description: item.description,
      user: item.author.username,
      avatar: item.author.image,
      data: item.createdAt,
      slug: item.slug,
    }))

    return { dataArticle, articlesCount }
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
export const fetchOneArticle = createAsyncThunk('blog/fetchOneArticle', async (slug, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`)

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
    }

    return { dataArticle }
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
export const fetchCreateArticle = createAsyncThunk('blog/fetchCreateArticle', async ({data, token}, { rejectWithValue }) => {
  const response = await fetch('https://blog-platform.kata.academy/api/articles', {
    method: 'post',
    headers: {
      'Authorization':`Token ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'article':{...data}})
  }).then(async (responce) => await responce.json()).catch((e) => e)  // eslint-disable-line
  return response instanceof Error ? rejectWithValue(response.message) : response
})

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
  },
  selectors: {
    totalArticle: (state) => state.totalArticle,
    articlesArr: (state) => state.articles,
    selectArticle: (state) => state.selectArticle,
  },
})

export const { totalArticle, articlesArr, selectArticle } = blogSlice.selectors

// export const { setActivePagination,} = blogSlice.actions

export default blogSlice.reducer
