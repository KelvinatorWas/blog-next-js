import { classComb } from '@/utils/ClassComb';
import css from './CommentSection.module.css'
import CommentForm from '../CommentForm/CommentForm';
import CommentContainer from '../CommentContainer/CommentContainer';


const CommentSection = () => {

  return (
    <section
      className={css.comment_section}
    >
      <h2 className={classComb("nb")}>Comments</h2>
      <CommentForm/>
      <CommentContainer/>

    </section>
  );
}

export default CommentSection