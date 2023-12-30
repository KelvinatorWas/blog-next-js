import Link from "next/link";

export const LinkTo = ({link, className, innerText}: {innerText:string, link:string, className:string}) => {
  return (
    <Link 
      className={className}
      href={link}
    >{innerText}</Link>
  );
}