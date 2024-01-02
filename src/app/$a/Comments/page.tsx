'use client'
import { DB_COMMENTS, linkComb } from "@/utils/ServerLinks";
import { CommentData } from "@/utils/Types";
import { deleteData, getData } from "@/utils/crud";
import { useEffect, useState } from "react";

import css from './Comments.module.css'
import { LinkTo } from "@/app/components/LinkTo";
import { randInt } from "@/utils/utils";
import { classComb } from "@/utils/ClassComb";
import { CButton } from "@/app/components/CButton/CButton";

const Comments = () => {
  const [comments, setComments] = useState<CommentData[]>([]);

  const fetchData = async () => {
    try {
      const blogData = await getData<CommentData[]>(linkComb(DB_COMMENTS));
      setComments(blogData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const linkName = (str:string) => str.replace(/\s/gm, "_");

  const deleteComment = (id:number, index:number) => {
    deleteData(linkComb(DB_COMMENTS, `${id}`));
    const comment_data = comments.filter((_, id) => id !== index); 
    setComments(comment_data);
  };

  return (
    <section>
      <h1>Comments</h1>
      {
        comments.map(
          (comment, index) => 
            <div key={comment.comment_id} className={css.comment_container}>
              <div className={css.data_container}>
                <div className={css.pfp}></div>
                <p>John Doe</p>
              </div>
              <span className={css.comment_text}>
                {comment.content}
              </span>

              <div className={css.blog_data}>
                {
                  comment?.post_name ? 
                  <LinkTo
                    link={`/pages/blogs/${linkName(comment.post_name)}`}
                    innerText={comment.post_name}
                    className={classComb("sz16", "no_dec", "nb")}
                  /> : ""
                }

                <div className={css.delete}>
                  <CButton
                    specialClass="red"
                    innerText="Delete"
                    onClick={() => {deleteComment(comment.comment_id!, index)}}
                  />
                </div>
              </div>

            </div>
        )
      }
    </section>
  );
}

export default Comments