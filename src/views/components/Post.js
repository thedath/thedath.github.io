import React from "react";
import usePost from "../../redux/hooks/usePost";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  ArrowUpward as UpIcon,
  ArrowDownward as DownIcon,
} from "@material-ui/icons";

const useStyles = makeStyles({
  title: {
    fontWeight: "bold",
  },
  body: {
    fontWeight: "lighter",
  },
});

const Post = ({ index, id, title, body, userId, upVisible, downVisible }) => {
  const classes = useStyles();
  const { movePost } = usePost();
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{id}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography
            variant="subtitle1"
            gutterBottom
            className={classes.title}
          >
            {title}
          </Typography>
        }
        secondary={
          <Typography variant="subtitle2" gutterBottom className={classes.body}>
            {body}
          </Typography>
        }
      />
      <ListItemSecondaryAction>
        {upVisible && (
          <IconButton
            edge="end"
            aria-label="up"
            onClick={() => {
              movePost(index, "up");
            }}
          >
            <UpIcon />
          </IconButton>
        )}
        {downVisible && (
          <IconButton
            edge="end"
            aria-label="down"
            onClick={() => {
              movePost(index, "down");
            }}
          >
            <DownIcon />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Post;
