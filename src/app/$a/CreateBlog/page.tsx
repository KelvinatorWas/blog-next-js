"use client";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from "draftjs-to-html";
import { BlogData } from "@/app/page";
import { uploadData } from "@/utils/crud";
import { DB_BLOGS, DB_POST_TAGS } from "@/utils/ServerLinks";
import { format } from "date-fns";
import css from "./createBlog.module.css";
import { TagData, TagPostData } from "@/utils/Types";
import TagManager from "../../components/TagManager/TagManager";
import { randInt } from "@/utils/utils";
import MyEditor from "@/app/components/Editor/Editor";

export default function AdminPanel() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [title, setTitle] = useState("");

  const onEditorChange = (editorState:EditorState) => {
    
    setEditorState(editorState);
  }

  const convertToHtml = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const html = draftToHtml(rawContentState);
    return html;
  };

  const StrToHTML = ({ htmlContent }: { htmlContent: string }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  };

  const onSubmit = (blogTags:TagData[]) => {
    const date = format(new Date(), "yyyy-MM-dd HH-mm-ss");

    const newBlog: BlogData = {
      post_id: randInt(),
      title: title,
      content: convertToHtml(),
      createdAt: date,
      updatedAt: null,
    };

    const allTags:TagPostData[] = []

    blogTags.forEach((tag) => allTags.push({tag_id:tag.tag_id, post_id:newBlog.post_id})
    );

    //blog
    uploadData(DB_BLOGS, newBlog);
    setTitle("");

    // Tags
    uploadData(DB_POST_TAGS, allTags);

    editorState.clear;
  };


  return (
    <>
    <h1>New Blog</h1>

    <section className={css.create_container}>
      <div className={css.input_container}>
        <label className={css.title}>Title</label>
        <input
          placeholder="Title..."
          className={css.input}
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          />
      </div>
        
      <div className="wrapper-class-name">
        <MyEditor/>
      </div>

      <Editor

        editorState={editorState}
        onEditorStateChange={onEditorChange}
      />
      

      <TagManager
        onSubmit={onSubmit}
      />

      <div className={css.create_container}>
        <h2>Preview</h2>
        <div className={css.preview_container}>
          <StrToHTML htmlContent={convertToHtml()} />
        </div>
      </div>
    </section>
    </>
  );
}
