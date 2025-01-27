/** @format */

import { useCallback, useEffect, useRef, useState } from "react";
import FileUploadButton from "./FileUploadButton";
import RightSourceTargetSelect from "./RightSourceTargetSelect";
import LeftSourceSelect from "./LeftSourceSelect";
import XMLViewer from "react-xml-viewer";
import { DOMParser } from 'xmldom';
import { Tab } from "@headlessui/react";
import Collapse from "./Collapse";
import { CopyToClipboard } from "react-copy-to-clipboard";
import AboutUs from "./AboutUs";
import { JsonViewer } from "@textea/json-viewer";
import IncludeExclude from "./IncludeExclude";
import IncludeExcludeFilter from "./IncludeExcludeFilters";
import Drawer from "./myDrawer";
import TableViewer from "./TableViewer";

import {USFMParser, Filter, Validator } from 'usfm-grammar-web';

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function MainPage() {
	const defaultValue =
		"\\id hab 45HABGNT92.usfm, Good News Translation, June 2003\n\\c 3\n \\s1 A Prayer of Habakkuk\n \\p\n \\v 1 This is a prayer of the prophet Habakkuk:\n \\b\n \\q1\n \\v 2 O \\nd Lord\\nd*, I have heard of what you have done,\n \\q2 and I am filled with awe.\n \\q1 Now do again in our times\n \\q2 the great deeds you used to do.\n \\q1 Be merciful, even when you are angry.";
	const [fileContentOnLeft, setFileContentOnLeft] = useState(defaultValue);
	const [fileContentOnRight, setFileContentOnRight] = useState("");
	const [sourceFileFormat, setSourceFileFormat] = useState({name :"USFM"});
	const [targetFileFormat, setTargetFileFormat] = useState({ name: "USJ" });
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const divRef = useRef(null);
	const [filters, setFilters] = useState([{ value: "", label: "All" }]);
	const [type, setType] = useState({ name: "Include_Markers" });
	const [status, setStatus] = useState("");
	const [openLeft, setOpenLeft] = useState(false);

	const onCopy = useCallback(() => {
		setCopied(true);
	}, []);

	const [copied, setCopied] = useState(false);

	const scrollToDiv = () => {
		divRef.current.scrollIntoView({ behavior: "smooth" });
	};
	useEffect(() => {
		setFileContentOnRight("");
		setErrorMsg("");
		setCopied(false);
	}, [targetFileFormat]);

	useEffect(() => {
		// if (sourceFileFormat.name !== "USFM") {
		// 	setFileContentOnLeft("");
		// }
		setFileContentOnRight("");
		setErrorMsg("");
		setCopied(false);
	}, [sourceFileFormat]);

	

	useEffect(() => {
	  const initializeParser = async () => {
	    await USFMParser.init(
	      "https://cdn.jsdelivr.net/npm/usfm-grammar-web@3.0.0/tree-sitter-usfm.wasm",
	      "https://cdn.jsdelivr.net/npm/usfm-grammar-web@3.0.0/tree-sitter.wasm"
	    );
	    console.log("USFM Parser initialized");
	  };

	  initializeParser();
	}, []);



	const handleFileUploadOnLeft = (file) => {
		let fileAvailable = false;
		if (!(file instanceof File)) {
			return;
		}
		const end = file.name.split(".")[1]
		if ( end === "usfm" || end === "sfm") {
			setSourceFileFormat({ name: "USFM" });
			fileAvailable = true;
		} else if (end === "json") {
			setSourceFileFormat({ name: "USJ" });
			fileAvailable = true;
		} else if (end === "xml") {
			setSourceFileFormat({ name: "USX" });
			fileAvailable = true;
		}
		if (fileAvailable) {
			const reader = new FileReader();
			reader.onload = function (e) {
				setFileContentOnLeft(e.target.result);
			};
			reader.readAsText(file);
		}
	};

	const handleDownloadOnRight = () => {
		if (!fileContentOnRight) return;
		const blob = new Blob([fileContentOnRight], { type: "text/plain" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		let format = targetFileFormat.name.toLowerCase();

		a.href = url;
		if (format === "usx") {
			a.download = "USX.xml";
		} else if (format === "usj") {
			a.download = `${sourceFileFormat.name}.json`;
		} else if (format === "table") {
			a.download = `${sourceFileFormat.name}.csv`;
		} else if (format === "syntax-tree") {
			a.download = `${sourceFileFormat.name}-syntax-tree.txt`;
		} else if (format === "biblenlp") {
			a.download = `${sourceFileFormat.name}-biblenlp.txt`;
		} else if (format === "versification") {
			a.download = `${sourceFileFormat.name}-vref.txt`;
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
	const [categories, setCategories] = useState({});

	const formats = {
		USJ: [],
		USX: [],
		Table: [],
		USFM: [],
		BibleNLP: [],
		Versification: [],
		"Syntax-Tree": [],
	};

	const [selectedIndex, setSelectedIndex] = useState(0);
	useEffect(() => {
		let a = Object.keys(formats).filter(
			(format) => format !== sourceFileFormat?.name
		);
		const resultObject = a.reduce((acc, key) => {
			acc[key] = [];
			return acc;
		}, {});

		setCategories(resultObject);
		setSelectedIndex(0);
		setType({ name: "Include_Markers" });
		setFilters([{ value: "", label: "All" }]);
	}, [sourceFileFormat]);


	const convert = async (input, informat="usfm", outFormat="usj", exclude=[], include=[]) => {
		let convertedData="";
		let parser;
		try {
			if (informat=="usfm") {
				    parser = new USFMParser(input);
			} else if(informat=="usj") {
					const usj = JSON.parse(input);
					parser = new USFMParser(null, usj);
			} else if(informat=="usx") {
					const xmlparser = new DOMParser();
					const xmlDoc = xmlparser.parseFromString(input, 'text/xml');
					parser = new USFMParser(null, null, xmlDoc.getElementsByTagName("usx")[0]);
			} else {
				throw new Error(`Unsupported format: ${informat}`);
			}

			if (outFormat === "USJ") {
	    	if (include.length > 0) {
	    			// queryParams = ["c"]
	      		convertedData = parser.toUSJ(null, include); // Convert to USJ format
	    	} else if (exclude.length > 0) {
	    		  convertedData = parser.toUSJ(exclude);
	    	} else {
	    		  convertedData = parser.toUSJ();
	    	}
	    } else if (outFormat === "Table") {
				if (include.length > 0) {
	    			// queryParams = ["c"]
	      		convertedData = parser.toList(null, include); // Convert to USJ format
	    	} else if (exclude.length > 0) {
	    		  convertedData = parser.toList(exclude);
	    	} else {
	    		  convertedData = parser.toList();
	    	}

	      convertedData = parser.toList(); // Convert to table format
	    } else if (outFormat === "Syntax-Tree") {
	      convertedData = parser.toSyntaxTree(); // Convert to syntax tree
	    } else if (outFormat === "USX") {
	      convertedData = parser.toUSX(); // Convert to USX format
	    } else if (outFormat === "USFM") {
	      convertedData = parser.usfm; // Convert to USFM format
	    }  else if (outFormat === "BibleNLP") {
	      convertedData = parser.toBibleNlpFormat().text.join("\n"); // Convert to USFM format
	    }  else if (outFormat === "Versification") {
	      convertedData = parser.toBibleNlpFormat().vref.join("\n"); // Convert to USFM format
	    } else {
	      throw new Error(`Unsupported format: ${outFormat}`);
	    }

		return convertedData;

		} catch (error) {
    console.error("Error processing input data:", error);
    setLoading(false);
    setErrorMsg("Error processing input data:\n"+error);
    setStatus("failed");
    return;
  	}
	}

	
const fetchData = async (tabName = "USJ") => {
  // Preserve markerType and markerFilter processing
  let input = sourceFileFormat.name.toLowerCase();
  let filterType = type.name.toLowerCase();
  let markerFilter = filters.map((option) => option.value);
  let queryParams = [];
  markerFilter = markerFilter.filter(item => item !== "");
  markerFilter.map((marker) => {
  if (Filter[marker]) {
    queryParams = [...queryParams, ...Filter[marker]];
  } else {
    queryParams = [...queryParams, marker.toLowerCase()];
  }
});


  // Ensure USFM data is present
  const inputString = fileContentOnLeft?.toString() || "";
  if (!inputString) {
    setErrorMsg("No input data provided.");
    setStatus("failed");
    return;
  }

  setLoading(true);
  setErrorMsg("");

  const include = filterType === "include_markers" ? queryParams : [];
  const exclude = filterType === "exclude_markers" ? queryParams : [];
  let convertedData = await convert(inputString, input, tabName, exclude, include);
  if (convertedData==null) {
  	setStatus("failed");
  	return;
  }


  // Update the state
  setCategories((prevState) => ({
    ...prevState,
    [tabName]: convertedData,
  }));

  setFileContentOnRight(
    tabName === "USJ"
      ? JSON.stringify(convertedData, null, 2) // Pretty-print JSON
      : convertedData
  );

  setLoading(false);
  setErrorMsg("Successfully processed USFM data.");
  setStatus("success");

};


	const handleTabChange = (tabName) => {
		// Update the target file format based on the selected tab

		setTargetFileFormat(tabName);
		// Fetch data for the selected tab
		setLoading(true);
		fetchData(tabName);
		setCopied(false);
		setType({ name: "Include_Markers" });
		setFilters([{ value: "", label: "All" }]);

		// handlePutRequest();
	};

  


	return (
		<>
			<div className="h-screen w-screen overflow-x-hidden">
				<header
					className=" 
          bg-[#f7f1e3] "
				>
					<div className="flex justify-between items-center">
						<div className="md:flex-1 hidden md:block ml-4">
							<img
								alt="logo"
								src="/images/logo-blue.png"
								className="h-16 p-2"
							/>
						</div>{" "}
						<div className="md:hidden ml-2 border-none">
							<label
								htmlFor="my-drawer"
								className="btn btn-glass shadow-transparent bg-[#f7f1e3] "
								onClick={() => setOpenLeft(!openLeft)}
							>
								{" "}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									className="inline-block w-5 h-5 stroke-current"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h16"
									></path>
								</svg>
							</label>
							<Drawer open={openLeft} side="left" setOpen={setOpenLeft} />
						</div>
						<div className="flex-1">
							<h1 className="text-lg md:text-3xl font-bold  text-sky-900  text-center">
								USFM Grammar
							</h1>
						</div>
						<div className="flex-1 flex justify-end">
							<div className="flex flex-row mr-5 items-center">
								<div className="hidden md:block">
									<AboutUs />
								</div>
								<p className="md:text-xl font-bold text-sky-900 text-right mr-2">
									V3.0.0
								</p>
								<a
									className="text-2xl"
									href="https://github.com/Bridgeconn/usfm-grammar"
									target="_blank"
									rel="noopener noreferrer"
									title="Github Code Repository"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="32"
										height="32"
										fill="#1e3799"
										viewBox="0 0 256 256"
									>
										<path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
									</svg>
								</a>
							</div>
						</div>
					</div>
				</header>
				<main className="h-4/5">
					<div className="md:h-full ">
						<div className="mt-2 mb-5 md:h-full md:flex justify-around md:mx-1 ">
							{/* card 1 */}

							<div className="p-3 border-2 relative min-w-64 border-t-0 border-sky-600 w-11/12 ml-auto mr-auto md:mt-0 md:w-3/6 rounded overflow-visible">
								<div className="flex absolute w-full -top-3 left-0 right-0 items-center">
									<span className="block border-t border-sky-600 border-2 rounded  flex-1"></span>
									<h2 className="mx-1 font-bold">Source</h2>
									<span className="block border-t border-sky-600 border-2 rounded flex-1"></span>
								</div>
								<div className="grid md:grid-cols-4 justify-items-stretch grid-cols-2 gap-2">
									<LeftSourceSelect
										onChange={setSourceFileFormat}
										source={sourceFileFormat}
									/>{" "}
									{targetFileFormat?.name?.toLowerCase() === "usj" ||
									targetFileFormat?.name?.toLowerCase() === "table" ? (
										<>
											<IncludeExclude onChange={setType} />
											<IncludeExcludeFilter onChange={setFilters} />
										</>
									) : (
										<></>
									)}
									<div className="flex ml-28 md:ml-36">
										<FileUploadButton
											className="absolute left-10"
											onChange={handleFileUploadOnLeft}
										/>
									</div>
								</div>
								<textarea
									className="text-sm border mt-5 md:block w-full p-1 h-72 md:h-4/5"
									value={fileContentOnLeft}
									onChange={handleTextareaChangeOnLeft}
								/>
							</div>
							<div
								className="tooltip  absolute hidden md:block md:top-32 z-20"
								data-tip="Process Data"
							>
								<button
									className="md:inline-flex text-sm justify-center items-center  border-2 border-amber-200 hover:border-sky-800 rounded-full bg-white text-sky-600 hover:text-sky-800  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 w-10 h-10 p-1 "
									onClick={() => fetchData()}
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
										<polyline points="9 18 15 12 9 6" />
									</svg>
								</button>
							</div>

							<div
								className="relative block md:hidden tooltip bottom-4 w-16 m-auto"
								data-tip="Process Data"
							>
								<button
									className="md:inline-flex text-sm justify-center  items-center  border-2 border-amber-200 hover:border-sky-800 rounded-full bg-white text-sky-600 hover:text-sky-800  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 w-10 h-10 p-1 "
									onClick={fetchData}
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

							<div className="p-2 border-2 relative min-w-64 border-t-0 border-sky-600 w-11/12 ml-auto mr-auto md:mt-0 md:w-3/6 rounded overflow-visible">
								<div className="flex absolute w-full -top-3 left-0 right-0 items-center">
									<span className="block border-t border-sky-600 border-2 rounded  flex-1"></span>
									<h2 className="mx-1 font-bold">Target</h2>
									<span className="block border-t border-sky-600 border-2 rounded flex-1"></span>
								</div>
								<Tab.Group
									defaultIndex={0}
									selectedIndex={selectedIndex}
									onChange={setSelectedIndex}
								>
									<div className="grid md:grid-cols-6 grid-cols-2 gap-2">
										<div className="ml-5 col-span-5 mt-2 hidden md:block">
											<Tab.List className="flex space-x-1 rounded-xl">
												{Object.keys(categories).map((tabName) => (
													<Tab
														key={tabName}
														className={({ selected }) =>
															classNames(
																"w-72 p-1 rounded-full lg:py-2 text-sm font-medium leading-5",
																"ring-white/30 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
																selected
																	? "bg-white text-blue-700 shadow"
																	: "text-blue-100 hover:bg-blue-600/[0.20] hover:text-white bg-sky-600"
															)
														}
														onClick={() => {
															handleTabChange(tabName);
															setTargetFileFormat({ name: tabName });
														}}
													>
														{tabName}
													</Tab>
												))}
											</Tab.List>
										</div>
										{/*  */}
										<div className="block md:hidden">
											<RightSourceTargetSelect
												onChange={setTargetFileFormat}
												source={sourceFileFormat}
											/>
										</div>
										<div className="mt-2 flex ml-28 md:ml-20">
											<button
												className="mr-2 lg:mr-10 border-2 rounded-lg bg-black text-white hover:bg-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 w-10 h-10 p-1.5 "
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

										{/*  */}
									</div>

									{/*  */}

									{/*  */}

									{/* </div> */}
									<div className="hidden md:block w-full p-1 md:h-4/5 mt-3">
										<Tab.Panels className="w-full h-full ">
											{Object.entries(categories).map(
												([tabName, data], idx) => (
													<Tab.Panel
														key={idx}
														className={classNames(
															"rounded-xl bg-white",
															"ring-white/60 ring-offset-2  ring-offset-blue-400 focus:outline-none focus:ring-2 h-full"
														)}
													>
														{/* Render the data for each tab here */}

														{loading ? (
															<div className="h-full w-full flex items-center justify-center">
																<span className="loading loading-bars loading-lg"></span>
															</div>
														) : tabName?.toLowerCase() === "usx" ? (
															<div className="relative w-full  h-full  p-3 bg-gray-200 overflow-y-auto">
																<section className="section">
																	{copied ? (
																		<span style={{ color: "green" }}>
																			Copied.
																		</span>
																	) : null}
																</section>
																<div className="absolute top-1 right-4 border-2 border-black bg-sky-500 hover:bg-slate-400">
																	<CopyToClipboard onCopy={onCopy} text={data}>
																		<button
																			className="tooltip tooltip-left"
																			data-tip="Copy To Clipboard"
																		>
																			<svg
																				xmlns="http://www.w3.org/2000/svg"
																				width="28"
																				height="28"
																				fill="#ffffff"
																				viewBox="0 0 256 256"
																			>
																				<path d="M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H92.26a47.92,47.92,0,0,1,71.48,0H200A16,16,0,0,1,216,48ZM96,64h64a32,32,0,0,0-64,0ZM200,48H173.25A47.93,47.93,0,0,1,176,64v8a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V64a47.93,47.93,0,0,1,2.75-16H56V216H200Z"></path>
																			</svg>
																		</button>
																	</CopyToClipboard>
																</div>
																<XMLViewer
																	className="w-full h-full "
																	xml={data}
																	collapsible
																/>
															</div>
														) : tabName?.toLowerCase() === "usj" &&
														  Object.keys(data).length !== 0 ? (
															<div className=" relative w-full h-72 md:h-full  p-1 bg-gray-200 overflow-y-auto">
																<section className="section">
																	{copied ? (
																		<span style={{ color: "green" }}>
																			Copied.
																		</span>
																	) : null}
																</section>
																<div className="absolute top-1 right-4 border-2 border-black bg-sky-500 hover:bg-slate-400 z-20">
																	<CopyToClipboard
																		onCopy={onCopy}
																		text={JSON.stringify(data)}
																	>
																		<button
																			className="tooltip tooltip-left"
																			data-tip="Copy To Clipboard"
																		>
																			<svg
																				xmlns="http://www.w3.org/2000/svg"
																				width="28"
																				height="28"
																				fill="#ffffff"
																				viewBox="0 0 256 256"
																			>
																				<path d="M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H92.26a47.92,47.92,0,0,1,71.48,0H200A16,16,0,0,1,216,48ZM96,64h64a32,32,0,0,0-64,0ZM200,48H173.25A47.93,47.93,0,0,1,176,64v8a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V64a47.93,47.93,0,0,1,2.75-16H56V216H200Z"></path>
																			</svg>
																		</button>
																	</CopyToClipboard>
																</div>
																<JsonViewer value={data} />
															</div>
														) : tabName?.toLowerCase() === "table" &&
														  Object.keys(data).length !== 0 ? (
															<div className=" relative w-full h-72 md:h-full  p-1 bg-gray-200 overflow-y-auto">
																<section className="section">
																	{copied ? (
																		<span style={{ color: "green" }}>
																			Copied.
																		</span>
																	) : null}
																</section>
																<div className="absolute top-1 right-4 border-2 border-black bg-sky-500 hover:bg-slate-400 z-20">
																	<CopyToClipboard
																		onCopy={onCopy}
																		text={JSON.stringify(data)}
																	>
																		<button
																			className="tooltip tooltip-left"
																			data-tip="Copy To Clipboard"
																		>
																			<svg
																				xmlns="http://www.w3.org/2000/svg"
																				width="28"
																				height="28"
																				fill="#ffffff"
																				viewBox="0 0 256 256"
																			>
																				<path d="M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H92.26a47.92,47.92,0,0,1,71.48,0H200A16,16,0,0,1,216,48ZM96,64h64a32,32,0,0,0-64,0ZM200,48H173.25A47.93,47.93,0,0,1,176,64v8a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V64a47.93,47.93,0,0,1,2.75-16H56V216H200Z"></path>
																			</svg>
																		</button>
																	</CopyToClipboard>
																</div>
																      <TableViewer data={data} />
															</div>
														) : (
															<div className="relative w-full  h-full  p-3 bg-gray-200">
																<section className="section">
																	{copied ? (
																		<span style={{ color: "green" }}>
																			Copied.
																		</span>
																	) : null}
																</section>
																<div className="absolute top-1 right-4 border-2 border-black bg-sky-500 hover:bg-slate-400">
																	<CopyToClipboard onCopy={onCopy} text={data}>
																		<button
																			className="tooltip tooltip-left"
																			data-tip="Copy To Clipboard"
																		>
																			<svg
																				xmlns="http://www.w3.org/2000/svg"
																				width="28"
																				height="28"
																				fill="#ffffff"
																				viewBox="0 0 256 256"
																			>
																				<path d="M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H92.26a47.92,47.92,0,0,1,71.48,0H200A16,16,0,0,1,216,48ZM96,64h64a32,32,0,0,0-64,0ZM200,48H173.25A47.93,47.93,0,0,1,176,64v8a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V64a47.93,47.93,0,0,1,2.75-16H56V216H200Z"></path>
																			</svg>
																		</button>
																	</CopyToClipboard>
																</div>
																<textarea
																	className=" w-full  h-full  p-1 bg-gray-200 overflow-y-auto"
																	// value={fileContentOnRight}
																	value={data}
																	onChange={handleTextareaChangeOnRight}
																	readOnly={true}
																/>
															</div>
														)}
													</Tab.Panel>
												)
											)}
										</Tab.Panels>
									</div>
								</Tab.Group>

								{/* right panel ends here */}
								<div className=" border-t w-full  md:h-5/6 overflow-y-auto bg-gray-200 md:hidden block p-3">
									{loading ? (
										<div className="h-full w-full flex items-center justify-center">
											<span className="loading loading-bars loading-md"></span>
										</div>
									) : targetFileFormat?.name?.toLowerCase() === "usx" ? (
										<div className=" relative h-72 md:h-full  p-1 bg-gray-200 overflow-y-auto">
											<section className="section">
												{copied ? (
													<span style={{ color: "green" }}>Copied.</span>
												) : null}
											</section>
											<div className="absolute top-1 right-4 border-2 border-black bg-sky-500 hover:bg-slate-400 z-20">
												<CopyToClipboard
													onCopy={onCopy}
													text={fileContentOnRight}
												>
													<button
														className="tooltip tooltip-left"
														data-tip="Copy To Clipboard"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="28"
															height="28"
															fill="#ffffff"
															viewBox="0 0 256 256"
														>
															<path d="M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H92.26a47.92,47.92,0,0,1,71.48,0H200A16,16,0,0,1,216,48ZM96,64h64a32,32,0,0,0-64,0ZM200,48H173.25A47.93,47.93,0,0,1,176,64v8a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V64a47.93,47.93,0,0,1,2.75-16H56V216H200Z"></path>
														</svg>
													</button>
												</CopyToClipboard>
											</div>
											<XMLViewer
												className=" w-full h-full "
												xml={fileContentOnRight}
												collapsible
											/>
										</div>
									) : targetFileFormat?.name?.toLowerCase() === "usj" &&
									  fileContentOnRight !== "" ? (
										<div className=" relative w-full  h-full  p-1 bg-gray-200 overflow-y-auto">
											<section className="section">
												{copied ? (
													<span style={{ color: "green" }}>Copied.</span>
												) : null}
											</section>
											<div className="absolute top-1 right-4 border-2 border-black bg-sky-500 hover:bg-slate-400 z-20">
												<CopyToClipboard
													onCopy={onCopy}
													text={fileContentOnRight}
												>
													<button
														className="tooltip tooltip-left"
														data-tip="Copy To Clipboard"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="28"
															height="28"
															fill="#ffffff"
															viewBox="0 0 256 256"
														>
															<path d="M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H92.26a47.92,47.92,0,0,1,71.48,0H200A16,16,0,0,1,216,48ZM96,64h64a32,32,0,0,0-64,0ZM200,48H173.25A47.93,47.93,0,0,1,176,64v8a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V64a47.93,47.93,0,0,1,2.75-16H56V216H200Z"></path>
														</svg>
													</button>
												</CopyToClipboard>
											</div>
											<JsonViewer value={fileContentOnRight} />
										</div>
									) : (
										<div className=" relative w-full  h-full  p-1 bg-gray-200 ">
											<section className="section">
												{copied ? (
													<span style={{ color: "green" }}>Copied.</span>
												) : null}
											</section>
											<div className="absolute top-1 right-4 border-2 border-black bg-sky-500 hover:bg-slate-400 z-20">
												<CopyToClipboard
													onCopy={onCopy}
													text={fileContentOnRight}
												>
													<button
														className="tooltip tooltip-left"
														data-tip="Copy To Clipboard"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="28"
															height="28"
															fill="#ffffff"
															viewBox="0 0 256 256"
														>
															<path d="M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H92.26a47.92,47.92,0,0,1,71.48,0H200A16,16,0,0,1,216,48ZM96,64h64a32,32,0,0,0-64,0ZM200,48H173.25A47.93,47.93,0,0,1,176,64v8a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V64a47.93,47.93,0,0,1,2.75-16H56V216H200Z"></path>
														</svg>
													</button>
												</CopyToClipboard>
											</div>
											<textarea
												className="w-full md:h-full h-72 bg-gray-200 overflow-y-auto"
												value={fileContentOnRight}
												onChange={handleTextareaChangeOnRight}
												readOnly={true}
											/>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
					<div ref={divRef} className="">
						<Collapse message={errorMsg} status={status} />
					</div>
				</main>
			</div>
		</>
	);
}
//