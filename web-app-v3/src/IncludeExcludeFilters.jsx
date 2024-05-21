/** @format */

import { useState } from "react";
import Select from "react-select";

const customStyles = {
	control: (provided, state) => ({
		...provided,
		borderRadius: "8px", // Set border radius as desired
	}),
};
const options = [
	{ value: "", label: "All" },
	{ value: "BOOK_HEADERS", label: "BOOK_HEADERS" },
	{ value: "TITLES", label: "TITLES" },
	{ value: "COMMENTS", label: "COMMENTS" },
	{ value: "PARAGRAPHS", label: "PARAGRAPHS" },
	{ value: "CHARACTERS", label: "CHARACTERS" },
	{ value: "NOTES", label: "NOTES" },
	{ value: "STUDY_BIBLE", label: "STUDY_BIBLE" },
	{ value: "BCV", label: "BCV" },
	{ value: "TEXT", label: "TEXT" },
];

export default function IncludeExcludeFilter({ onChange }) {
	const [selectedOptions, setSelectedOptions] = useState([options[0]]); // "All" as default selected value

	const handleChange = (selectedOption) => {
		const lastSelectedOption = selectedOption[selectedOption.length - 1];
		if (lastSelectedOption && lastSelectedOption.value === "") {
			// If "All" option is selected, set all options except "All" as selected
			setSelectedOptions(options.slice(0, 1)); // Select only "All"
			onChange(options.slice(0, 1));
		} else {
			// If any other option is selected, remove "All" option from selected list
			setSelectedOptions(
				selectedOption.filter((option) => option.value !== "")
			);
			onChange(selectedOption.filter((option) => option.value !== ""));
		}
	};

	// Include the "All" option in filtered options if it's not selected
	const filteredOptions = selectedOptions.some((option) => option.value === "")
		? options.slice(1)
		: options;

	return (
		<div className="ml-4 mt-0.5">
			<Select
				value={selectedOptions}
				onChange={handleChange}
				options={filteredOptions}
				isMulti
				styles={customStyles}
				width={200}
			/>
		</div>
	);
}
