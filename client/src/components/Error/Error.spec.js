import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Error from "./";

test("renders the Error Component", () => {
  const { container, getByText } = render(<Error />, { wrapper: MemoryRouter });
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText("Oops!")).toBeInTheDocument();
  expect(getByText("Something went wrong!")).toBeInTheDocument();
});

test("renders the Error Component with Custom Heading Text", () => {
  const {
    container,
    queryByText,
  } = render(<Error heading="An Error Occurred" />, { wrapper: MemoryRouter });
  expect(container.firstChild).toMatchSnapshot();
  expect(queryByText("An Error Occurred")).toBeInTheDocument();
  expect(queryByText("Oops!")).toBeNull();
});

test("renders the Error Component with Custom Detail Text", () => {
  const {
    container,
    queryByText,
  } = render(<Error detail="An Error Occurred" />, { wrapper: MemoryRouter });
  expect(container.firstChild).toMatchSnapshot();
  expect(queryByText("An Error Occurred")).toBeInTheDocument();
  expect(queryByText("Oops!")).toBeInTheDocument();
  expect(queryByText("Something went wrong!")).toBeNull();
});

test("renders the Error component without a Heading", () => {
  const { container } = render(<Error heading={null} />, {
    wrapper: MemoryRouter,
  });
  expect(container.firstChild).toMatchSnapshot();
});

test("renders the Error component without a detail text", () => {
  const { container } = render(<Error detail={null} />, {
    wrapper: MemoryRouter,
  });
  expect(container.firstChild).toMatchSnapshot();
});

test("renders the Error component without a Link", () => {
  const { container } = render(<Error link={false} />, {
    wrapper: MemoryRouter,
  });
  expect(container.firstChild).toMatchSnapshot();
});
