import { Routes, Route, Navigate } from 'react-router-dom'

import Header from '../header'
import ArticlesList from '../../pages/articles-list'
import ArticlePage from '../../pages/article-page/article-page'
import SignUp from '../../pages/sign-up'
import SignIn from '../../pages/sign-in'
import Profile from '../../pages/profile'
import NewArticle from '../../pages/new-article'
import ArticleEdit from '../../pages/article-edit'

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/articles/1" replace />} />
        <Route path="/articles/:page" element={<ArticlesList />} />
        <Route path="/articles/:page/:slug" element={<ArticlePage />} />
        <Route path="/articles/:page/:slug/edit" element={<ArticleEdit />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/new-article" element={<NewArticle />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="*" element={<div>pusto</div>} />
      </Routes>
    </>
  )
}
