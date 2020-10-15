import React, { useEffect } from 'react'
import { Container, Grid } from '@material-ui/core'
import PostList from '../components/PostList'
import ActionHistoryItemList from '../components/ActionHistoryItemList'
import usePost from '../../redux/hooks/usePost'

const Main = () => {
  // using the state of post and its' actions
  const {
    postProcessing,
    postErrorMessage,
    fetchPosts,
  } = usePost();

  // fetching posts on initial load
  useEffect(() => {
    fetchPosts(5);
  }, [fetchPosts])

  return <Container maxWidth="lg">
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
}

export default Main
