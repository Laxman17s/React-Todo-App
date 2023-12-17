import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import deleteIcon from "./remove-icon.png";

const BASE_URL = "http://localhost:8000/api";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const getTodos = () => {
    axios
      .get(`${BASE_URL}/todos`)
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleAddTodo = () => {
    if (todo !== "") {
      axios
        .post(`${BASE_URL}/todo/new`, {
          title: todo,
        })
        .then((res) => {
          setTodos([...todos, res.data]);
          setTodo("");
        })
        .catch((err) => console.log(err));
    } else {
      alert("Todo can not be empty");
    }
  };

  const handleDeleteTodo = (id) => {
    axios
      .delete(`${BASE_URL}/todo/delete/${id}`)
      .then((res) => {
        // setTodos(todos.filter((todo) => todo._id !== res.data._id));
        setTodos(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleToggleTodo = (id) => {
    //  e.preventDefault();
    axios
      .get(`${BASE_URL}/todo/${id}`)
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <h1 style={{ color: "green" }}>Simple TODO App</h1>
      <div className="todo_input">
        <input
          name="todo"
          className="todo_input_bar"
          value={todo}
          placeholder="Add new Todo..."
          onChange={(e) => setTodo(e.target.value)}
        />
        <div className="add_button" onClick={handleAddTodo}>
          +
        </div>
      </div>

      <div className="todos_list">
        {!todos || !todos.length ? (
          <h3 style={{ textAlign: "center" }}>No Todo Data! </h3>
        ) : (
          todos.map((todo) => {
            //  eslint-disable-next-line array-callback-return
            return (
              <div className="todo" key={todo.id}>
                <span
                  onClick={() => handleToggleTodo(todo._id)}
                  className={todo.complete ? "complete" : ""}
                  id="todo_title"
                >
                  {todo.title}
                </span>
                <span
                  className="delete"
                  onClick={() => handleDeleteTodo(todo._id)}
                >
                  <img
                    src={deleteIcon}
                    alt="delte"
                    height="20px"
                    width="20px"
                  />
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
