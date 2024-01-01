type TagData = {
  name: string;
  tag_id: number;
};

type TagPostData = {
  post_id: number;
  tag_id: number;
};

export type {
  TagData,
  TagPostData
}