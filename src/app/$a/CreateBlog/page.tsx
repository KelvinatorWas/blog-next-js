"use client";
import { EditorState, convertToRaw } from "draft-js";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { BlogData } from "@/app/page";
import { getData, uploadData } from "@/utils/crud";
import { DB_BLOGS, DB_POST_TAGS, DB_TAGS, linkComb } from "@/utils/ServerLinks";
import { format } from "date-fns";
import { CButton } from "@/app/components/CButton/CButton";
import { classComb } from "@/utils/ClassComb";
import css from "./createBlog.module.css";
import { randomUUID } from "crypto";
import { TagData, TagPostData } from "@/utils/Types";

const randInt = (): number => {
  const randomNumber = Math.floor(Math.random() * 100001);
  return randomNumber;
}

export default function AdminPanel() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<TagData[]>([]);
  const [blogTags, setBlogTags] = useState<TagData[]>([]);
  const [currTag, setCurrTag] = useState<TagData>({name:"", tag_id:-1});

  const fetchData = async () => {
    try {
      const getAllTags = await getData<TagData[]>(linkComb(DB_TAGS));
      setTags(getAllTags);
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

  const StrToHTML = ({ htmlContent }: { htmlContent: string }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  };

  const onSubmit = () => {
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

  const addBlogTag = () => {
    if (!currTag.name) return;

    if (blogTags.includes(currTag)) return;

    setBlogTags(
      [...blogTags, currTag]
    );
    setCurrTag({...currTag, name:""})
  }

  const onChangeTag = (e:ChangeEvent<HTMLSelectElement>) => {
    const id = +e.target.value;

    setCurrTag(tags[id]);
  }

  const onClickTag = (index:number) => {
    console.log(index)
    const post_tags = blogTags.filter((_, id) => id !== index); 
    setBlogTags(post_tags);
  }

  return (
    <section style={{ backgroundColor: "gray", padding: "16px" }}>
      <h1>Hello, Admin C:</h1>

      <div>
        <label className="nb">Title:</label>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
      </div>

      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={setEditorState}
      />

      <div className={classComb("cfx", "cm")}>
        <CButton innerText="Submit" onClick={onSubmit} specialClass="green" />

        <div
          className={classComb(css.tag_pad)}
          style={{ justifyContent: "flex-end" }}
        >
          <select name="Tags" id="tags" onChange={onChangeTag}>
            {tags.map((tag, index) => (
              <option key={tag.tag_id} value={index}>
                {tag.name}
              </option>
            ))}
          </select>

          <CButton innerText="Add Tag" specialClass="yellow" onClick={addBlogTag} />
        </div>
      </div>
      
      <div className={css.blog_tags}>
        {
        blogTags.map((tag, index) =>
          <CButton key={tag.tag_id}
            innerText={tag.name}
            specialClass="white"
            onClick={() => {
                onClickTag(index);
              }
            }
          /> 
        )
        }
      </div>

      <h2>Preview:</h2>
      <StrToHTML htmlContent={convertToHtml()} />
    </section>
  );
}
