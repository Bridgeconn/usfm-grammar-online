// import FilterMarker from "./FilterSelect";
import React, { useEffect, useState } from "react";
import FileUploadButton from "./FileUploadButton";
import RightSourceTargetSelect from "./RightSourceTargetSelect";
import LeftSourceSelect from "./LeftSourceSelect";
import CheckboxList from "./CheckboxList";
import MarkerSelector from "./MarkerSelector";
import XMLViewer from "react-xml-viewer";
import axios from "axios";
// import ReactJson from "react-json-view";
import Collapse from "./Collapse";

export default function MainPage() {
  const [selectedFileOnLeft, setSelectedFileOnLeft] = useState(null);
  const [selectedFileOnRight, setSelectedFileOnRight] = useState(null);
  const defaultValue =
    "\\id hab 45HABGNT92.usfm, Good News Translation, June 2003\n\\c 3\n \\s1 A Prayer of Habakkuk\n \\p\n \\v 1 This is a prayer of the prophet Habakkuk:\n \\b\n \\q1\n \\v 2 O \nd Lord\nd*, I have heard of what you have done,\n \\q2 and I am filled with awe.\n \\q1 Now do again in our times\n \\q2 the great deeds you used to do.\n \\q1 Be merciful, even when you are angry.";
  const [fileContentOnLeft, setFileContentOnLeft] = useState(defaultValue);
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
    // console.log(selectedFileOnLeft,"file")
    if (fileAvailable) {
      const reader = new FileReader();
      reader.onload = function (e) {

        setFileContentOnLeft(e.target.result);
      };
      reader.readAsText(file);
    }
    // You can perform further actions with the selected file here
  };

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
    // const token = "VaChAn#CMS#1903";
    const token='';
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    // Axios PUT request
    axios
      .put(
        `https://stagingapi.vachanengine.org/v2/cms/rest/files/${sourceFileFormat.name.toLowerCase()}/to/${targetFileFormat.name.toLowerCase()}`,
        data,
        config
      )
      .then((response) => {
        // Handle successful response
        // console.log('PUT request successful:', response.data.content.toString());
        setErrorMsg("Successfully converted");
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
        setLoading(false);
      });
  };

  return (
    <>
      <div className="h-screen min-w-48">
        <header className="bg-gray-900 py-5 h-15">
    
          <div className="     flex justify-between items-center">
            <div className="flex-1">
              <img
                alt="logo"
                src="https://usfm-grammar-revant.netlify.app/static/media/logo.de983c09.png"
                height={100}
                width={192}
                style={{ backgroundColor: "white" }}
              />
            </div>{" "}
            <div className="flex-1">
              {" "}
              <h1 className="text-lg md:text-3xl font-bold  text-sky-600  text-center">
                USFM Grammar
              </h1>
            </div>
            <div className="flex-1">
              {" "}
              <p className="text-base md:text-2xl font-bold text-emerald-50	text-right mr-5">
                V3.0.0{" "}
              </p>
            </div>
          </div>
        </header>
        <main className="relative  md:h-3/4">
          <div className="mt-2 mb-5 md:h-full md:flex justify-around  ">
            {/* card 1 */}
            <div className=" border-4 min-w-64 border-sky-600 w-11/12 ml-auto mr-auto mt-7 md:mt-0 h-96 md:h-full md:w-3/6 md:ml-4 md:mr-0 rounded-lg overflow-hidden">
            
            <div className=" p-5  h-1/5 md:h-1/6 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="ml-10">
                    <div className="text-xs sm:text-xs text-sky-600 text-left h-3">
                      source
                    </div>
                    <LeftSourceSelect
                      onChange={setSourceFileFormat}
                      source={sourceFileFormat}
                    />
                  </div>
                </div>
                {/* </div> */}
                <div className="flex">
                  {/* <FileUploadButton onChange={handleFileUploadOnRight} /> */}

                  <FileUploadButton onChange={handleFileUploadOnLeft} />

                </div>
              </div>
            
            
              {/* <div className=" p-5 h-1/5 md:h-1/6 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="ml-10">
                    <div className="text-xs sm:text-xs text-sky-600 text-left h-3">
                      source
                    </div>

                    <LeftSourceSelect
                      onChange={setSourceFileFormat}
                      source={sourceFileFormat}
                    />
                  </div>
                </div>
                <div className="flex">
                  <FileUploadButton onChange={handleFileUploadOnLeft} />
                </div>
              </div> */}
              <div className="w-full  border-t h-4/5 p-1">
                <textarea
                  className=" w-full h-full text-sm "
                  value={fileContentOnLeft}
                  onChange={handleTextareaChangeOnLeft}
                  defaultValue={defaultValue}

                  // readOnly={!selectedFileOnLeft}
                />
              </div>
            </div>
            {/* <div className="border-3 h-72   md:h-full md:w-1/5 flex flex-col items-center justify-start border"> */}

            <div
              className="absolute hidden md:block md:top-10  tooltip"
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
              className="absolute block md:hidden  top-96 inset-x-10 tooltip"
              data-tip="Process Data"
            >
              <button
                className="md:inline-flex text-sm justify-center  items-center  border-2 border-amber-200 hover:border-sky-800 rounded rounded-full bg-white text-sky-600 hover:text-sky-800  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 w-10 h-10 p-1 "
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

            {/* card 2 */}
            <div className=" border-4 min-w-64 border-sky-600 w-11/12 ml-auto mr-auto mt-10 md:mt-0 h-96 md:h-full md:w-3/6 md:ml-0 md:mr-4 rounded-lg overflow-hidden">
              <div className=" p-5  h-1/5 md:h-1/6 flex justify-between items-center">
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
              <div className=" border-t w-full  h-4/5  p-1 ">
                {loading ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <span className="loading loading-bars loading-lg"></span>
                  </div>
                ) : targetFileFormat.name.toLowerCase() === "usx" ? (
                  <div className=" w-full  h-full  p-1 bg-gray-200 overflow-y-auto">
                    <XMLViewer
                      className=" w-full h-full "
                      xml={fileContentOnRight}
                      collapsible
                    />
                  </div>
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
        <div>
          <Collapse error={errorMsg} />
        </div>
        {/* <div className="h-5"></div> */}
      </div>
    </>
  );
}
