import { act, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

test("renders the app home page", () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toMatchSnapshot();
});

test("landing on the id param route", async () => {
  window.history.pushState({}, "Test page", "/abcdef");

  await act(async () => {
    const { baseElement } = render(<App />, { wrapper: BrowserRouter });
    expect(baseElement).toMatchSnapshot();
  });
});

test("landing on a bad page", () => {
  window.history.pushState({}, "Test page", "/abcdef/gh");

  const { baseElement } = render(<App />, { wrapper: BrowserRouter });
  expect(baseElement).toMatchSnapshot();
});
