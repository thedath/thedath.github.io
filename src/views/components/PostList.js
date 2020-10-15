import React from "react";
import usePost from "../../redux/hooks/usePost";
import { List } from "@material-ui/core";
import Post from "../components/Post";

const PostList = () => {
  const { postList } = usePost();
  return (
    <List>
      {postList.map((post, index) => (
        <Post
          key={`post-key-${post.id}`}
          index={index}
          {...post}
          upVisible={index !== 0}
          downVisible={index + 1 < postList.length}
        />
      ))}
    </List>
  );
};

export default PostList;
