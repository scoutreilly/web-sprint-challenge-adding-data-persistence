// build your `/api/projects` router here
const express = require("express");
const projectModel = require("./model");
const router = express.Router();

router.get("/", (req, res, next) => {
  projectModel
    .getAll()
    .then((projects) => {
      res.json(projects);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/", async (req, res, next) => {
  try {
    const newProject = await projectModel.create(req.body);
    res.json({
      project_id: newProject.project_id,
      project_name: newProject.project_name,
      project_description: newProject.project_description,
      project_completed: newProject.project_completed === 0 ? false : true,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
