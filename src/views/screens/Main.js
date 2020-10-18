import React, { useEffect } from "react";
import { Box, colors, Container, Grid, Typography } from "@material-ui/core";
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
  error: {
    color: colors.red[400],
    marginTop: theme.spacing(10),
  }
}));

const Main = () => {
  const classes = useStyles();
  const { postProcessing, postErrorMessage, fetchPosts } = usePost();

  // initiating post fecth
  useEffect(() => {
    // requesting the exact amount of post needed
    fetchPosts(5);
  }, [fetchPosts]);

  return postProcessing ? (
    // showing a backdrop untill posts getting fetched
    <Backdrop open={true} className={classes.backdrop}>
      <CircularProgress />
    </Backdrop>
  ) : postErrorMessage !== "" ? (
    // showing the error from post request over network
    <Container maxWidth="lg">
      <Box display="flex" flexDirection="" justifyContent="center">
        <Typography variant="h5" className={classes.error}>Error: {postErrorMessage}</Typography>
      </Box>
    </Container>
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
