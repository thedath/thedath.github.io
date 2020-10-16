import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as PostActions from '../actions/postActions';

/**
 * Hook for handle post related operations asynchonously. Redux related operations (Ex: dispatching)
 * are encapsulated so UIs will be more clean.
 */
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

  /**
   * Move a post up or down
   * 
   * @param {number} index Current position of the post going to be moved 
   * @param {string} action Either 'up' or 'down' 
   */
  const movePost = useCallback(async(index, action) => {
    return await dispatch(PostActions.movePost(index, action));
  }, [dispatch]);

  /**
   * Rolling back the changes up until a certain ponit of action history
   * 
   * @param {string} historyIndex Index of the action history item in the history array 
   */
  const travelThroughTime = useCallback(async(historyIndex) => {
    return await dispatch(PostActions.travelThroughTime(historyIndex));
  }, [dispatch]);

  // returning states of post and async operations
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
