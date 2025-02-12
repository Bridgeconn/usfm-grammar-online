import { USFMParser, Filter } from "usfm-grammar-web";
import { DOMParser, XMLSerializer } from "xmldom";

const parser = new DOMParser();

async function initializeParser() {
  try {
    await USFMParser.init(
      "https://cdn.jsdelivr.net/npm/usfm-grammar-web@3.0.0/tree-sitter-usfm.wasm",
      "https://cdn.jsdelivr.net/npm/usfm-grammar-web@3.0.0/tree-sitter.wasm"
    );
    self.postMessage({ type: "initialized" });
  } catch (error) {
    self.postMessage({ type: "error", error: error.message });
  }
}

initializeParser();

async function convert(
  input,
  informat = "usfm",
  outFormat = "usj",
  exclude = [],
  include = []
) {
  let convertedData = "";
  let usfmParser;

  try {
    if (informat === "usfm") {
      usfmParser = new USFMParser(input);
    } else if (informat === "usj") {
      const usj = JSON.parse(input);
      usfmParser = new USFMParser(null, usj);
    } else if (informat === "usx") {
      try {
        const xmlDoc = parser.parseFromString(input, "text/xml");
        const usxElement = xmlDoc.getElementsByTagName("usx")[0];

        if (!usxElement) {
          throw new Error("No USX element found in the XML");
        }

        usfmParser = new USFMParser(null, null, usxElement);
      } catch (xmlError) {
        throw new Error(`XML parsing error: ${xmlError.message}`);
      }
    } else {
      throw new Error(`Unsupported format: ${informat}`);
    }

    if (outFormat === "USJ") {
      if (include.length > 0) {
        convertedData = usfmParser.toUSJ(null, include, true);
      } else if (exclude.length > 0) {
        convertedData = usfmParser.toUSJ(exclude, null, true);
      } else {
        convertedData = usfmParser.toUSJ(null, null, true); //third parameter ignore_errors as true 
      }
    } else if (outFormat === "Table") {
      if (include.length > 0) {
        const tableInclude = [...new Set([...include, ...Filter.BCV, ...Filter.TEXT])];
        convertedData = usfmParser.toList(null, tableInclude, true);
      } else if (exclude.length > 0) {
        convertedData = usfmParser.toList(exclude, null, true);
      } else {
        convertedData = usfmParser.toList(null, null, true);
      }
    } else if (outFormat === "Syntax-Tree") {
      convertedData = usfmParser.toSyntaxTree();
    } else if (outFormat === "USX") {
      const usxNode = usfmParser.toUSX(true); //ignore_errors as true
      const serializer = new XMLSerializer();
      try {
        // Serialize the XML node to string
        convertedData = serializer.serializeToString(usxNode);
      } catch (serializerError) {
        console.error("Serialization error:", serializerError);
        throw new Error(`Failed to serialize USX: ${serializerError.message}`);
      }
    } else if (outFormat === "USFM") {
      convertedData = usfmParser.usfm;
    } else if (outFormat === "BibleNLP") {
      convertedData = usfmParser.toBibleNlpFormat(true).text.join("\n");
    } else if (outFormat === "Versification") {
      convertedData = usfmParser.toBibleNlpFormat(true).vref.join("\n");
    } else {
      throw new Error(`Unsupported format: ${outFormat}`);
    }

    return convertedData;
  } catch (error) {
    throw new Error(`Error processing input data: ${error.message}`);
  }
}

self.onmessage = async function (e) {
  const { input, informat, outFormat, exclude, include } = e.data;

  try {
    const result = await convert(input, informat, outFormat, exclude, include);
    self.postMessage({ type: "success", data: result });
  } catch (error) {
    self.postMessage({ type: "error", error: error.message });
  }
};
