import css from './blog.module.css'
import { BlogData } from '@/app/page'
import { classComb, textLimit } from '@/utils/ClassComb'
import { DB_IMAGES } from '@/utils/ServerLinks'
import Link from 'next/link'

type HeadBlogProp = {
  data: BlogData
}

const BlogLink = ({ blogName, className }: {blogName:string, className:string}) => {

  const cleanName = blogName.replace(/\s/gm, "_");

  return (
    <Link className={className}href="/blogs/[blog]" as={`pages/blogs/${cleanName}`}>{blogName}</Link>
  );
};

export const HeadBlog = ({data}:HeadBlogProp) => {
  
  return (
    
    <div className={css.image} style={{backgroundImage:`url(${DB_IMAGES}/sunset)`}}>
      <div className={css.info}>
        <BlogLink
          className={classComb(css.title, "no_dec", "nb")}
          blogName={data.title}
        />
        <p className={css.content}>{textLimit(data.content)}</p>
      </div>
    </div>
  )
}