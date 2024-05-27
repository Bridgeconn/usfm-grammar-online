/** @format */

import { useState } from "react";
import Select from "react-select";

const customStyles = {
	control: (provided, state) => ({
		...provided,
		borderRadius: "6px", // Set border radius as desired
		width: "256px",
		maxHeight: "40px",
	}),
	valueContainer: (provided) => ({
		...provided,
		backgroundColor: "rgb(229 231 235);",
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
	{ value: "TEXT", label: "TEXT" },
	{ value: "IDE", label: "IDE" },
	{ value: "USFM", label: "USFM" },
	{ value: "H", label: "H" },
	{ value: "TOC", label: "TOC" },
	{ value: "TOCA", label: "TOCA" },
	{ value: "IMT", label: "IMT" },
	{ value: "IS", label: "IS" },
	{ value: "IP", label: "IP" },
	{ value: "IPI", label: "IPI" },
	{ value: "IM", label: "IM" },
	{ value: "IMI", label: "IMI" },
	{ value: "IPQ", label: "IPQ" },
	{ value: "IMQ", label: "IMQ" },
	{ value: "IPR", label: "IPR" },
	{ value: "IQ", label: "IQ" },
	{ value: "IB", label: "IB" },
	{ value: "ILI", label: "ILI" },
	{ value: "IOT", label: "IOT" },
	{ value: "IO", label: "IO" },
	{ value: "IEX", label: "IEX" },
	{ value: "IMTE", label: "IMTE" },
	{ value: "IE", label: "IE" },
	{ value: "MT", label: "MT" },
	{ value: "MTE", label: "MTE" },
	{ value: "CL", label: "CL" },
	{ value: "CD", label: "CD" },
	{ value: "MS", label: "MS" },
	{ value: "MR", label: "MR" },
	{ value: "S", label: "S" },
	{ value: "SR", label: "SR" },
	{ value: "R", label: "R" },
	{ value: "D", label: "D" },
	{ value: "SP", label: "SP" },
	{ value: "SD", label: "SD" },
	{ value: "STS", label: "STS" },
	{ value: "REM", label: "REM" },
	{ value: "LIT", label: "LIT" },
	{ value: "RESTORE", label: "RESTORE" },
	{ value: "P", label: "P" },
	{ value: "M", label: "M" },
	{ value: "PO", label: "PO" },
	{ value: "PR", label: "PR" },
	{ value: "CLS", label: "CLS" },
	{ value: "PMO", label: "PMO" },
	{ value: "PM", label: "PM" },
	{ value: "PMC", label: "PMC" },
	{ value: "PMR", label: "PMR" },
	{ value: "PI", label: "PI" },
	{ value: "MI", label: "MI" },
	{ value: "NB", label: "NB" },
	{ value: "PC", label: "PC" },
	{ value: "PH", label: "PH" },
	{ value: "Q", label: "Q" },
	{ value: "QR", label: "QR" },
	{ value: "QC", label: "QC" },
	{ value: "QA", label: "QA" },
	{ value: "QM", label: "QM" },
	{ value: "QD", label: "QD" },
	{ value: "LH", label: "LH" },
	{ value: "LI", label: "LI" },
	{ value: "LF", label: "LF" },
	{ value: "LIM", label: "LIM" },
	{ value: "LITL", label: "LITL" },
	{ value: "TR", label: "TR" },
	{ value: "TC", label: "TC" },
	{ value: "TH", label: "TH" },
	{ value: "TCR", label: "TCR" },
	{ value: "THR", label: "THR" },
	{ value: "TABLE", label: "TABLE" },
	{ value: "B", label: "B" },
	{ value: "ADD", label: "ADD" },
	{ value: "BK", label: "BK" },
	{ value: "DC", label: "DC" },
	{ value: "IOR", label: "IOR" },
	{ value: "IQT", label: "IQT" },
	{ value: "K", label: "K" },
	{ value: "LITL", label: "LITL" },
	{ value: "ND", label: "ND" },
	{ value: "ORD", label: "ORD" },
	{ value: "PN", label: "PN" },
	{ value: "PNG", label: "PNG" },
	{ value: "QAC", label: "QAC" },
	{ value: "QS", label: "QS" },
	{ value: "QT", label: "QT" },
	{ value: "RQ", label: "RQ" },
	{ value: "SIG", label: "SIG" },
	{ value: "SLS", label: "SLS" },
	{ value: "TL", label: "TL" },
	{ value: "WJ", label: "WJ" },
	{ value: "EM", label: "EM" },
	{ value: "BD", label: "BD" },
	{ value: "BDIT", label: "BDIT" },
	{ value: "IT", label: "IT" },
	{ value: "NO", label: "NO" },
	{ value: "SC", label: "SC" },
	{ value: "SUP", label: "SUP" },
	{ value: "RB", label: "RB" },
	{ value: "PRO", label: "PRO" },
	{ value: "W", label: "W" },
	{ value: "WH", label: "WH" },
	{ value: "WA", label: "WA" },
	{ value: "WG", label: "WG" },
	{ value: "LIK", label: "LIK" },
	{ value: "LIV", label: "LIV" },
	{ value: "JMP", label: "JMP" },
	{ value: "F", label: "F" },
	{ value: "FE", label: "FE" },
	{ value: "EF", label: "EF" },
	{ value: "EFE", label: "EFE" },
	{ value: "X", label: "X" },
	{ value: "EX", label: "EX" },
	{ value: "FR", label: "FR" },
	{ value: "FT", label: "FT" },
	{ value: "FK", label: "FK" },
	{ value: "FQ", label: "FQ" },
	{ value: "FQA", label: "FQA" },
	{ value: "FL", label: "FL" },
	{ value: "FW", label: "FW" },
	{ value: "FP", label: "FP" },
	{ value: "FV", label: "FV" },
	{ value: "FDC", label: "FDC" },
	{ value: "XO", label: "XO" },
	{ value: "XOP", label: "XOP" },
	{ value: "XT", label: "XT" },
	{ value: "XTA", label: "XTA" },
	{ value: "XK", label: "XK" },
	{ value: "XQ", label: "XQ" },
	{ value: "XOT", label: "XOT" },
	{ value: "XNT", label: "XNT" },
	{ value: "XDC", label: "XDC" },
	{ value: "ESB", label: "ESB" },
	{ value: "CAT", label: "CAT" },
	{ value: "ID", label: "ID" },
	{ value: "C", label: "C" },
	{ value: "V", label: "V" },
	{ value: "TEXT-IN-EXCLUDED-PARENT", label: "TEXT-IN-EXCLUDED-PARENT" },
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
		<div className="ml-2 md:ml-4 mt-0.5">
			<Select
				value={selectedOptions}
				onChange={handleChange}
				options={filteredOptions}
				isMulti
				styles={customStyles}
			/>
		</div>
	);
}
