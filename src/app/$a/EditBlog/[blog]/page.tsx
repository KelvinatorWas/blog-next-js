'use client'
import { DB_BLOGS, DB_POST_TAGS, linkComb } from "@/utils/ServerLinks";
import { deleteData, getData, updateData, uploadData } from "@/utils/Crud";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import TagManager from "../../../components/TagManager/TagManager";
import { BlogData, TagData, TagPostData } from "@/utils/Types";
import MyEditor from "@/app/components/Editor/Editor";
import css from './EditBlog.module.css'

const cleanStr = (str:string) => str.replaceAll("_"," ");

const EditBlog = ({params}: {params:{blog:string}}) => {
  const [blogData, setBlogData] = useState<BlogData>();
  const [oldTitle, setOldTitle] = useState("");
  const [HTML, setHTML] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getblogData = await getData<BlogData>(linkComb(DB_BLOGS, cleanStr(params.blog)));
        
        setBlogData(getblogData);
        setOldTitle(getblogData.title);
  
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchData();
  }, [params.blog]);

  const StrToHTML = ({ htmlContent }:{htmlContent:string}) => {
    return (
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
  };

  const onSave = (blogTags: TagData[]) => {
    if (!blogData || !oldTitle) return;

    // Delete Tags
    deleteData(linkComb(DB_POST_TAGS, `${blogData.post_id}`));

    const updatedAt = format(new Date(), 'yyyy-MM-dd HH-mm-ss');
    const createdAt = format(blogData.createdAt!, 'yyyy-MM-dd HH-mm-ss');

    const newBlog:BlogData = {
      post_id: blogData.post_id,
      title:oldTitle,
      content: HTML,
      createdAt: createdAt,
      updatedAt: updatedAt,
    };

    updateData(linkComb(DB_BLOGS, `${blogData.post_id}`), newBlog);
    setOldTitle("");

    const allTags:TagPostData[] = [];

    blogTags.forEach((tag) => allTags.push({tag_id:tag.tag_id, post_id:blogData.post_id}));

    // Tags
    uploadData(DB_POST_TAGS, allTags);
  };

  const updateHTML = (e:string) => {
    setHTML(e);
  };

  return (
    blogData ? 
    <section className={css.create_container}>
      <h1>{oldTitle}</h1>

      <div className={css.input_container}>
          <label className={css.title}>Title</label>
          <input
            placeholder="Title..."
            className={css.input}
            type="text"
            onChange={(e) => {
              setOldTitle(e.target.value);
            }}
            value={oldTitle}
          />
      </div>

      <MyEditor 
        setHTML={updateHTML}
        htmlString={blogData.content}
      />
      
      <TagManager
        onSubmit={onSave}
        mode="Save"
        post_id={blogData.post_id}
      /> 
      
      <h2>Preview</h2>

      <StrToHTML
        htmlContent={HTML}
      />
    </section>

    : <h2>Loading...</h2>
  )
};

export default EditBlog;
