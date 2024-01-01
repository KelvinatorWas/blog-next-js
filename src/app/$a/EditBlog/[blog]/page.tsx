'use client'
import { CButton } from "@/app/components/CButton/CButton";
import { BlogData } from "@/app/page";
import { DB_BLOGS, DB_POST_TAGS, linkComb } from "@/utils/ServerLinks";
import { deleteData, getData, updateData, uploadData } from "@/utils/crud";
import { format } from "date-fns";
import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { Editor} from "react-draft-wysiwyg";
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TagManager from "../../Components/TagManager/TagManager";
import { TagData, TagPostData } from "@/utils/Types";


const cleanStr = (str:string) => str.replaceAll("_"," ");

const EditBlog = ({params}: {params:{blog:string}}) => {
  const [blogData, setBlogData] = useState<BlogData>();
  const [oldTitle, setOldTitle] = useState(blogData?.title);
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  const fetchData = async () => {
    try {
      console.log(params.blog)
      const getblogData = await getData<BlogData>(linkComb(DB_BLOGS, cleanStr(params.blog)));
      
      setBlogData(getblogData);
      setOldTitle(getblogData.title);

      const block = convertFromHTML(getblogData.content)

      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(block.contentBlocks, block.entityMap)
        )
      )
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const convertToHtml = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const html = draftToHtml(rawContentState);
    return html;
  };

  const StrToHTML = ({ htmlContent }:{htmlContent:string}) => {
    return (
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
  };

  const onSave = (blogTags: TagData[]) => {

    if (!blogData || !oldTitle) return;
    const updatedAt = format(new Date(), 'yyyy-MM-dd HH-mm-ss');
    const createdAt = format(blogData.createdAt!, 'yyyy-MM-dd HH-mm-ss');



    const newBlog:BlogData = {
      post_id: blogData.post_id,
      title:oldTitle,
      content: convertToHtml(),
      createdAt: createdAt,
      updatedAt: updatedAt,
    }
    updateData(linkComb(DB_BLOGS, `${blogData.post_id}`), newBlog);
    setOldTitle("");

    // Delete Tags
    deleteData(linkComb(DB_POST_TAGS, `${blogData.post_id}`));

    const allTags:TagPostData[] = []

    blogTags.forEach((tag) => allTags.push({tag_id:tag.tag_id, post_id:blogData.post_id})
    );

    // Tags
    uploadData(DB_POST_TAGS, allTags);

    editorState.clear;
  }


  return (
  <section style={{backgroundColor:'gray', padding:"16px"}}>
    <h1>{oldTitle}</h1>

    <div>
      <label className='nb'>Title:</label>
      <input 
        type="text" 
        onChange={(e)=>{setOldTitle(e.target.value)}}
        value={oldTitle}/>
    </div>

    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={setEditorState}
    />

    {
      blogData ? 
      <TagManager
        onSubmit={onSave}
        mode="Save"
        post_id={blogData.post_id}
      /> : "Loading..."
    }
   

    {/* <CButton
      innerText='Save'
      specialClass='green'
      onClick={onSave}
    /> */}

    <h2>Preview:</h2>
    <StrToHTML
      htmlContent={convertToHtml()}
    />
  </section>
  )
}

export default EditBlog;