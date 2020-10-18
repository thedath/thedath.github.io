import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";

import App from "./App";

jest.mock("axios");

describe("<App />", () => {
  test("Incompatible post objects API response will not ger rendered", async () => {
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
          userId: "2",
          id: 2,
          title: "Test title 2",
          body: "Test body 2",
        },
        {
          userId: true,
          id: false,
          title: "",
          body: "",
        },
        {
          userIdTest: 4,
          idTest: 4,
          titleTest: "Test title 4",
          bodyTest: "Test body 4",
        },
        {
          userId: 5,
          id: 5,
          title: "Test title 5",
          body: "Test body 5",
          extra: ""
        },
      ],
    });

    render(<App />);

    expect(await screen.findByText(/Sortable Post List/)).toBeInTheDocument();
    expect(screen.queryByText(/Test title 1/)).toBeInTheDocument();
    expect(screen.queryByText(/Test title 2/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Test title 3/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Test title 4/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Test title 5/)).toBeInTheDocument();
  });
});
