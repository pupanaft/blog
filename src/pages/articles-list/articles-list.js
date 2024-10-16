import { useEffect } from 'react'
import { ConfigProvider, Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import Article from '../../components/article'
import { fetchArticles, totalArticle, articlesArr } from '../../store/blogSlice'

import classes from './articles-list.module.scss'

export default function ArticlesList() {
  const { page } = useParams()
  const navigate = useNavigate()
  const total = useSelector(totalArticle)
  const articles = useSelector(articlesArr)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchArticles(page))
  }, [dispatch, page])

  const ariclePage = articles.map((article) => <Article key={article.slug} page={page} itemInfo={article} />)
  const handlePageChange = (newPage) => {
    navigate(`/articles/${newPage}`)
  }

  return (
    <>
      <ul className={classes.blog__content}>{ariclePage}</ul>
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemActiveBg: '#1677ff',
              itemBg: 'rgba(235, 238, 243, 1)',
            },
          },
          token: {
            fontWeightStrong: '400',
            colorPrimary: '#ffffff',
          },
        }}
      >
        <Pagination
          total={total}
          defaultCurrent={page}
          current={page}
          pageSize={5}
          onChange={(e) => handlePageChange(e)}
          showSizeChanger={false}
          align="center"
        />
      </ConfigProvider>
    </>
  )
}
