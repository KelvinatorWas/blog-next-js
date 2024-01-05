'use client'

import { getData } from '@/utils/Crud';
import css from './Blogs.module.css'
import { DB_BLOGS, linkComb } from '@/utils/ServerLinks';
import { HeadBlog } from '@/app/components/Blog/blog';
import { useEffect, useState } from 'react';
import { BlogData } from '@/utils/Types';

export default function  Blogs({searchParams}: {searchParams:{id:string, tag:string}}) {
  const [blogs, setBlogs] = useState<BlogData[]>([]);

  useEffect(() => {
    const {id, tag} = searchParams;
    const fetchblogs = async() => {

      if (!id && !tag) {
        const blogs = await getData<BlogData[]>(DB_BLOGS);
        setBlogs(blogs);
      } else {
        const blogsByTag = await getData<BlogData[]>(linkComb(DB_BLOGS, "tag", id));
        setBlogs(blogsByTag);
      }

    }
    fetchblogs();

  }, [searchParams]);

  return (
    <section className={css.blog_container}>
      <h1>Hello, Blogs</h1>
      <div className={css.filter_container}></div>

      {
        blogs.map((blog) => 
          <HeadBlog 
            key={blog.post_id}
            data={blog}
          />
        )
      }

    </section>
  );
}