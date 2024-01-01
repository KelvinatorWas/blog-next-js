import css from './CommentContainer.module.css'

const CommentContainer = () => {
  return (
    <div className={css.comment_container}>
      <div className={css.data_container}>
        <div className={css.pfp}></div>
        <p>John Doe</p>
      </div>
      <span className={css.comment_text}>
        Hello Comment NextJS kinda ass
      </span>
    </div>
  );
}

export default CommentContainer;