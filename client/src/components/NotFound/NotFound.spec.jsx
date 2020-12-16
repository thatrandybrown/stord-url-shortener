import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "./";

test("renders the NotFound Component", () => {
  const { container, getByText } = render(<NotFound />, {
    wrapper: MemoryRouter,
  });
  expect(container.firstChild).toMatchSnapshot();
  expect(getByText("404")).toBeInTheDocument();
  expect(getByText("Page Not Found!")).toBeInTheDocument();
});
