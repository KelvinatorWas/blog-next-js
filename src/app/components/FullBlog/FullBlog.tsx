import { BlogData } from "@/app/page";
import { getData } from "@/utils/crud";
import { linkComb, DB_BLOGS } from "@/utils/ServerLinks";
import { formatDistance } from "date-fns";
import { createElement } from "react";

type FullBlogProp = {
  name:string
}

const cleanStr = (str:string) => str.replaceAll("_"," ");

const FullBlog = async ({name}: FullBlogProp) => { 
  const {title, createdAt, updatedAt, content} = await getData<BlogData>(linkComb(DB_BLOGS, cleanStr(name)));
  const dateCreated = formatDistance(new Date(), createdAt!)
  const dateUpdate = updatedAt ? formatDistance(new Date(), updatedAt!) : ""


  const StrToHTML = ({ htmlContent }:{htmlContent:string}) => {
    return (
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
  };

  return (
    <>
      <h1>{title}</h1>
      <StrToHTML
        htmlContent={content}
      />
      <p>Created {dateCreated} ago.</p>
      <p>Last Update {dateUpdate} ago.</p>

      <div>
        Comment
      </div>
    </>
  );
};

export default FullBlog;
