const router = require("express").Router();
const UrlController = require("../controller/UrlController");

router.get("/:shortCode", async (req, res, next) => {
  try {
    const url = await UrlController.retrieve({
      shortCode: req.params.shortCode,
    });
    if (!url) return next({ status: 404, message: "shortLink not found" });
    return res.status(301).set("Location", url.target).send();
  } catch (e) {
    return next(e);
  }
});

router.post("/", async (req, res, next) => {
  if (!req.body.url) return next({ status: 400, message: "url is required" });

  try {
    new URL(req.body.url);
  } catch (e) {
    return next({
      status: 400,
      message: `${req.body.url} is not a valid url`,
      error: e,
    });
  }

  try {
    const [
      { shortCode, target, ...rest },
      created,
    ] = await UrlController.create({ url: req.body.url });
    if (!shortCode)
      return next({ status: 500, message: "shortCode was not generated" });
    if (created) return res.status(201).send({ shortCode, target });
    else return res.status(200).send({ shortCode, target });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
