import { useEffect, useRef, useState } from "react";
import "./selectableList.css";
interface SelectableListProps {
  optionsList: { label: string; value: string }[];
  singleSelection?: boolean;
  placeholder?: string;
  onChange: (values: string[]) => void;
}

const SelectableList = ({
  optionsList,
  singleSelection,
  placeholder,
  onChange,
}: SelectableListProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleCheckboxChange = (value: string) => {
    const newSelectedOptions = singleSelection
      ? [value]
      : selectedOptions.includes(value)
      ? selectedOptions.filter((item) => item !== value)
      : [...selectedOptions, value];

    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleSelectAll = () => {
    setSelectedOptions(
      selectedOptions.length === optionsList.length
        ? []
        : optionsList.map((item) => item.value)
    );
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div ref={dropdownRef} style={{ position: "relative", width: "200px" }}>
      <div className="selectable-list" onClick={toggleDropdown}>
        {singleSelection && selectedOptions.length === 0
          ? placeholder
          : singleSelection
          ? optionsList.find((item) => selectedOptions.includes(item.value))
              ?.label
          : `Selected options: ${selectedOptions.length} options`}
      </div>
      {isOpen && !singleSelection && (
        <div
          className="selectable-list-ul-container"
          style={{
            maxHeight: "150px",
            overflowY: "auto",
          }}
        >
          <ul className="selectable-list-ul">
            {optionsList.map((item) => (
              <li key={item.value}>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(item.value)}
                  onChange={() => handleCheckboxChange(item.value)}
                />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
      {isOpen && singleSelection && (
        <div className="selectable-list-ul-container">
          <ul className="selectable-list-ul">
            {optionsList.map((item) => (
              <li
                style={{
                  padding: "5px 0",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setIsOpen(false);
                  setSelectedOptions([item.value]);
                }}
                key={item.value}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!singleSelection && (
        <button type="button" onClick={handleSelectAll}>
          {selectedOptions.length === optionsList.length
            ? "Deselect All"
            : "Select All"}
        </button>
      )}
    </div>
  );
};

export default SelectableList;
