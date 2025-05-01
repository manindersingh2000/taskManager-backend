import Task from "../modals/task.js";
export const createTask = async (req, res) => {
  const { taskname, tag, time } = req.body;
  try {
    const taskObj = {
      taskname,
      tag,
      time,
    };
    const task = new Task(taskObj);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
};
export const updateTask = async (req, res) => {
  const { taskname, tag, time } = req.body;
  const updateObj = { taskname, tag, time };
  const updates = Object.keys(updateObj); // Get the keys from the request body
  const allowedUpdates = ["taskname", "tag", "time"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send({ error: "Task not found!" });
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};
export const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};






