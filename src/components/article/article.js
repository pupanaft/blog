import { HeartOutlined } from '@ant-design/icons'
import './article.scss'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'

export default function Article({ itemInfo, page, body = '' }) {
  const tags = itemInfo.tags.map((tag) => (
    <li key={`key-${tag}`} className="tag">
      {tag}
    </li>
  ))

  return (
    <li className="article">
      <span className="article__header">
        <h2 className="article__title">{itemInfo.title}</h2>
        <HeartOutlined />
        <div className="article__likes">{itemInfo.likes}</div>
      </span>
      <ul className="article__tags">{tags}</ul>
      <p className="article__body">{itemInfo.description}</p>
      <section className="article__user user">
        <div className="user__information">
          <div className="user__name">{itemInfo.user}</div>
          <span className="user__time">{itemInfo.data}</span>
        </div>
        <img className="user__image" src={itemInfo.avatar} alt="user-avatar" />
      </section>
      {body.length <= 0 ? (
        <Link to={`/articles/${page}/${itemInfo.slug}`} className="article__link" />
      ) : (
        <div>{parse(body)}</div>
      )}
    </li>
  )
}
