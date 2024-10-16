import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import showdown from 'showdown'

import { fetchOneArticle, selectArticle } from '../../store/blogSlice'
import Article from '../../components/article'

import classes from './article-page.module.scss'

export default function ArticlePage() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    if (slug) {
      dispatch(fetchOneArticle(slug))
    }
  }, [dispatch, slug])
  const article = useSelector(selectArticle)
  if (article) {
    const { body, ...articleParams } = article
    const converter = new showdown.Converter()
    const html = converter.makeHtml(body)
    return (
      <div className={classes.blog__wrapper}>
        <Article itemInfo={articleParams} body={html} />
      </div>
    )
  }
}
