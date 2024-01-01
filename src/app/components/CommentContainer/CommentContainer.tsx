'use client'

import { useEffect, useState } from 'react';
import css from './CommentContainer.module.css'
import { getData } from '@/utils/crud';
import { CommentData } from '@/utils/Types';
import { DB_COMMENTS, linkComb } from '@/utils/ServerLinks';
import { CommentSectionProp } from '../CommentSection/CommentSection';
import { randInt } from '@/utils/utils';

const CommentContainer = ({post_id}: CommentSectionProp) => {
  const [comments, setAllComments] = useState<CommentData[]>()

  const fetchData = async () => {
    try {
      const blogData = await getData<CommentData[]>(linkComb(DB_COMMENTS, `${post_id}`));
      setAllComments(blogData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  if (!comments) return (<p>Loading...</p>);

  return (
    <>
      {
        comments.map(
          (comment) => 
            <div key={randInt()} className={css.comment_container}>
              <div className={css.data_container}>
                <div className={css.pfp}></div>
                <p>John Doe</p>
              </div>
              <span className={css.comment_text}>
                {comment.content}
              </span>
            </div>
        )
      }
    </>
  )
}

export default CommentContainer;
