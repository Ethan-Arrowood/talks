# Safely Handling Dynamic Data with TypeScript

Featuring [Fastify](https://www.fastify.io/), [Undici](https://undici.nodejs.org/), [TypeBox](https://github.com/sinclairzx81/typebox), and [AJV](https://ajv.js.org/) 🚀

This repository contains an example of safely handling dynamic data using TypeScript within a full stack web application. The Fastify server and the Undici client share a set of JSON schemas and relative TypeScript type definitions. These schemas and type definitions are used in different ways by the server and client, but achieve the same effect; the incoming and outgoing data can be validated and assigned a type **safely** with only a few extra lines of code.

Most applications should already be validating data. This is not only a security concern, but also helps prevent unnecessary crashes when the expected data is incorrect. In TypeScript its common to find this kind of data used unsafely since correctly assigning the data object a type based on the validation is difficult. By combining tools such as TypeBox and AJV, both applications can be assured the data is what the developer expects it to be.

## Running the Demo

1. Clone repo, cd into `demo`, and install dependencies (`npm i`)
2. Build the TypeScript code (`npm run build`)
3. Launch the Fastify server (`npm run start:server`)
4. Launch the Undici client script (`npm run start:client`)
