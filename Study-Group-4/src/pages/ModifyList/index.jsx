import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskInput } from "../../components/Input";
import { Button } from "../../components/Button";

export const ModifyTodoList = () => {
  const navigate = useNavigate();
  const { editId } = useParams();

  let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let editIndex = -1;

  if (editId) {
    editIndex = allTasks.findIndex(
      item => item.id === Number(editId)
    );
  }
  
  const [task, setTask] = useState({
    heading: allTasks[editIndex]?.heading || "",
    description: allTasks[editIndex]?.description || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedTasks;

    if (editId) {
      // ubah task yang sudah ada di local storage
      allTasks[editIndex].heading = task.heading;
      allTasks[editIndex].description = task.description;

      // Update task dengan array
      updatedTasks = [...allTasks];
    } else {
      // task baru
      const newTask = {
        id: Date.now(),
        heading: task.heading,
        description: task.description,
        createdAt: Date.now(),
      };

      // Update task dengan array
      updatedTasks = [...allTasks, newTask];
    }

    // save update
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // navigate ke todolist
    navigate("/");
  };

  const isFormValid =
    task.heading.trim() !== "" && task.description.trim() !== "";

  const title = editId ? "Edit" : "Add New";

  return (
    <div className="m-12 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">{title} Task</h2>
      <form onSubmit={handleSubmit}>
        {/* Heading Input */}
        <TaskInput
          name="heading"
          label="Heading"
          value={task.heading}
          onChange={handleInputChange}
          placeholder="Please Input Heading"
        />
        {/* Description Input */}
        <TaskInput
          name="description"
          label="Description"
          value={task.description}
          onChange={handleInputChange}
          placeholder="Please Input Description"
        />
        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            color="red"
            message="Cancel"
            onClick={() => navigate("/")}
          />
          <Button
            type="submit"
            color="green"
            message="Save"
            disabled={!isFormValid}
          />
        </div>
      </form>
    </div>
  );
};
