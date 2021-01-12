# Safely Handeling Dynamic Data with TypeScript

TypeScript makes JavaScript safer by adding **static** type definitions.
Static definitions are wonderful; they prevent developers from making trivial mistakes by ensuring every assignment and invocation is done correctly.
A variable typed as a `string` cannot be assigned a `number`, and a function expecting three arguments cannot be called with only two.
These definitions only exist at build time though; the code that is eventually executed is just JavaScript.
_But what about the response from a API request?_
In this talk by Ethan Arrowood, Software Engineer 2 @ Microsoft, he will cover various solutions for safely typing dynamic data in TypeScript applications.
This talk features popular technologies such as Fastify, JSON Schema, Node.js, and more!