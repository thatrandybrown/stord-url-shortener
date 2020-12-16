const request = require("supertest");
const app = require("./app");

jest.mock("./model/url", () => ({
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
    else if (arg.where.target == "https://www.docker.com")
      throw new Error("DB Connection Failure");
    else
      return [
        { target: arg.where.target, shortCode: arg.defaults.shortCode },
        true,
      ];
  },
}));

jest.mock("nanoid", () => {
  return { nanoid: (len) => "zyxwvutsrqponmlkjihgfedcba".slice(0, len) };
});

describe("url endpoint gets", () => {
  it("should return a 301 when a valid shortcode is provided", async () => {
    const res = await request(app).get("/url/abcdef");
    expect(res.statusCode).toEqual(301);
    expect(res.header.location).toEqual("https://www.google.com");
  });

  it("should return a 404 when an invalid shortcode is provided", async () => {
    const res = await request(app).get("/url/ghijkl");
    expect(res.statusCode).toEqual(404);
  });

  it("should return a 500 when a db connection cannot be made", async () => {
    const res = await request(app).get("/url/pqrstu");
    expect(res.statusCode).toEqual(500);
  });
});

describe("url endpoint posts", () => {
  it("should return a 200 for a post with an existing URL", async () => {
    const res = await request(app)
      .post("/url/")
      .send({ url: "https://www.google.com" })
      .set("Accept", "application/json");
    expect(res.statusCode).toEqual(200);
    expect(res.body.target).toEqual("https://www.google.com");
    expect(res.body.shortCode).toEqual("abcdef");
  });

  it("should return a 201 for a post with a new URL", async () => {
    const res = await request(app)
      .post("/url/")
      .send({ url: "https://www.reactjs.org" })
      .set("Accept", "application/json");
    expect(res.statusCode).toEqual(201);
    expect(res.body.target).toEqual("https://www.reactjs.org");
    expect(res.body.shortCode).toEqual("zyxwvu");
  });

  it("should return a 500 for a DB failure of any sort", async () => {
    const res = await request(app)
      .post("/url/")
      .send({ url: "https://www.docker.com" });
    expect(res.statusCode).toEqual(500);
  });

  it("should return a 400 if a url is not provided", async () => {
    const res = await request(app).post("/url/");
    expect(res.statusCode).toEqual(400);
  });

  it("should return a 400 if a bad url string is provided", async () => {
    const res = await request(app)
      .post("/url/")
      .send({ url: "abcdef" })
      .set("Accept", "application/json");
    expect(res.statusCode).toEqual(400);
  });
});

test("a nonexistent endpoint", async () => {
  const res = await request(app).get("/urls/");
  expect(res.statusCode).toEqual(404);
});
