var express = require('express');
var fs = require("fs");
const grammar = require('usfm-grammar')

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.end("All Okay")
})

app.post('/usfmToJson', function (req, res) {
	let input = req.body.usfmString;
	let relaxed = req.query.relaxed;
	let scriptureOnly = req.query.scriptureOnly;
	let parser = null;
	let output = null
	try{
		if (relaxed === 'true' || relaxed == true){
			parser = new grammar.USFMParser(input, grammar.LEVEL.RELAXED)
		} else {
			parser = new grammar.USFMParser(input)
		}
		if (scriptureOnly == 'true' || scriptureOnly == true) {
			output = parser.toJSON(grammar.FILTER.SCRIPTURE)
		} else {
			output = parser.toJSON()
		}
		res.end(JSON.stringify(output))
	}catch(err){
		res.end(JSON.stringify(err))
	}
})

app.post('/jsonToUsfm', function (req, res) {
	let input = req.body.jsonObject;
	try {
		let parser = parser = new grammar.JSONParser()
		let output = parser.toUSFM()
		res.end(output)
	}catch(err){
		res.end(JSON.stringify(err))
	}
})

app.post('/usfmToCSV', function( req, res) {
	let input = req.body.usfmString;
	let relaxed = req.query.relaxed;
	let parser = null;
	try {
		if (relaxed === 'true' || relaxed == true){
			parser = new grammar.USFMParser(input, grammar.LEVEL.RELAXED)
		} else {
			parser = new grammar.USFMParser(input)
		}
		let output = parser.toCSV()
		res.end(output)
	}catch(err){
		res.end(JSON.stringify(err))
	}

})

app.post('/usfmToTSV', function( req, res) {
	let input = req.body.usfmString;
	let relaxed = req.query.relaxed;
	let parser = null;
	try {
		if (relaxed === 'true' || relaxed == true){
			parser = new grammar.USFMParser(input, grammar.LEVEL.RELAXED)
		} else {
			parser = new grammar.USFMParser(input)
		}
		let output = parser.toTSV()
		res.end(output)
	}catch(err){
		res.end(JSON.stringify(err))
	}

})

app.post('/validateUsfm', function( req, res) {
	let input = req.body.usfmString;
	let relaxed = req.query.relaxed;
	let parser = null;
	try {
		if (relaxed === 'true' || relaxed == true){
			parser = new grammar.USFMParser(input, grammar.LEVEL.RELAXED)
		} else {
			parser = new grammar.USFMParser(input)
		}
		let output = parser.validate()
		res.end(output.toString())
	}catch(err){
		res.end(JSON.stringify(err))
	}

})

app.post('/validateJson', function( req, res) {
	let input = req.body.jsonObject;
	try {
		let parser = parser = new grammar.JSONParser()
		let output = parser.validate()
		res.end(output.toString())
	}catch(err){
		res.end(JSON.stringify(err))
	}
})

const port = process.env.PORT || 8080;
var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})