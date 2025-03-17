import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskInput } from "../../components/Input";
import { Button } from "../../components/Button";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useEffect } from "react";

export const EditTodoList = () => {
  const navigate = useNavigate();
  const { editId } = useParams();
  
  const [task, setTask] = useState({
    heading: "",
    description: "",
  });

  useEffect(() => {
    const getEditData = async() => {
      const docsRef = doc(db, "todos", editId.toString());
      const query = await getDoc(docsRef);
      return query.data();
    }
    getEditData().then((data) => setTask(data)).catch((err) => console.error(err));
  }, [editId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // task baru
    const newTask = {
      heading: task.heading,
      description: task.description,
    };

    // memasukkan task baru
    updateDoc(doc(db, "todos", editId.toString()), newTask).catch((err) => console.error(err));

    // navigate ke todolist
    navigate("/");
  };

  const isFormValid =
    task.heading.trim() !== "" && task.description.trim() !== "";

  return (
    <div className="m-12 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Edit Task</h2>
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
