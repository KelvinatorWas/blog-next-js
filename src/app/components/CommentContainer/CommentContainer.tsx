/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react';
import css from './CommentContainer.module.css'
import { getData } from '@/utils/Crud';
import { CommentData } from '@/utils/Types';
import { DB_COMMENTS, linkComb } from '@/utils/ServerLinks';
import { randInt } from '@/utils/utils';

type CommentContainerProp = {
  post_id:number,
  comments: CommentData[],
  setAllComments: (data:CommentData[]) => void;
};

const CommentContainer = ({post_id, comments, setAllComments}: CommentContainerProp) => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogData = await getData<CommentData[]>(linkComb(DB_COMMENTS, `${post_id}`));
        setAllComments(blogData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
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
