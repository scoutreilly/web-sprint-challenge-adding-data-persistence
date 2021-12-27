// build your `/api/tasks` router here
// build your `/api/projects` router here
const express = require("express");
const taskModel = require("./model");
const router = express.Router();

router.get("/", (req, res, next) => {
  taskModel
    .getAll()
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/", async (req, res, next) => {
  try {
    const newBody = req.body;
    if (!newBody.project_name || !newBody.project_description) {
      res
        .status(404)
        .json({ message: "New project must include a name and description" });
    } else {
      const newTask = await taskModel.create(newBody);
      res.json({
        task_id: newTask.task_id,
        task_description: newTask.task_description,
        task_notes: newTask.task_notes,
        task_completed: newTask.task_completed === 0 ? false : true,
        project_id: newTask.project_id,
      });
    }
  } catch (err) {
    next(err);
  }
});
