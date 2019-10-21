import React from "react";
import PostPresenter from "./PostPresenter";

const PostContainer = ({
  id,
  user,
  title,
  file,
  likeCount,
  isLiked,
  createdAt
}) => {
  return (
    <PostPresenter
      id={id}
      user={user}
      title={title}
      file={file}
      likeCount={likeCount}
      createdAt={createdAt}
    />
  );
};

export default PostContainer;
