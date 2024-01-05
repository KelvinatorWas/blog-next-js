'use client'
import { classComb } from '@/utils/ClassComb';
import css from './CommentSection.module.css'
import CommentForm from '../CommentForm/CommentForm';
import CommentContainer from '../CommentContainer/CommentContainer';
import { useState } from 'react';
import { CommentData } from '@/utils/Types';

export type CommentSectionProp = {
  post_id: number;
};

const CommentSection = ({post_id}:CommentSectionProp) => {
  const [comments, setAllComments] = useState<CommentData[]>([])

  const addToAllComments = (data:CommentData[]) => {
    setAllComments([...comments, ...data]);
  };
  
  return (
    <section
      className={css.comment_section}
    >
      <h2 className={classComb("nb")}>Comments</h2>

      <CommentForm
        post_id={post_id}
        addComment={addToAllComments}
      />

      <CommentContainer
        post_id={post_id}
        comments={comments}
        setAllComments={addToAllComments}
      />

    </section>
  );
}

export default CommentSection
