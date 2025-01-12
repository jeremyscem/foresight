import { render, screen } from "@testing-library/react";
import SelectableList from "./Components/SelectableList";

test("renders Deselect All button", () => {
  const mockOnChange = jest.fn();
  render(<SelectableList optionsList={[]} onChange={mockOnChange} />);

  const deselectAllButton = screen.getByText("Deselect All");
  expect(deselectAllButton).toBeInTheDocument();
});

test("displays the correct number of selected options", () => {
  const mockOnChange = jest.fn();

  // Simulate an optionsList with the correct structure
  const optionsList = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  render(<SelectableList optionsList={optionsList} onChange={mockOnChange} />);

  // Check if the text "Selected options: 0 options" is displayed (assuming none are selected initially)
  const selectedOptionsText = screen.getByText("Selected options: 0 options");
  expect(selectedOptionsText).toBeInTheDocument();
});
