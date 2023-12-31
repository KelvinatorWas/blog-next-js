'use client'
import { CButton } from "@/app/components/CButton/CButton";
import css from '../blogs.module.css'
import { BlogData } from "@/app/page";
import { classComb } from "@/utils/ClassComb";


type BlogContainerProp = {
  blogData:BlogData
  onDelete: (id:number) => void,
  onEdit: (name:string) => void
}

export const BlogContainer = ({blogData, onDelete, onEdit}:BlogContainerProp) => {
  const {title, post_id} = blogData;

  return (
    <div className={classComb(css.blog_container, "nb")}>
      {title}
      <div className={classComb("cfx", css.btn_container)}>
        <CButton
          innerText="Edit"
          specialClass="green"
          onClick={() => onEdit(title)}
          />
        <CButton
          innerText="Delete"
          specialClass="red"
          onClick={() => onDelete(post_id)}
          />
      </div>
    </div>
  );
};