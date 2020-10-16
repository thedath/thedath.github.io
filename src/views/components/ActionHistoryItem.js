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
import PropTypes from 'prop-types';

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

/**
 * Single post action history element
 * 
 * @param {number} index Index of this post action history in post array 
 * @param {string} title Title of the post action history
 * @param {number} date Date in milliseconds
 * @param {number} fromIndex Index of the post in post array, before this action happened
 * @param {number} toIndex Index of the post in post array, after this action happened
 */
const ActionHistoryItem = ({ index, title, date, fromIndex, toIndex }) => {
  const classes = useStyles();
  const { travelThroughTime } = usePost();
  return (
    <Card className={classes.root} elevation={2}>
      <CardContent>
        <Grid container>
          <Grid item xs>
            <Box height={70}>
              <Typography variant="subtitle1" gutterBottom>
                {title}
              </Typography>
              <Typography variant="caption" gutterBottom>
                {moment().diff(moment(date), "seconds")} seconds ago
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
                  size="small"
                  variant="contained"
                  className={classes.timeTravelButton}
                  onClick={() => {
                    travelThroughTime(index);
                  }}
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
  id: PropTypes.number.isRequired, 
  date: PropTypes.number.isRequired, 
  fromIndex: PropTypes.number, 
  toIndex: PropTypes.number, 
}

export default ActionHistoryItem;
