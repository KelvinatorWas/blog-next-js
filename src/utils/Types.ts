type TagData = {
  name: string;
  tag_id: number;
};

type TagPostData = {
  post_id: number;
  tag_id: number;
};

type AllTagData = {
  post_tag_id:number;
  post_id: number;
  tag_id: number;
  name: string;
};

export type {
  TagData,
  TagPostData,
  AllTagData
}