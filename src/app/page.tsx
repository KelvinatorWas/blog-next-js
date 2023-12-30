import { DB_BLOGS } from '@/utils/ServerLinks';
import { HeadBlog } from './components/Blog/blog'
import styles from './page.module.css'

export type BlogData = {
  post_id: number;
  title:	string;
  content:	string;
  createdAt:	string | null;
  updatedAt:	string | null;
}

const getBlogData = async ():Promise<BlogData[]> => {
  try {
    const res = await fetch(DB_BLOGS);
    if (!res.ok) {
      throw new Error(`Failed to get data. Status: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


export default async function Home() {
  const blogs = await getBlogData();

  console.log(blogs)

  return (
    
    <main className={styles.main}>
      <h2 className={styles.recent_post}>Most Recent Post</h2>
      {blogs.map((blog) => 
        <HeadBlog 
          key={blog.post_id}
          data={blog}
        />
      )}
      
    </main>
    
  )
}
