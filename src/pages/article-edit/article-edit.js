
import { useSelector } from 'react-redux'

import {selectArticle} from '../../store/blogSlice'
import ArticleForm from '../../components/article-form'

export default function ArticleEdit() {
  const article = useSelector(selectArticle)
  const editData = {body:article.body, description:article.description, tagList:article.tags, title:article.title}
  console.log(editData)
  const title = 'Edit article'
  return <ArticleForm title={title} editData={editData} />
}
