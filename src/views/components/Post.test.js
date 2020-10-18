import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import reducers from "../../redux/reducers";
import Post from "./Post";

describe("<Post />", () => {
  test("Valid post gets rendered", async () => {
    const post = {
      index: 0,
      id: 1,
      title: "Test title 1",
      body: "Test body 1",
      userId: 1,
      upVisible: true,
      downVisible: false,
    };
    render(
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Post {...post} />
      </Provider>
    );

    expect(await screen.findByText(/Test title 1/)).toBeInTheDocument();
  });

  test("Post with missing props does not get rendered", async () => {
    // post object with missing 'index' prop
    const post = {
      id: 1,
      title: "Test title 1",
      body: "Test body 1",
      userId: 1,
      upVisible: true,
      downVisible: false,
    };
    render(
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Post {...post} />
      </Provider>
    );

    await waitFor(() => expect(screen.queryByText(/Test title 1/)).not.toBeInTheDocument());
  });

  test("Post with invalid type props does not get rendered", async () => {
    // post object with string value in 'index' prop
    const post = {
      index: "0",
      id: 1,
      title: "Test title 1",
      body: "Test body 1",
      userId: 1,
      upVisible: true,
      downVisible: false,
    };
    render(
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Post {...post} />
      </Provider>
    );

    await waitFor(() => expect(screen.queryByText(/Test title 1/)).not.toBeInTheDocument());
  });

  test("When 'upVisible' is 'true' Up Button gets rendered on the post", async () => {
    const post = {
      index: 0,
      id: 1,
      title: "Test title 1",
      body: "Test body 1",
      userId: 1,
      upVisible: true,
      downVisible: false,
    };
    render(
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Post {...post} />
      </Provider>
    );

    expect(await screen.findByTestId(`post-button-move-up-${post.id}`)).toBeInTheDocument();
  });

  test("When 'upVisible' is 'fales' Up Button does not get rendered on the post", async () => {
    const post = {
      index: 0,
      id: 1,
      title: "Test title 1",
      body: "Test body 1",
      userId: 1,
      upVisible: false,
      downVisible: false,
    };
    render(
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Post {...post} />
      </Provider>
    );

    await waitFor(() => expect(screen.queryByTestId(`post-button-move-up-${post.id}`)).not.toBeInTheDocument());
  });

  test("When 'downVisible' is 'true' Down Button gets rendered on the post", async () => {
    const post = {
      index: 0,
      id: 1,
      title: "Test title 1",
      body: "Test body 1",
      userId: 1,
      upVisible: false,
      downVisible: true,
    };
    render(
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Post {...post} />
      </Provider>
    );

    expect(await screen.findByTestId(`post-button-move-down-${post.id}`)).toBeInTheDocument();
  });

  test("When 'downVisible' is 'fales' Down Button does not get rendered on the post", async () => {
    const post = {
      index: 0,
      id: 1,
      title: "Test title 1",
      body: "Test body 1",
      userId: 1,
      upVisible: false,
      downVisible: false,
    };
    render(
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Post {...post} />
      </Provider>
    );

    await waitFor(() => expect(screen.queryByTestId(`post-button-move-down-${post.id}`)).not.toBeInTheDocument());
  });
});
