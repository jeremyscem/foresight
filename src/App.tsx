import { useState } from "react";
import "./App.css";
import SelectableList from "./Components/SelectableList";
import { FormDataType } from "./utils/types";

const optionsList = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];
function App() {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    phone: "",
    selectedOptions: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectableListChange = (values: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedOptions: values,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <label htmlFor="selectedOptions">Selected Options</label>
        <SelectableList
          optionsList={optionsList}
          singleSelection={false}
          placeholder="Select option"
          onChange={handleSelectableListChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
