import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(1);

  const debounce = (func, delay) => {
    let timeoutId = null;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleChange = (e) => {
    setCount((prev) => prev + 1);
    console.log(e.target.value, count);
  };

  return (
    <div>
      <input
        placeholder="Search here"
        onChange={debounce(handleChange, 1000)}
      />
    </div>
  );
}

export default App;
