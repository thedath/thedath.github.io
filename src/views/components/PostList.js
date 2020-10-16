import React from "react";
import usePost from "../../redux/hooks/usePost";
import { makeStyles, Typography } from "@material-ui/core";
import Post from "../components/Post";

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
  return (
    <div className={classes.root}>
      <Typography className={classes.heading} variant="h4">
        Sortable Post List
      </Typography>
        {postList.map((post, index) => (
          <Post
            key={`post-key-${post.id}`}
            index={index}
            {...post}
            upVisible={index !== 0}
            downVisible={index + 1 < postList.length}
          />
        ))}
    </div>
  );
};

export default PostList;
