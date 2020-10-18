import React, { useEffect, useRef, useState } from "react";
import usePost from "../../redux/hooks/usePost";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  colors,
  Fade,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  ArrowUpward as UpIcon,
  ArrowDownward as DownIcon,
} from "@material-ui/icons";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: colors.purple[400],
  },
}));

// checks whether postObj is a valid post object
export const isValidPost = (ostObj, strict = false) => {
  return (
    ostObj.id !== undefined &&
    typeof ostObj.id === "number" &&
    ostObj.userId !== undefined &&
    typeof ostObj.userId === "number" &&
    ostObj.title !== undefined &&
    typeof ostObj.title === "string" &&
    ostObj.title !== "" &&
    ostObj.body !== undefined &&
    typeof ostObj.body === "string" &&
    ostObj.body !== "" &&
    (!strict ||
      (strict &&
        ostObj.index !== undefined &&
        typeof ostObj.index === "number" &&
        ostObj.upVisible !== undefined &&
        typeof ostObj.upVisible === "boolean" &&
        ostObj.downVisible !== undefined &&
        typeof ostObj.downVisible === "boolean"))
  );
};

// adding scroll to element feature
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop + 20);

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
  // state for animation
  const [animate, setAnimate] = useState(true);
  // on every rendering perform enter animation
  useEffect(() => {
    setAnimate(true);
    return () => {
      setAnimate(false);
    }
  }, [index]);
  const refForScroll = useRef(null)
  const executeScroll = () => scrollToRef(refForScroll)

  // check for validity of the post, if invalid nothing gets rendered
  if (
    !isValidPost(
      { index, id, title, body, userId, upVisible, downVisible },
      true
    )
  ) {
    return null;
  }
  // move post handler function
  const handleMove = (action) => {
    movePost(index, action);
    setAnimate(false);
    executeScroll();
  };
  return (
    <Fade
      in={animate}
      timeout={{
        appear: 200,
        enter: 1000,
        exit: 300,
      }}
    >
      <Card
        data-testid={`post-${id}`}
        aria-label="post"
        className={classes.root}
        elevation={2}
        ref={refForScroll}
      >
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {id}
            </Avatar>
          }
          title={
            <Typography
              data-testid={`post-title-${id}`}
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
                data-testid={`post-button-move-up-${id}`}
                aria-label="move up"
                onClick={() => handleMove("up")}
              >
                <UpIcon className={classes.up} />
              </IconButton>
            )}
            {downVisible && (
              <IconButton
                data-testid={`post-button-move-down-${id}`}
                aria-label="move down"
                onClick={() => handleMove("down")}
              >
                <DownIcon className={classes.down} />
              </IconButton>
            )}
          </div>
        </CardActions>
      </Card>
    </Fade>
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
};

export default Post;
