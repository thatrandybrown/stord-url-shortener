const controller = require("./UrlController");

jest.mock("../model/url", () => {
  return {
    findOne: (arg) => {
      if (
        arg.where.target === "https://www.google.com" ||
        arg.where.shortCode === "abcdef"
      )
        return { target: "https://www.google.com", shortCode: "abcdef" };
      else if (arg.where.shortCode === "pqrstu")
        throw new Error("DB Connection Failure!");
      else return null;
    },
    findOrCreate: (arg) => {
      if (arg.where.target === "https://www.reactjs.org")
        return [
          {
            target: "https://www.reactjs.org",
            shortCode: arg.defaults.shortCode,
          },
          true,
        ];
      else if (arg.where.target === "https://www.docker.com/")
        throw new Error("DB Connection Failure");
      else
        return [
          { target: arg.where.target, shortCode: arg.defaults.shortCode },
          true,
        ];
    },
  };
});

jest.mock("nanoid", () => {
  return { nanoid: (len) => "zyxwvutsrqponmlkjihgfedcba".slice(0, len) };
});

describe("URL Controller", () => {
  it("should get a URL with a matching shortcode", async () => {
    const url = await controller.retrieve({ shortCode: "abcdef" });
    expect(url).toHaveProperty("shortCode", "abcdef");
    expect(url).toHaveProperty("target", "https://www.google.com");
  });

  it("should get a URL with a matching target", async () => {
    const url = await controller.retrieve({ target: "https://www.google.com" });
    expect(url).toHaveProperty("shortCode", "abcdef");
    expect(url).toHaveProperty("target", "https://www.google.com");
  });

  it("should return null for a nonexistent shortcode", async () => {
    expect(await controller.retrieve({ shortCode: "ghijkl" })).toBeNull();
  });

  it("should return null for a nonexistant target", async () => {
    expect(
      await controller.retrieve({
        target: "https://developer.mozilla.org/en-US/",
      })
    ).toBeNull();
  });

  it("should throw an exception on User module failure on a retrieve", () => {
    expect(() =>
      controller.retrieve({ shortCode: "pqrstu" })
    ).rejects.toThrow();
  });

  it("should return an existing entry for an existing url", async () => {
    const [url, created] = await controller.create({
      url: "https://www.google.com",
    });
    expect(url).toHaveProperty("shortCode", "abcdef");
    expect(url).toHaveProperty("target", "https://www.google.com");
    expect(created).toBe(false);
  });

  it("should create a new entry for a new url", async () => {
    const [url, created] = await controller.create({
      url: "https://www.reactjs.org",
    });
    expect(url).toHaveProperty("shortCode", "zyxwvu");
    expect(url).toHaveProperty("target", "https://www.reactjs.org");
    expect(created).toBe(true);
  });

  it("should throw an exception if the url provided is invalid", () => {
    expect(() => controller.create({ url: "" })).rejects.toThrow();
    expect(() => controller.create({ url: "abcdef" })).rejects.toThrow();
  });

  it("should throw an exception on User module failure on a create", () => {
    expect(() =>
      controller.create({ url: "https://www.docker.com/" })
    ).rejects.toThrow();
  });
});
