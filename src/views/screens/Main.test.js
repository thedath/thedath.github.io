import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import reducers from "../../redux/reducers";
import Main from "./Main";

jest.mock("axios");

describe("<Main />", () => {
  test("Post list from API reponse gets loaded on UI", async () => {
    // mocked axios with dummy response
    axios.get.mockResolvedValue({
      data: [
        {
          userId: 1,
          id: 1,
          title: "Test title 1",
          body: "Test body 1",
        },
        {
          userId: 2,
          id: 2,
          title: "Test title 2",
          body: "Test body 2",
        },
        {
          userId: 3,
          id: 3,
          title: "Test title 3",
          body: "Test body 3",
        },
        {
          userId: 4,
          id: 4,
          title: "Test title 4",
          body: "Test body 4",
        },
        {
          userId: 5,
          id: 5,
          title: "Test title 5",
          body: "Test body 5",
        },
      ],
    });
    // after preperation apps get rendered
    render(
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Main />
      </Provider>
    );
    // checking the expected response
    expect(await screen.findByText(/Test title 1/)).toBeInTheDocument();
    expect(screen.queryByText(/Test title 2/)).toBeInTheDocument();
    expect(screen.queryByText(/Test title 3/)).toBeInTheDocument();
    expect(screen.queryByText(/Test title 4/)).toBeInTheDocument();
    expect(screen.queryByText(/Test title 5/)).toBeInTheDocument();
    // checking for not values should not appear
    expect(screen.queryByText(/Test title 6/)).not.toBeInTheDocument();
  });

  test("Error is shown when API response is a value other than an array", async () => {
    // mocked axios with dummy response that is not an array
    axios.get.mockResolvedValue({
      data: {
        userId: 5,
        id: 5,
        title: "Test title 1",
        body: "Test body 1",
      },
    });
    render(
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Main />
      </Provider>
    );
    // checking the expected response
    expect(await screen.findByText(/Error:/)).toBeInTheDocument();
    expect(
      screen.queryByText(/Invalid response from server/)
    ).toBeInTheDocument();
    expect(screen.queryByText(/Test title 1/)).not.toBeInTheDocument();
    axios.mockReset();
  });

  test("Error is shown when API gives an error response", async () => {
    // mocked axios with dummy error
    axios.get.mockReturnValue(Promise.reject(new Error()));
    render(
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Main />
      </Provider>
    );
    expect(await screen.findByText(/Error:/)).toBeInTheDocument();
    expect(
      screen.queryByText(/Request failed or invalid response/)
    ).toBeInTheDocument();
  });

  test("Error is shown when API response triggers an exception", async () => {
    // mocked axios with dummy error
    axios.get.mockReturnValue(new Error());
    render(
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Main />
      </Provider>
    );
    expect(await screen.findByText(/Error:/)).toBeInTheDocument();
    expect(
      screen.queryByText(/Unable perform post fetch call/)
    ).toBeInTheDocument();
  });
});
