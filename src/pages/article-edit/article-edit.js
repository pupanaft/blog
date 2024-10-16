
import { useSelector } from 'react-redux'

import { fetchEditArticle, selectArticle} from '../../store/blogSlice'
import ArticleForm from '../../components/article-form'

export default function ArticleEdit() {
  const article = useSelector(selectArticle)
  const editData = {body:article.body, description:article.description, tagList:article.tags, title:article.title}

  const title = 'Edit article'

  return <ArticleForm title={title} slug={article.slug} fetch={fetchEditArticle} editData={editData} />
}
