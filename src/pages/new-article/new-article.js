import ArticleForm from '../../components/article-form'
import { fetchCreateArticle } from '../../store/blogSlice'

export default function NewArticle() {
  const title = 'Create new article'
  return <ArticleForm fetch={fetchCreateArticle} title={title} />
}
