import Axios from 'axios'

export const POST_SET_POST_LIST = 'post-list'
export const POST_SET_ERROR = 'post-error'
export const POST_SET_PROCESSING = 'post-processing'
export const POST_MOVE = 'post-moving'
export const POST_TRAVEL_THROUGH_TIME = 'post-time-travel'

export const fetchPosts = (limit = 10) => async (dispatch) => {
  dispatch({ type: POST_SET_PROCESSING })
  await Axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(response => {
    // check whether the response is an arra prior to do array slice
    let posts = [];
    if (response.data && Array.isArray(response.data)) {
      posts = response.data.slice(0, limit)
    }
    dispatch({ type: POST_SET_POST_LIST, payload: posts })
  })
  .catch(error => {
    dispatch({ type: POST_SET_ERROR, payload: error })
  })
}

export const movePost = (index, action) => (dispatch) => {
  // determining the from and to indexes post going to be moved
  let to = index;
  switch (action) {
    case 'up':
      to--;
      break;
    case 'down':
      to++;
      break;
    default:
      break;
  }
  dispatch({ type: POST_MOVE, payload: { from: index, to } })
}

export const travelThroughTime = (historyIndex) => (dispatch) => {
  dispatch({ type: POST_TRAVEL_THROUGH_TIME, payload: historyIndex })
}