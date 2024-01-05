import Link from "next/link";

export type HrefType = string | {
  pathname:string,
  query:{
    [key:string]:string | number,
  }
};

export const LinkTo = ({link, className, innerText, as}: {innerText:string, link:string | HrefType, className:string, as?:string}) => {
  return (
    <Link 
      className={className}
      href={link}
      as={as?as:""}
    >{innerText}</Link>
  );
};
