import { linkComb, DB_POST_TAGS } from "@/utils/ServerLinks";
import { AllTagData } from "@/utils/Types";
import { getData } from "@/utils/crud";

const TagHook = async (post_id: number) => {
  const tags = await getData<AllTagData[]>(linkComb(DB_POST_TAGS, `${post_id}`));

  return {
    tags,
  };
};

export default TagHook
