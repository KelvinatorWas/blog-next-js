import { classComb } from "@/utils/ClassComb";
import { LinkTo } from "../components/LinkTo";
import { GetSessionParams, getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

interface User {
  role:string;
  name:string;
}
 
const AdminPanel = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('http://localhost:3000/api/auth/signin?callbackUrl=/$a');
  }

  return (
    <section className={classComb("cfx cn")}>
      <h1>Admin Panel</h1>

      <LinkTo
        link="$a/CreateBlog"
        innerText="Create New Blog"
        className={classComb("sz16", "no_dec", "nb", "wfit", "mv-right")}
      />

      <LinkTo
        link="$a/Blogs"
        innerText="All Blogs"
        className={classComb("sz16", "no_dec", "nb", "wfit", "mv-right")}
      />
      
      <LinkTo
        link="$a/Comments"
        innerText="All Comments"
        className={classComb("sz16", "no_dec", "nb", "wfit", "mv-right")}
      />
    </section>
  );
}

export default AdminPanel;

export const ServerSide = async (context:GetSessionParams | undefined) => {
  const session = await getSession(context);

  return {
    props: {
      user: session?.user || null,
    },
  };
};
