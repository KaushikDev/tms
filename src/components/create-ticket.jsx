import { useState } from "react";

const CreateTicket = () => {
  const [title, setNewTitle] = useState("sds");
  const [description, setNewDescription] = useState("asdf");
  const [selectedDepartment, setNewDepartment] = useState("Unknown");

  const [recentTickets, setRecentTickets] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("This form was submitted!!");
    setRecentTickets((prev) => [
      ...prev,
      { title, description, selectedDepartment },
    ]);
  };
  console.log(recentTickets);
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Title{" "}
          <input
            type="text"
            value={title}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </label>
        <label>
          Description{" "}
          <input
            type="text"
            value={description}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </label>
        <label>
          Department{" "}
          <select
            value={selectedDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
          >
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="DevOps">DevOps</option>
            <option value="Admin">Admin</option>
            <option value="Unknown">I am not sure</option>
          </select>
        </label>
        <button type="submit">Save Ticket</button>
      </form>
    </div>
  );
};

export default CreateTicket;
