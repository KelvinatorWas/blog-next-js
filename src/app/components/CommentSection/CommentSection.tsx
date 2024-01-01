'use client'
import { classComb } from '@/utils/ClassComb';
import css from './CommentSection.module.css'
import CommentForm from '../CommentForm/CommentForm';
import CommentContainer from '../CommentContainer/CommentContainer';

export type CommentSectionProp = {
  post_id: number;
}

const CommentSection = ({post_id}:CommentSectionProp) => {
  
  return (
    <section
      className={css.comment_section}
    >
      <h2 className={classComb("nb")}>Comments</h2>

      <CommentForm
        post_id={post_id}
      />

      <CommentContainer
        post_id={post_id}
      />

    </section>
  );
}

export default CommentSection