import { act, render } from "@testing-library/react";
import { MemoryRouter, useParams } from "react-router-dom";
import ShortLink from "./";

jest.mock("../../controllers/shortLink", () => {
  return {
    getShortLink: (id) => {
      if (id === "abcdef")
        return Promise.resolve({
          type: "opaqueredirect",
          url: "api.localhost/url/abcdef",
        });
      else if (id === "pqrstu")
        return Promise.resolve({
          status: 500,
          message: "Internal Service Error",
        });
      else if (id === "zyxwvu") return Promise.reject("Something went wrong!");
      else return Promise.resolve({ status: 404, message: "Page Not Found" });
    },
  };
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

test("renders the Interstitial Component while loading", async () => {
  let container;
  useParams.mockReturnValue({ id: "lmnopq" });

  await act(async () => {
    container = render(<ShortLink />, { wrapper: MemoryRouter }).baseElement;
    expect(container.firstChild).toMatchSnapshot();
  });
});

test("renders the NotFound Component if the service returns a 404", async () => {
  let container;
  useParams.mockReturnValue({ id: "lmnopq" });

  await act(async () => {
    container = render(<ShortLink />, { wrapper: MemoryRouter });
  });
  expect(container.queryByText("404")).toBeInTheDocument();
  expect(container.baseElement).toMatchSnapshot();
});

test("renders the Error Component if the service returns a 500", async () => {
  let container;
  useParams.mockReturnValue({ id: "pqrstu" });

  await act(async () => {
    container = render(<ShortLink />, { wrapper: MemoryRouter });
  });
  expect(container.queryByText("Oops!")).toBeInTheDocument();
  expect(container.baseElement).toMatchSnapshot();
});

test("renders the Error Component if the service call fails", async () => {
  let container;
  useParams.mockReturnValue({ id: "zyxwvu" });

  await act(async () => {
    container = render(<ShortLink />, { wrapper: MemoryRouter });
  });
  expect(container.queryByText("Oops!")).toBeInTheDocument();
  expect(container.baseElement).toMatchSnapshot();
});

test("redirects to the api url if the service call returns a 301", async () => {
  let container;
  useParams.mockReturnValue({ id: "abcdef" });
  Object.defineProperty(window, "location", {
    value: {
      ...window.location,
    },
    writable: true,
  });
  window.location.assign = jest.fn();

  await act(async () => {
    container = render(<ShortLink />, { wrapper: MemoryRouter });
  });
  expect(window.location.assign).toBeCalledWith("api.localhost/url/abcdef");
});
