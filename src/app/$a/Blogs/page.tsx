'use client'
import { useEffect, useState } from "react";
import { DB_BLOGS, linkComb } from "@/utils/ServerLinks";
import { deleteData, getData } from "@/utils/Crud";
import { BlogContainer } from "./BlogContainer/BlogContainer";
import { useRouter } from "next/navigation";
import css from './blogs.module.css'
import { BlogData } from "@/utils/Types";

const AllBlogs = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  
  const fetchData = async () => {
    try {
      const blogData = await getData<BlogData[]>(DB_BLOGS);
      setBlogs(blogData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDelete = async (id: number) => {
    try {
      await deleteData(DB_BLOGS + `/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const onEdit = (name:string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    router.push(linkComb("/$a/EditBlog", name));
  };

  return (
    <>
    <h1>All Blogs</h1>
    
    <section className={css.create_container}>
      {blogs.map((blog) => (
        <BlogContainer key={blog.post_id} blogData={blog} onDelete={onDelete} onEdit={onEdit} />
        ))}
    </section>
    </>
  );
};

export default AllBlogs;
