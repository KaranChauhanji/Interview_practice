const TodoModel = require("../../model/todo.model");

const getTodo = async (req, res) => {
  try {
    const todo = await TodoModel.find();
    res.status(200).send(todo)
  } catch (error) {
    res
      .status(500)
      .send({ message: `Error in getting Todo: ${error.message}` });
  }
};

module.exports = getTodo
