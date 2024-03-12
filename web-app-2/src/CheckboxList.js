import React, { useState } from "react";

const CheckboxList = () => {
  // State to manage checkbox items and visibility

  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: "BOOK_HEADERS", checked: false },
    { id: 2, label: "TITLES", checked: false },
    { id: 3, label: "COMMENTS", checked: false },
    { id: 4, label: "PARAGRAPHS", checked: false },
    { id: 5, label: "CHARACTERS", checked: false },
    { id: 6, label: "NOTES", checked: false },
    { id: 7, label: "STUDY_BIBLE", checked: false },
    { id: 8, label: "BCV", checked: false },
    { id: 9, label: "TEXT", checked: false },
     ]);
  const [isVisible, setIsVisible] = useState(false);

  // Toggle visibility of checkbox list
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Handle checkbox state change
  const handleCheckboxChange = (id) => {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  return (
    <div className="w-40">
      <button
        className="bg-sky-600 w-full shadow-md text-white px-4 py-2 rounded-md mb-2 text-sm  text-center flex items-center justify-center space-x-2"
        onClick={toggleVisibility}
      >
        {isVisible ? (
          <>
            <span>filters</span>
            <svg
              data-slot="icon"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="h-4 w-4 inline-flex" 
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              ></path>
            </svg>
          </>
        ) : (
          <>
            <span>filters</span>
            <svg
              data-slot="icon"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="h-4 w-4" 
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              ></path>
            </svg>{" "}
          </>
        )}
      </button>
      {isVisible && (
        <div className="border border-gray-300 p-2 rounded-md ">
          {checkboxes.map((checkbox) => (
            <div key={checkbox.id} className="flex items-center mb-1 bg-white">
              <input
                type="checkbox"
                id={`checkbox-${checkbox.id}`}
                checked={checkbox.checked}
                onChange={() => handleCheckboxChange(checkbox.id)}
                className="mr-2 z-10 "
              />
              <label htmlFor={`checkbox-${checkbox.id}`} className="z-10 text-sm">
                {checkbox.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxList;
