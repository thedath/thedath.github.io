import React from 'react'

// import redux related components
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import reducers from './redux/reducers'

// importing screens
import { default as MainScreen } from './views/screens/Main'

const App = () => {
  return (
    <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
      <MainScreen />
    </Provider>
  )
}

export default App
