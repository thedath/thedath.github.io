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

const swapPost = (postList, fromIndex, toIndex) => {
  const toPost = postList[toIndex];
  if (toPost) {
    const fromPost = postList[fromIndex];
    postList[toIndex] = fromPost;
    postList[fromIndex] = toPost;
    return { movedPostId: fromPost.id, newPostList: postList };
  } else {
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
      if (swapResponse) {
        return {
          ...state,
          list: swapResponse.newPostList,
          history: [
            {
              title: `Moved post ${swapResponse.movedPostId} from ${fromIndex} index to ${toIndex} index`,
              date: new Date().getTime(),
              fromIndex,
              toIndex,
            },
            ...state.history,
          ],
        };
      } else {
        return { ...state };
      }
    }
    case POST_TRAVEL_THROUGH_TIME: {
      const historyIndex = action.payload;
      const newHistory = [...state.history];
      let postListCopy = [...state.list];
      for (let i = 0; i <= historyIndex; i++) {
        const history = newHistory[i];
        const swapResponse = swapPost(postListCopy, history.toIndex, history.fromIndex);
        if (swapResponse) {
          postListCopy = swapResponse.newPostList;
        }
      }
      return {
        ...state,
        list: postListCopy,
        history: newHistory.slice(historyIndex + 1, newHistory.length),
      };
    }
    default:
      return state;
  }
};

export default postReducer;
