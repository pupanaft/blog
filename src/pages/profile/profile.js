import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'

import { errorServer, fetchEditUser,  } from '../../store/userSlice'

import classes from './profile.module.scss'

export default function Profile() {
  const errorServerInfo = useSelector(errorServer)

  const { register, handleSubmit, formState } = useForm({ mode: 'onChange' })
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    const newData = Object.fromEntries(Object.entries(data).filter(([, value]) => value !== ''))

    const newUser = { user: { ...newData } }

    dispatch(fetchEditUser({ newUser }))
  }

  const nameError = formState.errors.username?.message
  const mailError = formState.errors.email?.message
  const passwordError = formState.errors.password?.message
  const avatarError = formState.errors.image?.message

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
  const avatarInput = classNames({
    [classes.form__input]: true,
    [classes['form__input--error']]: avatarError,
  })

  return (
    <div className={classes.blog__content}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes.form__title}>Edit Profile</h1>
        <ul className={classes.form__main}>
          <li>
            <label className={classes.form__item} htmlFor="username">
              <span className={classes.form__text}>Username</span>
              <input
                {...register('username', {
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
                id="username"
                placeholder="Username"
              />
              {nameError && <p className={classes.form__error}>{nameError}</p>}
              {errorServerInfo?.username && <p className={classes.form__error}>{`Username ${errorServerInfo.username}`}</p>}
            </label>
          </li>
          <li>
            <label className={classes.form__item} htmlFor="email">
              <span className={classes.form__text}>Email address</span>
              <input
                {...register('email', {
                  pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: 'email must be a valid email address, must not be blank',
                  },
                })}
                type="text"
                className={mailInput}
                id="email"
                placeholder="Email address"
              />
              {mailError && <p className={classes.form__error}>{mailError}</p>}
              {errorServerInfo?.email && <p className={classes.form__error}>{`Email ${errorServerInfo?.email}`}</p>}
            </label>
          </li>
          <li>
            <label className={classes.form__item} htmlFor="Password">
              <span className={classes.form__text}>New password</span>
              <input
                {...register('password', {
                  minLength: {
                    value: 6,
                    message: 'New password must be at least 6 characters long',
                  },
                  maxLength: {
                    value: 40,
                    message: 'New password must not exceed 40 characters',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message: 'New password can only contain letters, numbers, and underscores',
                  },
                })}
                type="password"
                className={passwordInput}
                autoComplete="off"
                id="Password"
                placeholder="New password"
              />
              {passwordError && <p className={classes.form__error}>{passwordError}</p>}
            </label>
          </li>
          <li>
            <label className={classes.form__item} htmlFor="avatar">
              <span className={classes.form__text}>Avatar image (url)</span>
              <input
                {...register('image', {
                  pattern: {
                    value: /^https:\/\/.*$/,
                    message: 'url is wrong, it should start with https://',
                  },
                })}
                type="text"
                autoComplete="off"
                className={avatarInput}
                id="avatar"
                placeholder="Avatar image"
              />
              {avatarError && <p className={classes.form__error}>{avatarError}</p>}
            </label>
          </li>
        </ul>
        <button className={classes.form__submit} type="submit">
          Save
        </button>
      </form>
    </div>
  )
}
