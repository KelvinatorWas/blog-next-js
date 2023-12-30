import { classComb } from "@/utils/ClassComb";
import { LinkTo } from "../components/LinkTo";

export default function AdminPanel() {

  return (
  <section
  className={classComb("cfx cn")}
  >
    <h1>Hello, Admin C:</h1>
    <LinkTo
      link="$a/CreateBlog"
      innerText="Create New Blog"
      className={classComb("sz16", "no_dec", "nb")}
    />
    <LinkTo
      link="$a/Blogs"
      innerText="All Blogs"
      className={classComb("sz16", "no_dec", "nb")}
    />
  </section>
  );
}