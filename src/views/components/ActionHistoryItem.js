import React from "react";
import usePost from "../../redux/hooks/usePost";
import {
  Box,
  Button,
  Card,
  CardContent,
  colors,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  timeTravelButton: {
    backgroundColor: colors.green[400],
    color: "white",
  },
}));

// checks whether historyItemObj is a valid post object
export const isValidHistoryItem = (historyItemObj, strict = false) => {
  return (
    historyItemObj.movedPostId !== undefined &&
    typeof historyItemObj.movedPostId === "number" &&
    historyItemObj.date !== undefined &&
    typeof historyItemObj.date === "number" &&
    historyItemObj.fromIndex !== undefined &&
    typeof historyItemObj.fromIndex === "number" &&
    historyItemObj.toIndex !== undefined &&
    typeof historyItemObj.toIndex === "number" && 
    (
      !strict || 
      (
        historyItemObj.index !== undefined &&
        typeof historyItemObj.index === "number"
      )
    )
  );
};

/**
 * Single post action history element
 *
 * @param {number} index Index of this post action history in post array
 * @param {string} title Title of the post action history
 * @param {number} date Date in milliseconds
 * @param {number} fromIndex Index of the post in post array, before this action happened
 * @param {number} toIndex Index of the post in post array, after this action happened
 */
const ActionHistoryItem = ({
  index,
  movedPostId,
  date,
  fromIndex,
  toIndex,
}) => {
  const classes = useStyles();
  const { travelThroughTime } = usePost();
  // history item does not get rendered if it is not a valid history item
  if (
    !isValidHistoryItem({ index, movedPostId, date, fromIndex, toIndex }, true)
  ) {
    return null;
  }
  // call back function for button on click
  const onClick = () => {
    travelThroughTime(index);
  };
  // get time passed in seconds
  const getSecondsAgoLabel = () =>
    `${moment().diff(moment(date), "seconds")} seconds ago`;
  return (
    <Card 
      data-testid={`action-history-item-${index}`}
      data-moved-post-id={`moved-post-id-${movedPostId}`}
      aria-label="action-history-item"
      className={classes.root} 
      elevation={2}
    >
      <CardContent>
        <Grid container>
          <Grid item xs>
            <Box height={70}>
              <Typography variant="subtitle1" gutterBottom>
                {`Moved post ${movedPostId} from ${fromIndex} index to ${toIndex} index`}
              </Typography>
              <Typography variant="caption" gutterBottom>
                {getSecondsAgoLabel()}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              display="flex"
              flexDirection="row-reverse"
              alignItems="flex-end"
              height={70}
            >
              <Box>
                <Button
                  data-testid={`history-item-time-travel-button-${index}`}
                  aria-label="time travel"
                  size="small"
                  variant="contained"
                  className={classes.timeTravelButton}
                  onClick={onClick}
                >
                  Time Travel
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

// prop validation
ActionHistoryItem.propTypes = {
  index: PropTypes.number.isRequired,
  movedPostId: PropTypes.number.isRequired,
  date: PropTypes.number.isRequired,
  fromIndex: PropTypes.number.isRequired,
  toIndex: PropTypes.number.isRequired,
};

export default ActionHistoryItem;
