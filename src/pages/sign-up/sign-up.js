import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { useEffect } from 'react'

import { errorServer, fetchCreateUser, user } from '../../store/userSlice'

import classes from './sign-up.module.scss'

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
    [classes.form__input]: true,
    [classes['form__input--error']]: nameError || errorServerInfo?.username,
  })
  const mailInput = classNames({
    [classes.form__input]: true,
    [classes['form__input--error']]: mailError || errorServerInfo?.email,
  })
  const passwordInput = classNames({
    [classes.form__input]: true,
    [classes['form__input--error']]: passwordError,
  })
  const confirmPassword = classNames({
    [classes.form__input]: true,
    [classes['form__input--error']]: confirmPpassword,
  })

  return (
    <div className={classes.blog__content}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes.form__title}>Create new account</h1>
        <ul className={classes.form__main}>
          <li>
            <label className={classes.form__item} htmlFor="name">
              <span className={classes.form__text}>Username</span>
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
              {nameError && <p className={classes.form__error}>{nameError}</p>}
              {errorServerInfo?.username && <p className={classes.form__error}>{`Username ${errorServerInfo.username}`}</p>}
            </label>
          </li>
          <li>
            <label className={classes.form__item} htmlFor="Email">
              <span className={classes.form__text}>Email address</span>
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
              {mailError && <p className={classes.form__error}>{mailError}</p>}
              {errorServerInfo?.email && <p className={classes.form__error}>{`Email ${errorServerInfo?.email}`}</p>}
            </label>
          </li>
          <li>
            <label className={classes.form__item} htmlFor="Password">
              <span className={classes.form__text}>Password</span>
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
              {passwordError && <p className={classes.form__error}>{passwordError}</p>}
            </label>
          </li>
          <li>
            <label className={classes.form__item} htmlFor="RepeatPassword">
              <span className={classes.form__text}>Repeat Password</span>
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
              {confirmPpassword && <p className={classes.form__error}>{confirmPpassword}</p>}
            </label>
          </li>
        </ul>
        <label className={`${classes.form__agreement} ${classes.agreement}`} htmlFor="checkbox">
          <div className={classes.agreement__wrapper}>
            <input {...register('agrement', { required: 'This field is required' })} type="checkbox" id="checkbox" />
            <span className={classes.agreement__text}>I agree to the processing of my personal information</span>
          </div>
          {agrement && <p className={classes.form__error}>{agrement}</p>}
        </label>

        <button className={classes.form__submit} type="submit">
          Create
        </button>
        <footer className={`${classes.form__footer} ${classes.footer}`}>
          <span className={classes.footer__text}>Already have an account?</span>
          <Link to="/sign-in" className={classes.form__link}>
            {' '}
            Sign In.
          </Link>
        </footer>
      </form>
    </div>
  )
}
