const TodoModel = require("../../model/todo.model");

const editTodo = async (req, res) => {
  const todo = req.body;
  const { id } = req.params;

  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(id, todo, {
      new: true,
    });

    if (!updatedTodo) {
      res.status(404).send({ message: "Unable to find ID." });
    }

    res
      .status(200)
      .send({ message: `Updated Successfully.`, todo: updatedTodo });
  } catch (error) {
    res
      .status(500)
      .send({ message: `Error in editing todo: ${error.message}` });
  }
};

module.exports = editTodo;
