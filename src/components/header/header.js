import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './header.scss'

import { logOut, user } from '../../store/userSlice'
import avatar from '../../images/avatar.png'

export default function Header() {
  const userInfo = useSelector(user)
  const dispatch = useDispatch()

  return (
    <header className="blog__header header">
      <Link to="/articles/1" className="header__logo">
        Realworld Blog
      </Link>
      <div className="header__nav nav">
        {!userInfo ? (
          <>
            <Link to="/sign-in" className="nav__link">
              Sign In
            </Link>
            <Link to="/sign-up" className="nav__link nav__link--active">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to="/new-article" className="nav__create-article">
              Create article
            </Link>
            <section className="header__user user">
              <div className="user__information">
                <div className="user__name">{userInfo.username}</div>
              </div>
              <img className="user__image" src={userInfo.image ? userInfo.image : avatar} alt="user-avatar" />
              <Link to="/profile" className="nav__profile" />
            </section>
            <button type="button" className="nav__log-out" onClick={() => dispatch(logOut())}>
              Log Out
            </button>
          </>
        )}
      </div>
    </header>
  )
}
