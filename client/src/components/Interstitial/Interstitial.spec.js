import { render } from "@testing-library/react";
import Loader from "./";

test("renders the Interstitial Component", () => {
  const { baseElement } = render(<Loader />);
  expect(baseElement.firstChild).toMatchSnapshot();
});
