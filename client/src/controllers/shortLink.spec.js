import { getShortLink, postShortLink } from "./shortLink";

describe("the shortlink controller", () => {
  let fetch;
  beforeAll(() => {
    fetch = jest.fn();
    global.fetch = fetch;
  });
  it("should invoke a get request with a provided ID and manual redirect", () => {
    getShortLink("abcdef");
    expect(fetch).toHaveBeenCalledWith("http://api.localhost/url/abcdef", {
      redirect: "manual",
    });
  });

  it("should invoke a post request with the url as the body", () => {
    postShortLink("https://www.google.com");
    expect(fetch).toHaveBeenCalledWith("http://api.localhost/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: '{"url":"https://www.google.com"}',
    });
  });
});
