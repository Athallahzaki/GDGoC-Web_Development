import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TodoList } from "./pages/TodoList";
import { ModifyTodoList } from "./pages/ModifyList";
// import { AddTodoList } from "./pages/AddList";
// import { EditTodoList } from "./pages/EditList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoList />}></Route>
        <Route path="/add" element={<ModifyTodoList />}></Route>
        <Route path="/edit/:editId" element={<ModifyTodoList />}></Route>
        {/* <Route path="/add" element={<AddTodoList />}></Route>
        <Route path="/edit/:editId" element={<EditTodoList />}></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
