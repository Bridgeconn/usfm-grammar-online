# usfm-grammar-online

This repository contains 2 ways to deploy [USFM-Grammar](https://github.com/Bridgeconn/usfm-grammar)

These solutions create wrappers around the usfm-grammar npm package so that they can be used by developers or end users who are working with usfm file format.

1. API Service

The is made using Node JS and exprss. When deployed this provides the usfm-grammar functions as a REST API service.

See the api-server folder README for more details on how to deploy the API Service.

2. Web Service

This is made using React JS. When deployed this provides a user interface to work with usfm and json files using the functions usfm-grammar provides.

Demo - https://usfm-grammar-revant.netlify.app/

See the web-app folder README for more details on how to deploy the web service.
