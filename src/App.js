import { useEffect, useState } from "react";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const check=(key)=>{
  if(localStorage.getItem(key)){
    return JSON.parse(localStorage.getItem(key))
  }else 
  return []
}

function App() {

  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState(check("todos"));
  const [completeTodos, setCompleteTodos] = useState(check("completedTodos"));

  const notify = () => {
    toast.success("Task Added Successfully");
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (newItem === "") {
      toast.error("Task Can't Be Blank");
    } else {
      notify();

      setTodos([
        ...todos,
        {
          id: crypto.randomUUID(),
          title: newItem,
        },
      ]);
      setNewItem("");
    }
  };

  const deleteTodo = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
    toast.info("Task Deleted");
  };

  const completedTodo = (id, title) => {
    setCompleteTodos([
      ...completeTodos,
      {
        id: id,
        title: title,
      },
    ]);
    setTodos((todos) => {
      return todos.filter((todo) => todo.id !== id);
    });
    toast.success("Task Marked Completed");
  };

  const removecompleted = (id) => {
    setCompleteTodos((completetodos) => {
      return completetodos.filter((todo) => todo.id !== id);
    });
    toast.info("Task Deleted");
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  useEffect(() => {
    localStorage.setItem("completedTodos", JSON.stringify(completeTodos));
  }, [completeTodos]);

  return (
    <div className="App">
      <div className="left">
        <div>
          <form onSubmit={addTodo} className="form">
            <label htmlFor="item">Please Add The Task Item Below</label>
            <div className="addfield">
              <input
                type="text"
                id="item"
                value={newItem}
                onChange={(e) => {
                  setNewItem(e.target.value);
                }}
              />
              <button type="submit" className="add">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="right">
        <h4>ToDo Tasks:</h4>
        <div className="todo">
          {todos.map((todo, index) => {
            return (
              <div className="todoCard" key={todo.id}>
                <div className="task">
                  <p>{todo.title}</p>
                </div>
                <div className="actions">
                  <button
                    className="completed"
                    onClick={() =>
                      completedTodo(todo.id, todo.title)
                    }
                  >
                    Completed
                  </button>
                  <button
                    className="delete"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <h4>Completed Tasks:</h4>
        <div className="complete">
          {completeTodos.map((completetodo, index) => {
            return (
              <div className="completeCard" key={completetodo.id}>
                <div className="task">
                  <p>{completetodo.title}</p>
                </div>
                <div className="actions">
                  <button
                    className="delete"
                    onClick={() => removecompleted(completetodo.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
