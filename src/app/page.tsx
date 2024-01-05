import { DB_BLOGS } from '@/utils/ServerLinks';
import { HeadBlog } from './components/Blog/blog'
import styles from './page.module.css'
import { BlogData } from '@/utils/Types';

const getBlogData = async ():Promise<BlogData[]> => {
  try {
    const res = await fetch(DB_BLOGS);
    if (!res.ok) {
      throw new Error(`Failed to get data. Status: ${res.status}`);
    };
    
    return res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  };
};

export default async function Home() {
  const blogs = await getBlogData();

  return (
    <main className={styles.blog_container}>
      <h2 className={styles.recent_post}>Most Recent Post</h2>
      {
        blogs.map((blog) => 
          <HeadBlog 
            key={blog.post_id}
            data={blog}
          />
        )
      }
      
    </main>
    
  )
};
