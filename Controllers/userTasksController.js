const { verifyJWT, authRole } = require("../Middlewares/verifyJWT");
const taskSchema = require("../Models/taskSchema");
// const userDocument = require("../Models/userSchema");

const getAllTasks = async () => {
  try {
    let tasksData = await taskSchema
      .find({})
      .where("checkdelete")
      .equals("false");

    return tasksData;
  } catch (error) {
    return error;
  }
};
const getUserSpecificTask = async (userId) => {
  try {
    let tasksData = await taskSchema
      .find({ userId })
      .where("checkdelete")
      .equals("false");
    // let totalData = tasksData.filter((task) => {
    //   return task.checkdelete !== true;
    // });
    // console.log(totalData);
    return tasksData;
  } catch (error) {
    return error;
  }
};

const addNewTask = async (taskData) => {
  try {
    const savedData = await taskSchema.create({
      ...taskData,
    });
    return savedData;
  } catch (error) {
    return error;
  }
};
const deleteTask = async (taskId, userId) => {
  console.log("task controller User Id", userId);
  console.log("task controller Task Id", taskId);

  try {
    let taskData = await taskSchema.findById(taskId);
    if (!taskData) {
      return "There is no task like this";
    } else if (taskData.userId != userId) {
      return "Not authorized to delete the task";
    } else {
      const task = {
        userId: taskData.userId,
        title: taskData.title,
        content: taskData.content,
        checkdelete: true,
      };
      let updatedData = await taskSchema.findByIdAndUpdate(
        taskId,
        {
          ...task,
        },
        { new: true }
      );
      console.log(updatedData);
      return updatedData;
    }
  } catch (error) {
    return error;
  }
};
const handleUpdateTask = async (taskId, taskData) => {
  //we set the new true because we want to get the data after update if we dont apply this it will give us the old data
  try {
    let updatedData = await taskSchema.findByIdAndUpdate(
      taskId,
      {
        ...taskData,
      },
      { new: true }
    );
    return updatedData;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllTasks,
  getUserSpecificTask,
  addNewTask,
  deleteTask,
  handleUpdateTask,
};
