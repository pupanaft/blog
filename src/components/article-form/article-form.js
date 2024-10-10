import { useDispatch ,useSelector} from 'react-redux'
import { useForm , useFieldArray} from 'react-hook-form'
import './article-form.scss'
// import { useState } from 'react'
import { useEffect } from 'react'

import Tag from '../tag'
import { fetchCreateArticle } from '../../store/blogSlice'
import {user}from '../../store/userSlice'


export default function ArticleForm({title, editData}) {
  const userInfo = useSelector(user)
  const dispatch = useDispatch()
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
      const {token} = userInfo
      dispatch(fetchCreateArticle({data,token}))
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
    <main className="wrapper">
      <form className="article-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="article-form__title">{title}</h1>
        <ul className="article-form__main">
          <li>
            <label className="article-form__item" htmlFor="title">
              <span className="article-form__text">Title</span>
              <input
                {...register('title', {required: 'This field is required'})}
                type="text"
                id="title"
                placeholder="title"
                className='article-form__input'
              />
            </label>
          </li>
          <li>
            <label className="article-form__item" htmlFor="description">
              <span className="article-form__text">Short description</span>
              <input
                {...register('description', {required: 'This field is required'})}
                type="text"
                id="description"
                placeholder="description"
                className='article-form__input'
              />
            </label>
          </li>
          <li>
            <label className="article-form__item" htmlFor="Text">
              <span className="article-form__text">Text</span>
              <textarea
                {...register('body', {required: 'This field is required'})}
                type="text"
                id="Text"
                placeholder="Text"
                className='article-form__input article-form__input--area'
              />
            </label>
          </li>
        </ul>
        <div className='article-form__tags tags'>
          <span className="tags__title">Tags</span>
          <div className='tags__wrapper'>
            <ul className='tags__list' >
              {fields.map((field, index) => (
                <Tag 
                  key={field.id}
                  index={index}
                  register={register}
                  remove={remove}
                />
              ))}
            </ul>
            <button type='button' className='tags__button tags__button--add' onClick={() => append('')}>Add tag</button>
          </div>
        </div>
        <button className="article-form__submit" type="submit">Send</button>
      </form>
    </main>
  )
}
