import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as PostActions from '../actions/postActions';

const usePost = () => {
  const dispatch = useDispatch();

  const { list, history, errorMessage, processing } = useSelector(state => state.post);
  
  /**
   * Fetch array of posts from server
   * 
   * @param {number} limit 
   * Number of posts needs to be included in the post list response. Default is 10. 
   */
  const fetchPosts = useCallback(async(limit) => {
    return await dispatch(PostActions.fetchPosts(limit));
  }, [dispatch]);

  const movePost = useCallback(async(index, action) => {
    return await dispatch(PostActions.movePost(index, action));
  }, [dispatch]);

  const travelThroughTime = useCallback(async(historyIndex) => {
    return await dispatch(PostActions.travelThroughTime(historyIndex));
  }, [dispatch]);

  return {
    postList: list,
    postHistory: history,
    postErrorMessage: errorMessage,
    postProcessing: processing,
    fetchPosts,
    movePost,
    travelThroughTime,
  }
};

export default usePost;
