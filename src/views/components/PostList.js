import React from "react";
import usePost from "../../redux/hooks/usePost";
import { makeStyles, Typography } from "@material-ui/core";
import Post, { isValidPost } from "../components/Post";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  heading: {
    margin: theme.spacing(2),
    color: "white",
  },
}));

/**
 * Component to showing basic list of posts
 */
const PostList = () => {
  const classes = useStyles();
  // referencing the post list state
  const { postList } = usePost();
  // function for populating list of posts
  const renderPostList = () =>
    postList.map((post, index) => {
      // checks index, id, title, body, userId
      // exists in the object otherwise no UI will be returned
      if (isValidPost(post)) {
        return (
          <Post
            key={`post-key-${post.id}`}
            index={index}
            {...post}
            upVisible={index !== 0}
            downVisible={index + 1 < postList.length}
          />
        );
      } else {
        return null;
      }
    });

  return (
    <div className={classes.root}>
      <Typography className={classes.heading} variant="h4">
        Sortable Post List
      </Typography>
      {renderPostList()}
    </div>
  );
};

export default PostList;
