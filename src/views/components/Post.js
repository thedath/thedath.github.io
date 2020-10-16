import React from "react";
import usePost from "../../redux/hooks/usePost";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  colors,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  ArrowUpward as UpIcon,
  ArrowDownward as DownIcon,
} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
  },
  title: {
    fontWeight: "bold",
  },
  body: {
    fontWeight: "lighter",
  },
  movers: {
    marginLeft: "auto",
  },
  up: {
    color: colors.green[700],
  },
  down: {
    color: colors.red[700],
  },
}));

const Post = ({ index, id, title, body, userId, upVisible, downVisible }) => {
  const classes = useStyles();
  const { movePost } = usePost();
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {id}
          </Avatar>
        }
        title={
          <Typography
            variant="subtitle1"
            gutterBottom
            className={classes.title}
          >
            {title}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="subtitle2" gutterBottom className={classes.body}>
          {body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div className={classes.movers}>
          {upVisible && (
            <IconButton
              aria-label="move up"
              onClick={() => {
                movePost(index, "up");
              }}
            >
              <UpIcon className={classes.up} />
            </IconButton>
          )}
          {downVisible && (
            <IconButton
              aria-label="move down"
              onClick={() => {
                movePost(index, "down");
              }}
            >
              <DownIcon className={classes.down} />
            </IconButton>
          )}
        </div>
      </CardActions>
    </Card>
  );
};

export default Post;
