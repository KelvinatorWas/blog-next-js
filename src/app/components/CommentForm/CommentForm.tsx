'use client'
import { classComb } from '@/utils/ClassComb';
import css from './CommentForm.module.css'
import { CButton } from '../CButton/CButton';
import { ChangeEvent, TextareaHTMLAttributes, useState } from 'react';
import { CommentData } from '@/utils/Types';
import { format } from 'date-fns';
import { uploadData } from '@/utils/crud';
import { DB_COMMENTS } from '@/utils/ServerLinks';

export type CommentFormProp = {
  post_id: number;
  addComment: (data:CommentData[]) => void;
}

const CommentForm = ({post_id, addComment}:CommentFormProp) => {
  const [comment, setComment] = useState("");

  const onSubmitComment =  (e:MouseEvent) => {
    e.preventDefault();
    if (!comment) return;

    const createdAt = format(new Date(), "yyyy-MM-dd HH-mm-ss");

    const Comment:CommentData = {
      post_id: post_id,
      user_id: 1,
      content:comment,
      createdAt: createdAt,
      updatedAt: null
    }

    uploadData(DB_COMMENTS, Comment);
    setComment("");

    addComment([Comment]);

    console.log("HEllo: ", comment);
  }

  const onCommentChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  }

  return (
    <form className={css.comment_form}>
      <div className={css.data_container}>
        <div className={css.pfp}></div>
        <p>John Doe</p>
      </div>

      <textarea 
        className={css.comment_area}
        placeholder='Leave a comment... :)'
        name=""
        id=""
        cols={30}
        rows={10}
        maxLength={2000}
        required
        onChange={onCommentChange}
        value={comment}
      ></textarea>

      <div className={css.submit_area}>
        <CButton
          innerText='Comment'
          specialClass='blue'
          onClick={onSubmitComment}
        />
      </div>

      

    </form>
  );
}

export default CommentForm