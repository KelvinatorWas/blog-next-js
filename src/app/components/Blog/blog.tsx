'use client'
import css from './blog.module.css'
import { BlogData } from '@/app/page'
import { classComb, textLimit } from '@/utils/ClassComb'
import { DB_IMAGES } from '@/utils/ServerLinks'
import Link from 'next/link'
import { LinkTo } from '../LinkTo'
import TagHook from '../FullBlog/hook/TagHook'
import { useEffect, useState } from 'react'
import { TagData } from '@/utils/Types'

type HeadBlogProp = {
  data: BlogData
};

const BlogLink = ({ blogName, className }: {blogName:string, className:string}) => {
  const cleanName = blogName.replace(/\s/gm, "_");

  return (
    <Link className={className}href="/blogs/[blog]" as={`/pages/blogs/${cleanName}`}>{blogName}</Link>
  );
};

export const  HeadBlog =  ({ data }:HeadBlogProp) => {
  const [tags, setTags] = useState<TagData[]>([])
  
  useEffect(() => {
    const fetchTags = async () => {
      const {tags} = await TagHook(data.post_id);
      setTags(tags);
    };

    fetchTags();
  }, [data]);
  
  return (
    <section className={css.blog_container}>
    <div className={css.image} style={ { backgroundImage:`url(${DB_IMAGES}/sunset)`, backgroundSize:'100%' } }></div>
      <div className={(css.info)}>
        <BlogLink
          className={classComb(css.title, "no_dec", "nb", "mv-right")}
          blogName={data.title}
        />
        
        <p className={css.content}>{textLimit(data.content)}</p>
        
        <div className={css.tags}>
          {
            tags.map((tag) => 
              <div className={css.tag_container} key={tag.name}>
                <LinkTo
                  innerText={`#${tag.name}`}
                  link={{
                    pathname:"/pages/blogs",
                    query: {
                      "id":`${tag.tag_id}`,
                      "tag":`${tag.name}`
                    }
                  }}
                  className="mv-right"
                />
              </div>
              )
            }
        </div>

      </div>

    </section>
  )
};
