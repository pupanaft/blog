import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import {user} from '../../store/userSlice'
import ControlPanel from '../control-panel'
import { fetchFavoritedArticle ,fetchUnFavoritedArticle} from '../../store/blogSlice'

import classes from './article.module.scss'


export default function Article({ itemInfo, page, body = '' }) {
  const userInfo = useSelector(user)
  const dispatch = useDispatch()

  function validateTags(tags) {
    const uniqueTags = new Set()
    if(tags!==null){
      tags.forEach(tag => {
        if (tag !== null && tag.trim() !== '') {
          uniqueTags.add(tag.trim())
        }
      })
      const tagsArray =  Array.from(uniqueTags)
      const tagsJsx = tagsArray.map((tag) => (
        <li key={`key-${tag}`} className={classes.tag}>
          {tag}
        </li>
      ))
      return tagsJsx
    }
    return ''
  }
  const tags = validateTags(itemInfo.tags)
  
  const handleFavorite = (slug) => {
    if (userInfo){
      dispatch(fetchFavoritedArticle({slug}))
    }
  }
  const handleUnFavorite = (slug) => {
    if (userInfo){
      dispatch(fetchUnFavoritedArticle({slug}))
    }
  }
  const heartClassName = classNames({
    [classes.article__heart]:true,
    [classes['article__heart--filled']]:itemInfo.favorited && userInfo,
    [classes['article__heart--user']]:userInfo
  })
  const articleClassName = classNames({
    [classes.article]:true,
    [classes['article--full']]:body 
  })
  
  return (
    <li className={articleClassName}>
      <span className={classes.article__header}>
        <h2 className={classes.article__title}>{!body? itemInfo.title.slice(0, 19):itemInfo.title}</h2>
        {itemInfo.favorited && userInfo?
          <HeartFilled className={heartClassName} onClick={()=>handleUnFavorite(itemInfo.slug)}/>
          :
          <HeartOutlined className={heartClassName} onClick={()=>handleFavorite(itemInfo.slug)}/>
        }
        <div className={classes.article__likes}>{itemInfo.likes}</div>
      </span>
      <ul className={classes.article__tags}>{tags}</ul>
      <p className={classes.article__body}>{!body? itemInfo.description.slice(0, 19):itemInfo.description }</p>
      <section className={`${classes.article__user} ${classes.user}`}>
        <div className={classes.user__wrapper}>
          <div className={classes.user__information}>
            <div className={classes.user__name}>{itemInfo.user}</div>
            <span className={classes.user__time}>{itemInfo.data}</span>
          </div>
          <img className={classes.user__image} src={itemInfo.avatar} alt="user-avatar" />
        </div>
        {userInfo && itemInfo.user=== userInfo.username && body?
          <ControlPanel slug={itemInfo.slug}/>
          :null}
      </section>
      {body.length <= 0 ? (
        <Link to={`/articles/${page}/${itemInfo.slug}`} className={classes.article__link} />
      ) : (
        <div className={classes['article__mkdown-text']}>{parse(body)}</div>
      )}
    </li>
  )
}
