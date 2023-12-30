'use client'
import { EditorState, convertToRaw } from 'draft-js';
import { MouseEventHandler, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import { BlogData } from '@/app/page';
import { uploadData } from '@/utils/crud';
import { DB_BLOGS } from '@/utils/ServerLinks';
import { format } from 'date-fns';

export default function AdminPanel() {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  const [title, setTitle] = useState("");

  const convertToHtml = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const html = draftToHtml(rawContentState);
    return html;
  };

  const onSubmit = () => {

    const date = format(new Date(), 'yyyy-MM-dd HH-mm-ss');

    const newBlog:BlogData = {
      post_id: -1,
      title:title,
      content: convertToHtml(),
      createdAt: date,
      updatedAt:null,
    }
    uploadData(DB_BLOGS, newBlog);

    setTitle("");

    editorState.clear;
  }

  return (
  <section style={{backgroundColor:'gray', padding:"16px"}}>
    <h1>Hello, Admin C:</h1>

    <div>
      <label className='nb'>Title:</label>
      <input 
        type="text" 
        onChange={(e)=>{setTitle(e.target.value)}}
        value={title}/>
    </div>

    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={setEditorState}
    />
    <button onClick={onSubmit}>Submit</button>
  </section>
  
  );
}