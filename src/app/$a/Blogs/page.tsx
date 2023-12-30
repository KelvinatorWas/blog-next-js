import { BlogData } from "@/app/page";
import { DB_BLOGS } from "@/utils/ServerLinks";
import { getData } from "@/utils/crud";
import css from './blogs.module.css'
import { classComb } from "@/utils/ClassComb";
import { CButton } from "@/app/components/CButton/CButton";

type BlogContainerProp = {
  blogData:BlogData
}

const BlogContainer = ({blogData}:BlogContainerProp) => {
  const {title, post_id} = blogData
  return (
    <div className={classComb(css.blog_container, "nb")}>
      {title}
      <div className={classComb("cfx", css.btn_container)}>
        <CButton
          innerText="Edit"
          specialClass="green"
          />
        <CButton
          innerText="Delete"
          specialClass="red"
          />
      </div>
    </div>
  );
};

const AllBlogs = async () => {
  const blogs = await getData<BlogData[]>(DB_BLOGS);



  return (
    <section 
      className={classComb("cfx cn")}
    >
      <h1>All blogs</h1>
      {blogs.map((blog) => 
      <BlogContainer
        key={blog.post_id}
        blogData={blog}
      />
      )}
    </section>
  );
};

export default AllBlogs;