import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ErrorBoundary } from "./";

const Broken = ({ shouldThrow }) => {
  if (shouldThrow) throw new Error("Error!");
  return <p>Success</p>;
};

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

test("renders the ErrorBoundary Component with Children", () => {
  const { container, queryByText } = render(
    <ErrorBoundary>
      <Broken shouldThrow={false} />
    </ErrorBoundary>
  );

  expect(queryByText("Success")).toBeInTheDocument();
  expect(container.firstChild).toMatchSnapshot();
});

test("renders the Error Component when an Error is thrown", () => {
  const { container, rerender, queryByText } = render(
    <ErrorBoundary>
      <Broken shouldThrow={false} />
    </ErrorBoundary>,
    { wrapper: MemoryRouter }
  );
  rerender(
    <ErrorBoundary>
      <Broken shouldThrow={true} />
    </ErrorBoundary>,
    { wrapper: MemoryRouter }
  );
  expect(container.firstChild).toMatchSnapshot();
  expect(queryByText("Oops!")).toBeInTheDocument();
});
