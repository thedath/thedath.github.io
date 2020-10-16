import React, { useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import PostList from "../components/PostList";
import ActionHistoryItemList from "../components/ActionHistoryItemList";
import usePost from "../../redux/hooks/usePost";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#3949AB',
    backgroundColor: 'white',
  },
}));

const Main = () => {
  const classes = useStyles();
  const { postProcessing, postErrorMessage, fetchPosts } = usePost();

  useEffect(() => {
    fetchPosts(5);
  }, [fetchPosts]);

  return postProcessing ? (
    <Backdrop open={true} className={classes.backdrop}>
      <CircularProgress />
    </Backdrop>
  ) : postErrorMessage !== "" ? (
    postErrorMessage
  ) : (
    <div
      style={{
        background:
          "linear-gradient(172deg, #3949AB 0%, #3949AB 15%, #EEEEEE 15%, #EEEEEE 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={7} xl={8}>
            {/* Where posts going to be */}
            <PostList />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={5} xl={4}>
            {/* Where history items going to be */}
            <ActionHistoryItemList />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Main;
