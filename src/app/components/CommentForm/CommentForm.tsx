'use client'
import { classComb } from '@/utils/ClassComb';
import css from './CommentForm.module.css'
import { CButton } from '../CButton/CButton';


const CommentForm = () => {

  return (
    <form className={css.comment_form}>
      <div className={css.data_container}>
        <div className={css.pfp}></div>
        <p>John Doe</p>
      </div>
      <textarea className={css.comment_area} placeholder='Leave a comment... :)' name="" id="" cols={30} rows={10}></textarea>

      <div className={css.submit_area}>
      <CButton
        innerText='Comment'
        specialClass='blue'
      />
      </div>

      

    </form>
  );
}

export default CommentForm