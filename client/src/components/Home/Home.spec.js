import { act, fireEvent, render } from "@testing-library/react";
import Home from "./";

jest.mock("../../controllers/shortLink", () => {
  return {
    postShortLink: (url) => {
      if (url === "https://www.google.com")
        return Promise.resolve({
          ok: true,
          json: () => ({
            shortCode: "abcdef",
            target: "https://www.google.com",
          }),
        });
    },
  };
});

test("renders the Form on the Home Page", () => {
  const { container } = render(<Home />);
  expect(container).toMatchSnapshot();
});

test("renders the Form and NewLink text on the Home Page when the form is submitted", async () => {
  const { baseElement, getByLabelText, getByRole } = render(<Home />);
  const urlField = getByLabelText(/URL:/i);
  fireEvent.change(urlField, { target: { value: "https://www.google.com" } });
  const submitButton = getByRole("button", { name: "Shorten" });
  await act(async () => {
    fireEvent.click(submitButton);
  });
  expect(baseElement).toMatchSnapshot();
});
