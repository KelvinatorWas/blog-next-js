import { getData } from "@/utils/Crud";
import { linkComb, DB_BLOGS } from "@/utils/ServerLinks";
import { formatDistance } from "date-fns";
import CommentSection from "../CommentSection/CommentSection";
import css from './FullBlog.module.css'
import TagHook from "./hook/TagHook";
import { LinkTo } from "../LinkTo";
import { BlogData } from "@/utils/Types";

type FullBlogProp = {
  name:string
};

const cleanStr = (str:string) => str.replaceAll("_"," ");

const FullBlog = async ({name}: FullBlogProp) => { 
  const {title, createdAt, updatedAt, content, post_id} = await getData<BlogData>(linkComb(DB_BLOGS, cleanStr(name)));
  const dateCreated = formatDistance(new Date(), createdAt!);
  const dateUpdate = updatedAt ? formatDistance(new Date(), updatedAt!) : "";
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
                link={{
                  pathname:"/pages/blogs",
                  query: {
                    "id":`${tag.tag_id}`,
                    "tag":`${tag.name}`
                  }
                }}
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
