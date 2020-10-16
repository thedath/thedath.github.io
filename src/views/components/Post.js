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
import PropTypes from 'prop-types';

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
  avatar: {
    backgroundColor: colors.purple[400]
  }
}));

/**
 * Single post element
 * 
 * @param {number} index Index of this post in post array 
 * @param {number} id ID of the post
 * @param {string} title Title of the post
 * @param {string} body Body (description) of the post
 * @param {number} userId ID of the user of this post
 * @param {boolean} upVisible Pass 'true' if Up arrow needs to be visible
 * @param {boolean} downVisible Pass 'true' if Down arrow needs to be visible
 */
const Post = ({ index, id, title, body, userId, upVisible, downVisible }) => {
  const classes = useStyles();
  // importing the movePost function from isePost hook
  const { movePost } = usePost();
  return (
    <Card className={classes.root} elevation={2}>
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

// prop validation
Post.propTypes = {
  index: PropTypes.number.isRequired, 
  id: PropTypes.number.isRequired, 
  title: PropTypes.string.isRequired, 
  body: PropTypes.string.isRequired, 
  userId: PropTypes.number, 
  upVisible: PropTypes.bool.isRequired,
  downVisible: PropTypes.bool.isRequired,
}

export default Post;
