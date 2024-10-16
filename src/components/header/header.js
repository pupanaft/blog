import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


import { logOut, user } from '../../store/userSlice'
import avatar from '../../images/avatar.png'

import classes from './header.module.scss'

export default function Header() {
  const userInfo = useSelector(user)
  const dispatch = useDispatch()

  return (
    <header className={`${classes.blog__header} ${classes.header}`}>
      <Link to="/articles/1" className={classes.header__logo}>
        Realworld Blog
      </Link>
      <div className={`${classes.header__nav} ${classes.nav}`}>
        {!userInfo ? (
          <>
            <Link to="/sign-in" className={classes.nav__link}>
              Sign In
            </Link>
            <Link to="/sign-up" className={`${classes.nav__link} ${classes['nav__link--active']}`}>
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to="/new-article" className={classes['nav__create-article']}>
              Create article
            </Link>
            <section className={`${classes.header__user} ${classes.user}`}>
              <div className={classes.user__information}>
                <div className={classes.user__name}>{userInfo.username}</div>
              </div>
              <img className={classes.user__image} src={userInfo.image ? userInfo.image : avatar} alt="user-avatar" />
              <Link to="/profile" className={classes.nav__profile} />
            </section>
            <button type="button" className={classes['nav__log-out']} onClick={() => {
              dispatch(logOut())
              localStorage.removeItem('userToken')
            }}>
              Log Out
            </button>
          </>
        )}
      </div>
    </header>
  )
}
