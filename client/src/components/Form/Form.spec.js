import { render, fireEvent, act, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Form from "./";

jest.mock("../../controllers/shortLink", () => {
  return {
    postShortLink: (url) => {
      // console.log("called postShortLink with " + url);
      if (url === "https://www.google.com")
        return Promise.resolve({
          ok: true,
          json: () => ({
            shortCode: "abcdef",
            target: "https://www.google.com",
          }),
        });
      else if (url === "https://developer.mozilla.org/en-US/")
        return Promise.resolve({
          ok: false,
          status: 500,
          json: () => ({ message: "Internal Service Error" }),
        });
      else if (url === "https://reactjs.org/")
        return Promise.reject("Something went wrong!");
      else return Promise.resolve({ status: 404, message: "Page Not Found" });
    },
  };
});

test("renders instructions", () => {
  const { container, getByText } = render(<Form />);
  const instructions = getByText(
    /Shorten your link: provide a full url and get a shortened link for sharing./i
  );
  expect(instructions).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});

test("renders the form correctly", () => {
  const { getByText, getByLabelText, getByRole } = render(<Form />);
  const UrlLabel = getByText(/URL:/i);
  expect(UrlLabel).toBeInTheDocument();
  const urlField = getByLabelText(/URL:/i);
  expect(urlField).toHaveAttribute("type", "url");
  const submitButton = getByRole("button", { name: "Shorten" });
  expect(submitButton).toBeInTheDocument();
});

test("disables form submission before url is provided", () => {
  const { getByLabelText, getByRole } = render(<Form />);
  const urlField = getByLabelText(/URL:/i);
  expect(urlField).toHaveAttribute("required");
  fireEvent.change(urlField, { target: { value: "" } });
  const submitButton = getByRole("button", { name: "Shorten" });
  expect(submitButton).toHaveAttribute("disabled");
});

test("display form input as the input value", () => {
  const { getByLabelText } = render(<Form />);
  const urlField = getByLabelText(/URL:/i);
  fireEvent.change(urlField, { target: { value: "https://www.google.com" } });
  expect(urlField.value).toBe("https://www.google.com");
});

test("enables form submission when url is provided", () => {
  const { getByLabelText, getByRole } = render(<Form />);
  const urlField = getByLabelText(/URL:/i);
  fireEvent.change(urlField, { target: { value: "abcd" } });
  const submitButton = getByRole("button", { name: "Shorten" });
  expect(submitButton).not.toHaveAttribute("disabled");
});

test("Should show the interstitial when the service call is initiated", async () => {
  const { baseElement, getByLabelText, getByRole } = render(
    <Form setData={jest.fn()} />,
    { wrapper: MemoryRouter }
  );
  const urlField = getByLabelText(/URL:/i);
  fireEvent.change(urlField, { target: { value: "https://reactjs.org/" } });
  const submitButton = getByRole("button", { name: "Shorten" });
  act(() => {
    fireEvent.click(submitButton);
  });
  await waitFor(() => expect(baseElement).toMatchSnapshot());
});

test("Should show the error page when the service call fails", async () => {
  const { baseElement, getByLabelText, getByRole } = render(
    <Form setData={jest.fn()} />,
    { wrapper: MemoryRouter }
  );
  const urlField = getByLabelText(/URL:/i);
  fireEvent.change(urlField, { target: { value: "https://reactjs.org/" } });
  const submitButton = getByRole("button", { name: "Shorten" });
  await act(async () => {
    fireEvent.click(submitButton);
  });
  expect(baseElement).toMatchSnapshot();
});

test("Should show the error page when the service call returns a bad response", async () => {
  const { baseElement, getByLabelText, getByRole } = render(
    <Form setData={jest.fn()} />,
    { wrapper: MemoryRouter }
  );
  const urlField = getByLabelText(/URL:/i);
  fireEvent.change(urlField, {
    target: { value: "https://developer.mozilla.org/en-US/" },
  });
  const submitButton = getByRole("button", { name: "Shorten" });
  await act(async () => {
    fireEvent.click(submitButton);
  });
  expect(baseElement).toMatchSnapshot();
});

test("Should invoke the setData function when the response is valid", async () => {
  const setData = jest.fn();
  const { getByLabelText, getByRole } = render(<Form setData={setData} />, {
    wrapper: MemoryRouter,
  });
  const urlField = getByLabelText(/URL:/i);
  fireEvent.change(urlField, { target: { value: "https://www.google.com" } });
  const submitButton = getByRole("button", { name: "Shorten" });
  await act(async () => {
    fireEvent.click(submitButton);
  });
  expect(setData).toHaveBeenCalledWith({
    shortCode: "abcdef",
    target: "https://www.google.com",
  });
});

test("Should clear the form when the service call returns valid", async () => {
  const setData = jest.fn();
  const { getByLabelText, getByRole } = render(<Form setData={setData} />, {
    wrapper: MemoryRouter,
  });
  const urlField = getByLabelText(/URL:/i);
  fireEvent.change(urlField, { target: { value: "https://www.google.com" } });
  expect(urlField.value).toBe("https://www.google.com");
  const submitButton = getByRole("button", { name: "Shorten" });
  await act(async () => {
    fireEvent.click(submitButton);
  });
  expect(urlField.value).toBe("");
});

test("Should render the form after successful fetch", async () => {
  const setData = jest.fn();
  const { baseElement, getByLabelText, getByRole } = render(
    <Form setData={setData} />,
    { wrapper: MemoryRouter }
  );
  const urlField = getByLabelText(/URL:/i);
  fireEvent.change(urlField, { target: { value: "https://www.google.com" } });
  expect(urlField.value).toBe("https://www.google.com");
  const submitButton = getByRole("button", { name: "Shorten" });
  await act(async () => {
    fireEvent.click(submitButton);
  });
  expect(baseElement).toMatchSnapshot();
});
