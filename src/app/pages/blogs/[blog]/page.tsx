import FullBlog from "@/app/components/FullBlog/FullBlog";

const Blog = ({params}: {params:{blog:string}}) => <FullBlog name={params.blog}/>

export default Blog;
