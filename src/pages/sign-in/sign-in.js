import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { errorServer, fetchExitingUser, user } from '../../store/userSlice'

import './sign-in.scss'

export default function SignIn() {
  const errorServerInfo = useSelector(errorServer)
  const userInfo = useSelector(user)
  const { register, handleSubmit, formState } = useForm({ mode: 'onChange' })
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    dispatch(fetchExitingUser(data))
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo) {
      navigate('/articles/1')
    }
  }, [userInfo, navigate])

  const mailError = formState.errors.mail?.message
  const passwordError = formState.errors.password?.message

  const mailInput = classNames({
    form__input: true,
    'form__input--error': mailError || (errorServerInfo && errorServerInfo['email or password']),
  })
  const passwordInput = classNames({
    form__input: true,
    'form__input--error': passwordError || (errorServerInfo && errorServerInfo['email or password']),
  })

  return (
    <div className="blog__content">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form__title">Sign In</h1>
        <ul className="form__main">
          <li>
            <label className="form__item" htmlFor="Email">
              <span className="form__text">Email address</span>
              <input
                {...register('mail', {
                  required: 'This field is required',
                  pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: 'email must be a valid email address, must not be blank',
                  },
                })}
                type="text"
                className={mailInput}
                id="Email"
                placeholder="Email address"
              />
              {mailError && <p className="form__error">{mailError}</p>}
            </label>
          </li>
          <li>
            <label className="form__item" htmlFor="Password">
              <span className="form__text">Password</span>
              <input
                {...register('password', {
                  required: 'This field is required',
                })}
                type="password"
                className={passwordInput}
                autoComplete="off"
                id="Password"
                placeholder="Password"
              />
              {passwordError && <p className="form__error">{passwordError}</p>}
            </label>
          </li>
          <li>
            {errorServerInfo && errorServerInfo['email or password'] && (
              <p className="form__error">{`Email or password ${errorServerInfo['email or password']}`}</p>
            )}
          </li>
        </ul>
        <button className="form__submit" type="submit">
          Login
        </button>
        <footer className="form__footer">
          <span>Don’t have an account?</span>
          <Link to="/sign-up" className="form__link">
            {' '}
            Sign Up.
          </Link>
        </footer>
      </form>
    </div>
  )
}
