'use client'
import { useEffect, useState } from "react";
import { BlogData } from "@/app/page";
import { DB_BLOGS, linkComb } from "@/utils/ServerLinks";
import { deleteData, getData } from "@/utils/crud";
import { classComb } from "@/utils/ClassComb";
import { BlogContainer } from "./BlogContainer/BlogContainer";
import { LinkTo } from "@/app/components/LinkTo";
import { redirect, useRouter } from "next/navigation";
import css from './blogs.module.css'

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
    console.log("REDERECT")
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
