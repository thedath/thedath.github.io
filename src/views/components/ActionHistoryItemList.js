import {
  Card,
  CardContent,
  CardHeader,
  colors,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import usePost from "../../redux/hooks/usePost";
import ActionHistoryItem, { isValidHistoryItem } from "./ActionHistoryItem";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  heading: {
    margin: theme.spacing(2),
  },
  cardContent: {
    backgroundColor: colors.grey[100],
  },
  historyContainer: {
    paddingTop: theme.spacing(2),
  },
}));

/**
 * Component to show post action history list
 */
const ActionHistoryItemList = () => {
  const classes = useStyles();
  // referencing the post history list state
  const { postHistory } = usePost();
  // function for populating list of history items
  const renderHistoryItemList = () =>
    postHistory.map((history, index) => {
      if (isValidHistoryItem(history)) {
        return (
          <ActionHistoryItem
            key={`history-key-${index}`}
            index={index}
            {...history}
          />
        );
      } else {
        return null;
      }
    });
  return (
    <Card className={classes.root} elevation={5}>
      <CardHeader title="List of action commited" />
      <Divider />
      <CardContent className={classes.cardContent}>
        {/* Info text when there is not history to show */}
        {postHistory.length === 0 && (
          <Typography variant="subtitle1">
            Move some post to generate action history . . .
          </Typography>
        )}
        <div className={classes.historyContainer}>
          {renderHistoryItemList()}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionHistoryItemList;
