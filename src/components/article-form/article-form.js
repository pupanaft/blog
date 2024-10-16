import { useDispatch ,useSelector} from 'react-redux'
import { useForm , useFieldArray} from 'react-hook-form'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Tag from '../tag'
import {user}from '../../store/userSlice'

import classes from './article-form.module.scss'


export default function ArticleForm({title, editData, fetch, slug=''}) {
  const userInfo = useSelector(user)
  const dispatch = useDispatch()
  const navavigate = useNavigate()
  const { register, control, handleSubmit ,reset} = useForm({
    defaultValues: {
      tagList: [''] 
    }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList'
  })
  const onSubmit = (data) => {
    if(userInfo){
      if(slug){
        dispatch(fetch({slug,data}))
        navavigate('/')
      }else{
        dispatch(fetch({data}))
        navavigate('/')
      }
   
    }

  }
  useEffect(() => {
    if(editData){
      reset(editData)
    }else{
      append('')
    }
  }, [reset,append,editData])
  return (
    <main >
      <form className={classes['article-form']} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes['article-form__title']}>{title}</h1>
        <ul className={classes['article-form__main']}>
          <li>
            <label className={classes['article-form__item']} htmlFor="title">
              <span className={classes['article-form__text']}>Title</span>
              <input
                {...register('title', {required: 'This field is required'})}
                type="text"
                id="title"
                placeholder="title"
                className={classes['article-form__input']}
              />
            </label>
          </li>
          <li>
            <label className={classes['article-form__item']} htmlFor="description">
              <span className={classes['article-form__text']}>Short description</span>
              <input
                {...register('description', {required: 'This field is required'})}
                type="text"
                id="description"
                placeholder="description"
                className={classes['article-form__input']}
              />
            </label>
          </li>
          <li>
            <label className={classes['article-form__item']} htmlFor="Text">
              <span className={classes['article-form__text']}>Text</span>
              <textarea
                {...register('body', {required: 'This field is required'})}
                type="text"
                id="Text"
                placeholder="Text"
                className={`${classes['article-form__input']} ${classes['article-form__input--area']}`}
              />
            </label>
          </li>
        </ul>
        <div className={`${classes['article-form__tags']} ${classes.tags}`}>
          <span className={classes.tags__title}>Tags</span>
          <div className={classes.tags__wrapper}>
            <ul className={classes.tags__list} >
              {fields.map((field, index) => (
                <Tag 
                  key={field.id}
                  index={index}
                  register={register}
                  remove={remove}
                />
              ))}
            </ul>
            <button type='button' className={`${classes.tags__button} ${classes['tags__button--add']}`} onClick={() => append('')}>Add tag</button>
          </div>
        </div>
        <button className={classes['article-form__submit']} type="submit">Send</button>
      </form>
    </main>
  )
}
