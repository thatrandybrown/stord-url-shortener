import { fireEvent, render } from "@testing-library/react";
import NewLink from "./";

test("renders the Data Display", () => {
  const { container } = render(
    <NewLink data={{ target: "https://www.google.com", shortCode: "abcdef" }} />
  );
  expect(container.firstChild).toMatchSnapshot();
});

test("renders nothing without data", () => {
  const { container } = render(<NewLink />);
  expect(container.firstChild).toMatchSnapshot();
});

test("links to the original link", () => {
  const { getByText } = render(
    <NewLink data={{ target: "https://www.google.com", shortCode: "abcdef" }} />
  );
  expect(getByText("https://www.google.com").href).toBe(
    "https://www.google.com/"
  );
});

test("links to the shortLink", () => {
  const { getByText } = render(
    <NewLink data={{ target: "https://www.google.com", shortCode: "abcdef" }} />
  );
  expect(getByText("http://localhost/abcdef").href).toBe(
    "http://localhost/abcdef"
  );
});

test("copies the link when the button is clicked", () => {
  let clipboardText;
  const execCommand = jest.fn((cmd) => {
    if (cmd === "Copy") clipboardText = window.getSelection().toString();
  });
  global.document.execCommand = execCommand;

  const testData = { target: "https://www.google.com", shortCode: "abcdef" };
  const { getByRole } = render(<NewLink data={testData} />);

  const copyButton = getByRole("button", { name: "Copy!" });
  fireEvent.click(copyButton);

  expect(execCommand).toHaveBeenCalled();
  expect(clipboardText).toEqual("http://localhost/abcdef");
});
