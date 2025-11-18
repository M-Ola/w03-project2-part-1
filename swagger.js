const swaggerAutogen = require("swagger-autogen")();
const doc = {
  openapi: "5.0.1",
  info: {
    title: "Contacts Api",
    description: "Contacts Api",
  },
  host: "localhost:3000",
  schemes: ["https", "http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

//This will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);