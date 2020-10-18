import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";

import App from "./App";

jest.mock("axios");

describe("<App />", () => {
  test(`Clicking on time travel button in last history item bring back the 
  original posts order from API response`, async () => {
    // mocked axios with dummy response
    const data = [
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
    ];
    axios.get.mockResolvedValue({ data });

    render(<App />);

    // posts appear in DOM should have the same order of the 
    // posts in the API response
    let posts = await screen.findAllByLabelText("post");
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      expect(post.getAttribute("data-testid")).toEqual(`post-${data[i].id}`);
    }
    // first post should have a move down button but not a move up button
    expect(screen.getByTestId(`post-button-move-down-${data[0].id}`)).toBeInTheDocument();
    expect(screen.queryByTestId(`post-button-move-up-${data[0].id}`)).not.toBeInTheDocument();
    // move down button of the first post
    const firstPostMoveDownButtonHTML = screen.getByTestId(`post-button-move-down-${data[0].id}`);
    // clicking the first post's (at this point) move down button
    // to bring it to the very end of the post list, move count 
    // equals to 1 less from the post list size
    const movesCount = data.length - 1;
    for (let i = 0; i < movesCount; i++) {
      expect(fireEvent.click(firstPostMoveDownButtonHTML)).toEqual(true);
    }
    // reloads the DOM's post list to get the updated order
    posts = await screen.findAllByLabelText("post");
    // get last post element of the changed post list
    const newLastPostHTML = posts[posts.length - 1];
    // this post should be the first one from API response
    expect(newLastPostHTML.getAttribute('data-testid')).toEqual(`post-${data[0].id}`);
    // by now, history item should have being generated
    let actionHistoryItems = screen.queryAllByLabelText("action-history-item");
    // the action history item count should be the moves being
    // made because of the moved post
    expect(actionHistoryItems.length).toEqual(movesCount);
    // locating the very first history item being generated,
    // first action history is the last element in the 
    // rendered action history item list of the DOM
    const veryFirstActionHistoryItemHTML = actionHistoryItems[actionHistoryItems.length - 1];
    // it should be the same html element as of the 
    // first post of the API response
    expect(veryFirstActionHistoryItemHTML.getAttribute('data-moved-post-id')).toEqual(`moved-post-id-${data[0].id}`);
    // obtaining the time travel button of the 
    // very first action history item
    const firstActionHistoryTimeTravelButtonHTML = screen.getByTestId(`history-item-time-travel-button-${(movesCount - 1)}`);
    // clicking on this button should remove all the 
    // action hsitory items from DOM
    expect(fireEvent.click(firstActionHistoryTimeTravelButtonHTML)).toEqual(true);
    // reloading the action history items (which suppose not to exist)
    expect(screen.queryAllByLabelText("action-history-item").length).toEqual(0);
    // at this point since post list time travelled to 
    // API response's state, post orders must be identical
    // reloads the DOM's post list to get the updated order
    posts = await screen.findAllByLabelText("post");
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      expect(post.getAttribute("data-testid")).toEqual(`post-${data[i].id}`);
    }
  });
});
