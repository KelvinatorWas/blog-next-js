import FullBlog from "@/app/components/FullBlog/FullBlog";

const Blog = ({params}: {params:{blog:string}}) => {
  return <FullBlog name={params.blog}/>
}

export default Blog;