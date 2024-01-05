import Link from "next/link";
import css from './style/Header.module.css'
import { Book, Home, Info } from "@mui/icons-material";

const Naviagtion = {
  class: css.link,
  navs: [
    {key:1, nav:"/", innerText:"Home", icon: Home},
    {key:2, nav:"/pages/blogs", innerText:"Blogs", icon: Book},
    {key:3, nav:"/pages/about", innerText:"About", icon: Info},
  ]
};

const Header = () => {
  return (
    <header className={css.header}>
      <nav className={css.test_nav}>
        {
          Naviagtion.navs.map(
            (nav) => 
            <Link key={nav.key} href={nav.nav} className={Naviagtion.class}>
              {nav.icon ? <nav.icon className={css.icon_style}/>: ""}
              {nav.innerText ? nav.innerText : ""}
            </Link>
          )
        }
      </nav>
    </header>
  );
};

export default Header;
