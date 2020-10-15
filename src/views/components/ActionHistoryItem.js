import React from "react";
import usePost from "../../redux/hooks/usePost";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
});

const ActionHistoryItem = ({ index, title, date, fromIndex, toIndex }) => {
  const classes = useStyles();
  const { travelThroughTime } = usePost();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="caption" gutterBottom>
          {date}
        </Typography>
        {fromIndex} {toIndex}
      </CardContent>
      <CardActions>
        <Button
          size="small"
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
