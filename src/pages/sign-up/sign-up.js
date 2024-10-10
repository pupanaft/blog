import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { useEffect } from 'react'

import { errorServer, fetchCreateUser, user } from '../../store/userSlice'

import './sign-up.scss'

export default function SignUp() {
  const errorServerInfo = useSelector(errorServer)
  const userInfo = useSelector(user)

  const { register, handleSubmit, formState, watch } = useForm({ mode: 'onChange' })
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    dispatch(fetchCreateUser(data))
  }
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo) {
      navigate('/articles/1')
    }
  }, [userInfo, navigate])

  const nameError = formState.errors.name?.message
  const mailError = formState.errors.mail?.message
  const passwordError = formState.errors.password?.message
  const confirmPpassword = formState.errors.confirmPassword?.message
  const agrement = formState.errors.agrement?.message

  const userInput = classNames({
    form__input: true,
    'form__input--error': nameError || errorServerInfo?.username,
  })
  const mailInput = classNames({
    form__input: true,
    'form__input--error': mailError || errorServerInfo?.email,
  })
  const passwordInput = classNames({
    form__input: true,
    'form__input--error': passwordError,
  })
  const confirmPassword = classNames({
    form__input: true,
    'form__input--error': confirmPpassword,
  })

  return (
    <div className="blog__content">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form__title">Create new account</h1>
        <ul className="form__main">
          <li>
            <label className="form__item" htmlFor="name">
              <span className="form__text">Username</span>
              <input
                {...register('name', {
                  required: 'This field is required',
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters long',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Username must not exceed 20 characters',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message: 'Username can only contain letters, numbers, and underscores',
                  },
                })}
                type="text"
                className={userInput}
                id="name"
                placeholder="Username"
              />
              {nameError && <p className="form__error">{nameError}</p>}
              {errorServerInfo?.username && <p className="form__error">{errorServerInfo?.username}</p>}
            </label>
          </li>
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
              {errorServerInfo?.email && <p className="form__error">{errorServerInfo?.email}</p>}
            </label>
          </li>
          <li>
            <label className="form__item" htmlFor="Password">
              <span className="form__text">Password</span>
              <input
                {...register('password', {
                  required: 'This field is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                  maxLength: {
                    value: 40,
                    message: 'Password must not exceed 40 characters',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message: 'Password can only contain letters, numbers, and underscores',
                  },
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
            <label className="form__item" htmlFor="RepeatPassword">
              <span className="form__text">Repeat Password</span>
              <input
                {...register('confirmPassword', {
                  required: 'This field is required',
                  validate: (val) => {
                    if (watch('password') !== val) {
                      return 'Your passwords do no match'
                    }
                    return null
                  },
                })}
                type="password"
                autoComplete="off"
                className={confirmPassword}
                id="RepeatPassword"
                placeholder="Password"
              />
              {confirmPpassword && <p className="form__error">{confirmPpassword}</p>}
            </label>
          </li>
        </ul>
        <label className="form__agreement agreement " htmlFor="checkbox">
          <div className="agreement__wrapper">
            <input {...register('agrement', { required: 'This field is required' })} type="checkbox" id="checkbox" />
            <span>I agree to the processing of my personal information</span>
          </div>
          {agrement && <p className="form__error">{agrement}</p>}
        </label>

        <button className="form__submit" type="submit">
          Create
        </button>
        <footer className="form__footer">
          <span>Already have an account?</span>
          <Link to="/sign-in" className="form__link">
            {' '}
            Sign In.
          </Link>
        </footer>
      </form>
    </div>
  )
}
