import {
  POST_SET_POST_LIST,
  POST_SET_ERROR,
  POST_SET_PROCESSING,
  POST_MOVE,
  POST_TRAVEL_THROUGH_TIME,
} from "../actions/postActions";

const initialState = {
  list: [],
  history: [],
  errorMessage: "",
  processing: false,
};

/**
 * Swapping two post in given post array
 * 
 * @param {array} postList Array of posts
 * @param {number} fromIndex Index of the post going to be moved
 * @param {number} toIndex Index of the post going to be replaced by moving
 */
const swapPost = (postList, fromIndex, toIndex) => {
  // post going to be replaced
  const toPost = postList[toIndex];
  // will be undefined if out of bound
  if (toPost) {
    // post going to be moved
    const fromPost = postList[fromIndex];
    // swapping the post
    postList[toIndex] = fromPost;
    postList[fromIndex] = toPost;
    // returning the post array with changes, along with moved
    // post id
    return { movedPostId: fromPost.id, newPostList: postList };
  } else {
    // swap didn't happen
    return false;
  }
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_SET_POST_LIST:
      return { ...state, list: action.payload, processing: false };
    case POST_SET_ERROR:
      return { ...state, errorMessage: action.payload, processing: false };
    case POST_SET_PROCESSING:
      return { ...state, processing: true };
    case POST_MOVE: {
      const fromIndex = action.payload.from;
      const toIndex = action.payload.to;
      const swapResponse = swapPost([...state.list], fromIndex, toIndex);
      // results obtained after post swap
      if (swapResponse) {
        // returning a copy of the existing state replacing the post list with
        // changed post list and, history item is added on top of the to existing history list
        return {
          ...state,
          list: swapResponse.newPostList,
          history: [
            {
              movedPostId: swapResponse.movedPostId,
              date: new Date().getTime(),
              fromIndex,
              toIndex,
            },
            ...state.history,
          ],
        };
      } else {
        // swap didn't happen, returning the copy of the existing state
        return { ...state };
      }
    }
    case POST_TRAVEL_THROUGH_TIME: {
      // index of the history action item in history list where
      // requested to time travel to
      const historyIndex = action.payload;
      // copy of the existing post history list
      const historyListCopy = [...state.history];
      // copy of the existing post list
      let postListCopy = [...state.list];
      // iterating through history list from the latest history to the
      // selected history where time travel is requested
      for (let i = 0; i <= historyIndex; i++) {
        // a previosu action is obtained
        const history = historyListCopy[i];
        // rolling back this action by reverse swapping the moved post during that action
        const swapResponse = swapPost(postListCopy, history.toIndex, history.fromIndex);
        // response is obtained
        if (swapResponse) {
          // replacing the copied post list each time a reverse swapping succeeded
          postListCopy = swapResponse.newPostList;
        }
      }
      // returing a copy of the existing state with the changed post list and where 
      // time traveled hsitory items being chopped off from the hsitory item list
      return {
        ...state,
        list: postListCopy,
        history: historyListCopy.slice(historyIndex + 1, historyListCopy.length),
      };
    }
    default:
      return state;
  }
};

export default postReducer;
