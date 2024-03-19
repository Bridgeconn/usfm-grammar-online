// import FilterMarker from "./FilterSelect";
import { useEffect, useState } from "react";
import FileUploadButton from "./FileUploadButton";
import RightSourceTargetSelect from "./RightSourceTargetSelect";
import LeftSourceSelect from "./LeftSourceSelect";
import XMLViewer from "react-xml-viewer";
import axios from "axios";
// import ReactJson from "react-json-view";
import Collapse from "./Collapse";

export default function MainPage() {
  const [selectedFileOnLeft, setSelectedFileOnLeft] = useState(null);
  const selectedFileOnRight = null;
  const [fileContentOnLeft, setFileContentOnLeft] = useState("");
  const [fileContentOnRight, setFileContentOnRight] = useState("");
  const [sourceFileFormat, setSourceFileFormat] = useState({ name: "USFM" });
  const [targetFileFormat, setTargetFileFormat] = useState({ name: "USJ" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setFileContentOnRight("");
  }, [targetFileFormat]);

  const handleFileUploadOnLeft = (file) => {
    let fileAvailable = false;
    if (!(file instanceof File)) {
      console.error("Invalid file object:", file);
      return;
    }
    //  setSelectedFileOnLeft(file);
    // console.log(file.name.split(".")[1],"file")
    if (file.name.split(".")[1] === "usfm") {
      setSourceFileFormat({ name: "USFM" });
      setSelectedFileOnLeft(file);
      fileAvailable = true;
    } else if (file.name.split(".")[1] === "json") {
      alert("Sorry,currently only USFM file is supported");
      //  setSelectedFileOnLeft(file);
      // setSourceFileFormat({ name: "USJ" })
      //fileAvailable=true
    } else if (file.name.split(".")[1] === "xml") {
      //  setSelectedFileOnLeft(file);
      // setSourceFileFormat({ name: "USX" })
      //fileAvailable=true

      alert("Sorry,currently only USFM file is supported");
    }
    console.log(selectedFileOnLeft, "file");
    if (fileAvailable) {
      const reader = new FileReader();
      reader.onload = function (e) {
        // const convertedData = e.target.result.replace(/\\/g, '\\\\').split('\n').join('\n');
        setFileContentOnLeft(e.target.result);
        // console.log(convertedData,"CD")
      };
      reader.readAsText(file);
    }
    // You can perform further actions with the selected file here
  };
  // const handleFileUploadOnRight = (file) => {
  //   if (!(file instanceof File)) {
  //     console.error("Invalid file object:", file);
  //     return;
  //   }
  //   setSelectedFileOnRight(file);
  //   const reader = new FileReader();
  //   reader.onload = function (e) {
  //     setFileContentOnRight(e.target.result);
  //   };
  //   reader.readAsText(file);

  //   // You can perform further actions with the selected file here
  // };

  // const handleDownloadOnLeft = () => {
  //   if (!fileContentOnLeft) return;
  //   const blob = new Blob([fileContentOnLeft], { type: "text/plain" });
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = selectedFileOnLeft?.name || "file.txt";
  //   document.body.appendChild(a);
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  //   document.body.removeChild(a);
  // };
  const handleDownloadOnRight = () => {
    if (!fileContentOnRight) return;
    const blob = new Blob([fileContentOnRight], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    let format = targetFileFormat.name.toLowerCase();

    a.href = url;
    // a.download = selectedFileOnRight?.name || "file.txt";
    if (format === "usx") {
      a.download = "USX.xml";
    } else if (format === "usj") {
      a.download = `${sourceFileFormat.name}.json`;
    } else if (format === "table") {
      a.download = `${sourceFileFormat.name}.tsv`;
    } else if (format === "syntax-tree") {
      a.download = `${sourceFileFormat.name}-syntax-tree.txt`;
    }

    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleTextareaChangeOnLeft = (event) => {
    setFileContentOnLeft(event.target.value);
  };
  const handleTextareaChangeOnRight = (event) => {
    setFileContentOnRight(event.target.value);
  };
  const handlePutRequest = () => {
    // Data to be sent in the PUT request
    setLoading(true);
    let format = targetFileFormat.name.toLowerCase();
    const data = {
      // Your data here
      USFM: fileContentOnLeft.toString(),
    };

    // Axios PUT request
    axios
      .put(
        `https://stagingapi.vachanengine.org/v2/cms/rest/files/${sourceFileFormat.name.toLowerCase()}/to/${targetFileFormat.name.toLowerCase()}`,
        data
      )
      .then((response) => {
        // Handle successful response
        // console.log('PUT request successful:', response.data.content.toString());
        if (format === "usj") {
          setFileContentOnRight(JSON.stringify(response.data));
          setLoading(false);
        } else if (format === "table") {
          setFileContentOnRight(response.data);
          setLoading(false);
        }
        // var tableHTML = "<table class=\"table-secondary border p-2 m-1\">"
        // var rows = data.split("\n")
        // for (let row in rows) {
        //   console.log("row",rows[row])
        //   tableHTML += "<tr class=\"border\">"
        //   var cells = rows[row].split('\t')
        //   for (let cell in cells) {
        //     console.log("cell", cells[cell])
        //     tableHTML += "<td class=\"border\">"+cells[cell]+"</td>"
        //   }
        //   tableHTML += "</tr>"
        // }
        // tableHTML += "</table>"
        // outElement.innerHTML = tableHTML
        else if (format === "usx") {
          setFileContentOnRight(response.data);
          setLoading(false);

          // outElement.innerHTML = "<div class=\"text-break w-100\">"+
          //                         htmlEntities(data)+"</div>"
        } else if (format === "syntax-tree") {
          setFileContentOnRight(response.data);
          setLoading(false);

          // outElement.innerHTML = "<div class=\"text-break w-100\">"+
          //                         htmlEntities(prettySyntaxTree(data))+"</div>"
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error making PUT request:", setErrorMsg(error));
      });
  };

  return (
    <>
      <div className="h-screen min-w-48">
        <header className="bg-gray-900 py-5 h-15">
          <div className="mx-auto max-w-7xl px-4  md:px-6 lg:px-8  flex justify-center items-center">
            <h1 className="text-lg md:text-3xl font-bold  text-sky-600">
              USFM Grammar
            </h1>
          </div>
        </header>
        <main className="relative h-full md:h-5/6 md:mb-5">
          <div className="mt-5 mb-5 md:h-full md:flex justify-around  ">
            {/* card 1 */}
            <div className=" border-4 min-w-64 border-sky-600 w-11/12 ml-auto mr-auto  h-80 md:h-full md:w-3/6 md:ml-4 md:mr-0 rounded-lg overflow-hidden">
              <div className=" p-5 h-1/6 flex justify-between items-center">
                <LeftSourceSelect
                  onChange={setSourceFileFormat}
                  source={sourceFileFormat}
                />

                <div className="flex">
                  <FileUploadButton onChange={handleFileUploadOnLeft} />
                  {/* <button
                    className="ml-5 border-2 rounded-lg bg-black text-white hover:bg-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 w-10 h-10 p-1.5 "
                    // className="ml-5 cursor-pointer bg-black hover:bg-sky-600 text-white font-bold py-2 px-2 rounded"
                    onClick={handleDownloadOnLeft}
                  >
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
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                  </button> */}
                  {/* <div className=""> */}
                  {/* <h1 className="text-2xl font-bold mb-4">File Upload Example</h1> */}

                  {/* {selectedFile && (
        <div className="mt-4">
          <p className="font-semibold">Selected File:</p>
          <p>{selectedFile.name}</p>
        </div>
      )} */}
                  {/* </div> */}
                </div>
              </div>
              <div className="w-full  border-t h-5/6 p-1">
                <textarea
                  className=" w-full h-full"
                  value={fileContentOnLeft}
                  onChange={handleTextareaChangeOnLeft}
                  readOnly={!selectedFileOnLeft}
                />
              </div>
            </div>
            {/* <div className="border-3 h-72   md:h-full md:w-1/5 flex flex-col items-center justify-start border"> */}

            <div
              className="absolute hidden md:block inset-x-50 top-10 tooltip"
              data-tip="Process Data"
            >
              <button
                className="md:inline-flex text-sm justify-center items-center  border-2 border-amber-200 hover:border-sky-800 rounded rounded-full bg-white text-sky-600 hover:text-sky-800  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 w-10 h-10 p-1 "
                onClick={handlePutRequest}
              >
                {/* Process */}
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
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            <div
              className="absolute block md:hidden inset-y-68 inset-x-10 tooltip"
              data-tip="Process Data"
            >
              <button
                className="md:inline-flex text-sm justify-center items-center  border-2 border-amber-200 hover:border-sky-800 rounded rounded-full bg-white text-sky-600 hover:text-sky-800  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 w-10 h-10 p-1 "
                onClick={handlePutRequest}
                disabled={fileContentOnLeft.length < 1}
              >
                <svg
                  data-slot="icon"
                  fill="none"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  ></path>
                </svg>
              </button>
            </div>

            {/* <button className="md:hidden inline-flex text-sm items-center ml-5 border-2 rounded bg-sky-600 text-white hover:bg-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 w-24 h-10 p-1 ">
                Process
                <svg
                  data-slot="icon"
                  fill="none"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  ></path>
                </svg>
              </button>
              {targetFileFormat.name.toLowerCase()==="usj" && (
                <>
              <div className="mt-10 border-2 ">
                <MarkerSelector />
              </div>
              <div className="mt-10">
                {" "}
        
              </div></>)} */}
            {/* </div> */}

            {/* card 2 */}
            <div className=" border-4 min-w-64 border-sky-600 w-11/12 ml-auto mr-auto h-80 md:h-full md:w-3/6 md:ml-0 md:mr-4 rounded-lg overflow-hidden">
              <div className=" p-5 h-1/6 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="ml-10">
                    <div className="text-xs sm:text-xs text-sky-600 text-left h-3">
                      target
                    </div>
                    <RightSourceTargetSelect
                      onChange={setTargetFileFormat}
                      source={sourceFileFormat}
                    />
                  </div>
                  {/* <div className="flex sm:flex-wrap sm:justify-center"> */}

                  {/* Copy to source */}
                  {/* <button className="inline-flex text-xs items-center ml-5 border-2 rounded bg-sky-600 text-white md:text-sm justify-center hover:bg-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 w-15 h-10 p-1">
                    <svg
                      className="h-5 w-5"
                      data-slot="icon"
                      fill="none"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                      ></path>
                    </svg>
                    Copy to Source
                  </button> */}
                </div>
                {/* </div> */}
                <div className="flex">
                  {/* <FileUploadButton onChange={handleFileUploadOnRight} /> */}

                  <button
                    className="ml-1 md:mr-10 border-2 rounded-lg bg-black text-white hover:bg-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 w-10 h-10 p-1.5 "
                    onClick={handleDownloadOnRight}
                  >
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
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className=" border-t w-full  h-5/6 overflow-y-auto p-1 bg-gray-200">
                {loading ? (
                  <div className="h-full w-full flex items-center justify-center">
                    Loading...
                  </div>
                ) : targetFileFormat.name.toLowerCase() === "usx" ? (
                  <XMLViewer
                    className=" w-full h-full"
                    xml={fileContentOnRight}
                    collapsible
                  />
                ) : (
                  <textarea
                    className=" w-full h-full bg-gray-200"
                    value={fileContentOnRight}
                    onChange={handleTextareaChangeOnRight}
                    readOnly={!selectedFileOnRight}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
        <Collapse msg={errorMsg} />

        <div className="h-5"></div>
      </div>
    </>
  );
}
