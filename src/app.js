import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import Header from './components/header'
import ArticlePage from './pages/article-page/article-page'
import SignUp from './pages/sign-up'
import SignIn from './pages/sign-in'
import Profile from './pages/profile'
import NewArticle from './pages/new-article'
import ArticleEdit from './pages/article-edit'
import { checkAuth ,user} from './store/userSlice'
import ProtectedRoute from './hoc/protect-route'
import ArticlesList from './pages/articles-list'

export default function App() {
  const dispatch = useDispatch()
  const userInfo = useSelector(user)

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/articles/1" replace />} />
        <Route path="/articles/:page" element={<ArticlesList />} />
        <Route path="/articles/:page/:slug" element={<ArticlePage />} />
        <Route path="/articles/:page/:slug/edit" element={
          <ProtectedRoute userInfo={userInfo} >
            <ArticleEdit />
          </ProtectedRoute>} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/new-article" element={
          <ProtectedRoute userInfo={userInfo} >
            <NewArticle />
          </ProtectedRoute>} />
        <Route path="/profile" element={ 
          <ProtectedRoute userInfo={userInfo} >
            <Profile />
          </ProtectedRoute>} />
        <Route path="*" element={<div>pusto</div>} />
      </Routes>
    </>
  )
}
