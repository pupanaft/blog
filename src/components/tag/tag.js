import classes from './tag.module.scss'

export default function Tag({ index, register, remove }) {
  return (
    <li>
      <label className={`${classes['article-form__item']} ${classes['article-form__item--tags']}`} htmlFor={`tagList.${index}`}>
        <input
          {...register(`tagList.${index}`, { required: 'This field is required' })}
          type="text"
          id={`tagList.${index}`}
          placeholder="Tag"
          className={classes['article-form__input']}
        />
        <button type='button' className={classes.tags__button} onClick={() => remove(index)}>Delete</button>
      </label>
    </li>
  )
}