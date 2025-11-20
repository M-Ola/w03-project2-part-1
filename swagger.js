const swaggerAutogen = require("swagger-autogen")();
const doc = {
  openapi: "5.0.1",
  info: {
    title: "Blogs Api",
    description: "Blogs Api",
  },
  host: "localhost:3000",
  schemes: ["https", "http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

//This will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);