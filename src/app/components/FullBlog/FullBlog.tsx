import { BlogData } from "@/app/page";
import { getData } from "@/utils/crud";
import { linkComb, DB_BLOGS } from "@/utils/ServerLinks";
import { formatDistance } from "date-fns";
import { createElement } from "react";
import CommentSection from "../CommentSection/CommentSection";
import { classComb } from "@/utils/ClassComb";
import css from './FullBlog.module.css'
import TagHook from "./hook/TagHook";
import { LinkTo } from "../LinkTo";
type FullBlogProp = {
  name:string
}

const cleanStr = (str:string) => str.replaceAll("_"," ");

const FullBlog = async ({name}: FullBlogProp) => { 
  const {title, createdAt, updatedAt, content, post_id} = await getData<BlogData>(linkComb(DB_BLOGS, cleanStr(name)));
  const dateCreated = formatDistance(new Date(), createdAt!)
  const dateUpdate = updatedAt ? formatDistance(new Date(), updatedAt!) : ""

  const {tags} = await TagHook(post_id);

  const StrToHTML = ({ htmlContent }:{htmlContent:string}) => {
    return (
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
  };

  return (
    <>
      <div className={css.blog_container}>
        <h1>{title}</h1>

        <StrToHTML
          htmlContent={content}
        />

        <p>Created {dateCreated} ago.</p>
        
        {
          dateUpdate ? <p>Last Update {dateUpdate} ago.</p> : ""
        }

        <div className={css.tag_section}>
          {
            tags.map((tag) => 
            <LinkTo
              key={tag.name}
              innerText={`#${tag.name}`}
              link=""
              className=""
            />
            )
          }
        </div>
      </div>
      <CommentSection post_id={post_id}/>
    </>
  );
};

export default FullBlog;
