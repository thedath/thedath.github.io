import React from "react";
import usePost from "../../redux/hooks/usePost";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  colors,
  makeStyles,
  Typography,
} from "@material-ui/core";
import moment from 'moment';

const useStyles = makeStyles(theme => ({
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
    marginLeft: "auto",
    backgroundColor: colors.green[400],
    color: "white",
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
}));

const ActionHistoryItem = ({ index, title, date, fromIndex, toIndex }) => {
  const classes = useStyles();
  const { travelThroughTime } = usePost();
  return (
    <Card className={classes.root} elevation={3}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="caption" gutterBottom>
          {moment().diff(moment(date), 'seconds')} seconds ago
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          className={classes.timeTravelButton}
          onClick={() => {
            travelThroughTime(index);
          }}
        >
          Time Travel
        </Button>
      </CardActions>
    </Card>
  );
};

export default ActionHistoryItem;
