export default function Tag({ index, register, remove }) {
  return (
    <li>
      <label className="article-form__item article-form__item--tags" htmlFor={`tagList.${index}`}>
        <input
          {...register(`tagList.${index}`, { required: 'This field is required' })}
          type="text"
          id={`tagList.${index}`}
          placeholder="Tag"
          className='article-form__input'
        />
        <button type='button' className='tags__button' onClick={() => remove(index)}>Delete</button>
      </label>
    </li>
  )
}