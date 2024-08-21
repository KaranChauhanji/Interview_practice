const TodoModel = require("../../model/todo.model");

const addTodo = async (req, res) => {
  const todo = req.body;

  try {
    const newTodo = new TodoModel(todo);
    await newTodo.save();

    res.status(200).send({ message: "New todo added", todo: todo });
  } catch (error) {
    res.status(500).send({ message: `Error in adding todo: ${error.message}` });
  }
};

module.exports = addTodo;
