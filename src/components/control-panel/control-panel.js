import { Link, useParams, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'

import { fetchDeleteArticle } from '../../store/blogSlice'

import classes from './control-panel.module.scss'
import mark from './exclamation-mark.svg'

export default function ControlPanel({slug}) {
  const { page } = useParams()
  const [dropDown, setDropDown] = useState(false)
  const className = classNames({
    [classes['article__delete-menu']]:true,
    [classes['delete-menu']]:true,
    [classes['article__delete-menu--open']]:dropDown
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const hendleDelete = () =>{
    dispatch(fetchDeleteArticle({slug}))
    navigate(`/articles/${page}`)
  }

  return(
    <div className={classes['article__control-panel']}>
      <button type='button' className={classes.article__button} onClick={()=>setDropDown(true)}>Delete</button>
      <div className={className}>
        <div className={classes['delete-menu__content']}>
          <img src={mark} className={classes['delete-menu__image']} alt='exclamation mark' />
          <span className={classes['delete-menu__text']}>Are you sure to delete this article?</span>    
        </div>
        <div className={classes['delete-menu__buttons-wrapper']}>
          <button type='button' className={classes['delete-menu__button']} onClick={()=>setDropDown(false)}>No</button>
          <button type='button'className={`${classes['delete-menu__button']} ${classes['delete-menu__button--fetch']}`} onClick={()=>hendleDelete()}>Yes</button>
        </div>
      </div>
      <Link to={`/articles/${page}/${slug}/edit`} className={`${classes.article__button} ${classes['article__button--edit']}`}>Edit</Link>
    </div>

  ) 
}
