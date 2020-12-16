const { nanoid } = require("nanoid");
const UrlModel = require("../model/url");
const URL = require("url").URL;
const config = require("../config.js");

const retrieve = async (matchCriteria) => {
  return await UrlModel.findOne({ where: matchCriteria });
};

const create = async ({ url }) => {
  new URL(url);
  const existingURL = await retrieve({ target: url });
  if (existingURL) return [existingURL, false];

  let { minLength } = config.shortCode;
  let shortCode;
  do {
    shortCode = nanoid(minLength++);
  } while (await retrieve({ shortCode }));

  // probably change this into a create
  return await UrlModel.findOrCreate({
    where: { target: url },
    defaults: { shortCode },
  });
};

module.exports = { create, retrieve };
