# usfm-grammar-online

This is a web service made using React JS to provide a user interface for [USFM-Grammar](https://github.com/Bridgeconn/usfm-grammar)

### Demo URL
-  https://usfmgrammar.vachanengine.org/

## Prerequisites

- [Node JS](https://nodejs.org/en/) 20 or above.
- [NPM](https://www.npmjs.com)

Preferably installed via [nvm](https://nodejs.org/en/download)

## Get the code

Clone the [git repository](https://github.com/Bridgeconn/usfm-grammar-online.git) or download the zip and extract it

```bash
git clone --branch usfm-grammar-v3-ui https://github.com/Bridgeconn/usfm-grammar-online.git
```

## Local Deployment Steps

1. Open a terminal and go to the web-app folder
2. Install the dependencies

   `npm install`

3. Start the server

   `npm run dev`

4. Go to http://localhost:5173

## Production Deployment Steps

The production build folder can be created using the following command

```bash
npm run build
```

You can use a hosted solution like [Netlify](https://www.netlify.com/) / [Vercel](https://vercel.com/) or deploy it using a web server like [NginX](https://www.nginx.com/) on your own server.

Steps to deploy a react application with NginX - [Link](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-react-application-with-nginx-on-ubuntu-20-04)
