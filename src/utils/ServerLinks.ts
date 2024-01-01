const BASE_DB_LINK = 'http://localhost:3001';
const DB_BLOGS = BASE_DB_LINK + "/blogs";
const DB_IMAGES = BASE_DB_LINK + "/images";
const DB_TAGS = BASE_DB_LINK + "/tags";
const DB_POST_TAGS = BASE_DB_LINK + "/post_tags";


const linkComb = (...links:string[]):string => links.join("/");

export {
  BASE_DB_LINK,
  DB_BLOGS,
  DB_IMAGES,
  DB_TAGS,
  DB_POST_TAGS,
  linkComb
};
