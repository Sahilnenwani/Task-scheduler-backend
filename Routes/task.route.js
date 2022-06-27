const express = require("express");
const router = express.Router();
const { verifyJWT, authRole } = require("../Middlewares/verifyJWT");
const {
  getAllTasks,
  getUserSpecificTask,
  addNewTask,
  deleteTask,
  handleUpdateTask,
} = require("../Controllers/userTasksController");
const taskSchema = require("../Models/taskSchema");
// const userDocument = require("../Models/userSchema");

router.get("/AllTasks", verifyJWT, authRole("admin"), async (req, res) => {
  try {
    let allTasksData = await getAllTasks();
    allTasksData.errors
      ? res.json({
          status: 500,
          message: "error occured",
          error: allTasksData.errors,
        })
      : res.status(200).json({
          status: 200,
          message: "successfully fetched all the tasks of all the users",
          Data: allTasksData,
        });
  } catch (error) {
    c;
  }
});

router.get("/", verifyJWT, async (req, res) => {
  const userId = req.body.userId;

  if (!userId)
    res.status(401).json({ status: 401, message: "Must be a valid user" });
  try {
    let tasksData = await getUserSpecificTask(userId);
    tasksData.errors
      ? res.json({
          status: 500,
          message: "error occured",
          error: tasksData.errors,
        })
      : res.status(200).json({
          status: 200,
          message: "successfully fetched all the tasks of a user",
          Data: tasksData,
        });
  } catch (error) {
    res.json({ status: 500, message: "error occured", error });
  }
});

router.post("/createTask", verifyJWT, async (req, res) => {
  // const userId=req.body.userId;
  // if(!userId) res.status(401).json({status:401,message:"Must be a valid user"});

  if (!req.body.title && !req.body.content) {
    return res.status(400).send({
      message: "Note title and content cannot be empty",
    });
  }

  const taskData = req.body;

  try {
    let savedTaskData = await addNewTask(taskData);
    savedTaskData.errors
      ? res.json({
          status: 500,
          message: "error occured",
          error: savedTaskData.errors,
        })
      : res.status(200).json({
          status: 200,
          message: "successfully created the new task",
          Data: savedTaskData,
        });
  } catch (error) {
    res.json({ status: 500, message: "error occured", error });
  }

  // const todoTasks = new taskSchema(taskData);
  // const saveTasks = await todoTasks.save();

  // const usersData = await user.findById(req.params.userID);

  // const updateuser = user.findByIdAndUpdate(
  //   req.params.userID,
  //   {
  //     tasks: [saveTasks._id],
  //   },
  //   (err) => {
  //     if (err) return res.sendStatus(500);
  //   }
  // );

  // console.log(usersData);
  // console.log(saveTasks._id);

  // res.json(saveTasks);
});

router.delete("/dTask/:taskid", verifyJWT, async (req, res) => {
  const  taskId  = req.params.taskid;
  const userId = req.body.userId;

  try {
    let updatedData = deleteTask(taskId, userId);
    updatedData.errors
      ? res.json({
          status: 500,
          message: "error occured",
          error: updatedData.errors,
        })
      : updatedData == "There is no task like this"
      ? res.json({ status: 500, message: "There is no task like this" })
      : updatedData == "Not authorized to delete the task"
      ? res.json({ status: 500, message: "There is no task like this" })
      : res.status(200).json({ status: 200, message: "successfully deleted" });
  } catch (error) {
    res.json({ status: 500, message: "error occured", error });
  }

  // let afDeleteData = await taskSchema.findByIdAndDelete(req.params.taskid);
  // res.json({ sucess: "successfuly deleted" });
});

router.put("/updateTask/:taskid", async (req, res) => {
  const { taskId } = req.params.taskid;
  const taskData = req.body;
  try {
    let updatedData = await handleUpdateTask(taskId, taskData);
    updatedData.errors
      ? res.json({
          status: 500,
          message: "error occured",
          error: updatedData.errors,
        })
      : updatedData == "There is no task like this"
      ? res.json({ status: 500, message: "There is no task like this" })
      : res.status(200).json({ status: 200, message: "successfully deleted" });
  } catch (error) {
    res.json({ status: 500, message: "error occured", error });
  }

  // let afDeleteData = await taskSchema.findByIdAndDelete(req.params.taskid);
  // res.json({ sucess: "successfuly deleted" });
});

module.exports = router;
