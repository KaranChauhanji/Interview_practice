import { useReducer } from "react";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

const initialValue = {
  title: "",
  description: "",
  priority: "",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "Title":
      return { ...state, title: payload };
    case "Description":
      return { ...state, description: payload };
    case "Priority":
      return { ...state, priority: payload };
    case "EditTodo":
      return payload;
    case "Reset":
      return initialValue;

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const [todo, setTodo] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const savedTodo = JSON.parse(localStorage.getItem("todo"));
    if (savedTodo) {
      setTodo(savedTodo);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      // 3 todos => 2nd todo is i want to edit
      // editId => id of 2nd todo
      // updatedTodos = [1,2nd todo with new edited data,3]
      // [1]
      const updatedTodos = todo.map((el) => {
        if (el.id == editId) {
          return state;
        }
        return el;
      });
      setTodo(updatedTodos);
      setEditId(null);
    } else {
      const newTodo = { ...state, id: Date.now().toString() };
      setTodo((prev) => [...prev, newTodo]);
    }
    dispatch({ type: "Reset" });
  };

  const handleDelete = (id) => {
    setTodo((prevTodo) => prevTodo.filter((elem) => elem.id !== id));
  };

  const handleEdit = (id) => {
    const todoEdit = todo.find((elem) => elem.id == id);
    console.log(todoEdit);

    if (todoEdit) {
      dispatch({ type: "EditTodo", payload: todoEdit });
      setEditId(id);
    }
  };

  return (
    <>
      <form style={{ display: "grid", gap: "12px" }} onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          placeholder="title"
          value={state.title}
          style={{ padding: "8px" }}
          onChange={(e) => dispatch({ type: "Title", payload: e.target.value })}
        />
        <label>Description</label>
        <input
          placeholder="description"
          style={{ padding: "8px" }}
          value={state.description}
          onChange={(e) =>
            dispatch({ type: "Description", payload: e.target.value })
          }
        />
        <label>Priority</label>
        <select
          value={state.priority}
          style={{ padding: "8px" }}
          onChange={(e) =>
            dispatch({ type: "Priority", payload: e.target.value })
          }
        >
          <option>Choose</option>
          <option value={"low"}>Low</option>
          <option value={"medium"}>Medium</option>
          <option value={"high"}>High</option>
        </select>
        <button style={{ border: "1px solid black" }} type="submit">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "12px",
          marginTop: "30px",
        }}
      >
        {todo?.map((elem) => (
          <div
            key={elem.id}
            style={{ padding: "20px", border: "1px solid black" }}
          >
            <h3>{elem.title}</h3>
            <p>{elem.description}</p>
            <p>{elem.priority}</p>
            <button onClick={() => handleDelete(elem.id)}>Delete</button>
            <button onClick={() => handleEdit(elem.id)}>Edit</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
