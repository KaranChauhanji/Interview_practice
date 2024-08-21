const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: 
    {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
});

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = TodoModel;
