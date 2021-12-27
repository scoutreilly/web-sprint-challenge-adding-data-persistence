// build your `/api/resources` router here
const express = require("express");
const resourceModel = require("./model");
const router = express.Router();

router.get("/", (req, res, next) => {
  resourceModel
    .getAll()
    .then((resources) => {
      res.json(resources);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/", async (req, res, next) => {
  try {
    const newResource = await resourceModel.create(req.body);
    res.json(newResource);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
