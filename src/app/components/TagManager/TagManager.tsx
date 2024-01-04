'use client'
import { CButton } from "@/app/components/CButton/CButton";
import { classComb } from "@/utils/ClassComb";
import { DB_POST_TAGS, DB_TAGS, linkComb } from "@/utils/ServerLinks";
import { AllTagData, TagData, TagPostData } from "@/utils/Types";
import { getData } from "@/utils/crud";
import { ChangeEvent, useEffect, useState } from "react";
import css from './TagManager.module.css'

type ModeType = "Save" | "Submit";

type TagManagerProp = {
  onSubmit: (blogTags:TagData[]) => void
  mode?: ModeType
  post_id?: number;
}

const TagManagerHook = (mode:ModeType, post_id:number|undefined=undefined) => {
  const [tags, setTags] = useState<TagData[]>([]);
  const [blogTags, setBlogTags] = useState<TagData[]>([]);
  const [currTag, setCurrTag] = useState<TagData>({name:"", tag_id:-1});


  const addBlogTag = () => {
    if (!currTag.name) return;

    if (blogTags.includes(currTag)) return;

    setBlogTags(
      [...blogTags, currTag]
    );
    setCurrTag({...currTag, name:""})
  };

  const onChangeTag = (e:ChangeEvent<HTMLSelectElement>) => {
    const id = +e.target.value;

    setCurrTag(tags[id]);
  };

  const onClickTag = (index:number) => {

    const post_tags = blogTags.filter((_, id) => id !== index); 
    setBlogTags(post_tags);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getAllTags = await getData<TagData[]>(linkComb(DB_TAGS));
        setTags(getAllTags);
        
        if (mode === "Save" && post_id) {
          const currTags = await getData<AllTagData[]>(linkComb(DB_POST_TAGS, `${post_id}`));
          setBlogTags(currTags);
  
        }
  
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchData();
  }, [post_id, mode]);

  return {
    addBlogTag,
    onChangeTag,
    onClickTag,
    tags,
    blogTags,
  };

}

const TagManager = ({onSubmit, mode, post_id}:TagManagerProp) => {
  
  const stateMode = mode ? mode : "Submit";
  const statePostID = post_id ? post_id : undefined;

  const {
    addBlogTag,
    onChangeTag,
    onClickTag,
    tags,
    blogTags,
  } = TagManagerHook(stateMode, statePostID);

  return (
    <>
    <div className={classComb("cfx", "cm")}>
      <CButton innerText={stateMode} onClick={ () => onSubmit(blogTags) } specialClass="green" />

      <div
        className={classComb(css.tag_pad)}
        style={{ justifyContent: "flex-end" }}>
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
  </>
  );
}

export default TagManager;
