import PropTypes from "prop-types";

const FileUploadButton = ({ onChange }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onChange(file);
  };

  return (
    <label className="mr-10 border-2 rounded-lg bg-black text-white hover:bg-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 w-10 h-10 p-1.5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        className="main-grid-item-icon"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" x2="12" y1="3" y2="15" />
      </svg>
      <input
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept=".json, .usfm, .xml ,"
      />
    </label>
  );
};
FileUploadButton.propTypes = {
  onChange: PropTypes.func.isRequired,
};
export default FileUploadButton;
