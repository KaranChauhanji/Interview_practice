const TodoModel = require("../../model/todo.model");

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(id);

    res
      .status(200)
      .send({ message: `Deleting Todo Successful.`, todo: deletedTodo });
  } catch (error) {
    res
      .status(500)
      .send({ message: `Error in deleting Todo: ${error.message}` });
  }
};

module.exports = deleteTodo;
