/* const swaggerAutogen = require("swagger-autogen")();
const doc = {
  openapi: "3.0.0",
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
 */

const swaggerAutogen = require("swagger-autogen")();

const doc = {
  openapi: "3.0.0",
  info: {
    title: "Blogs API",
    description: "Blogs CRUD API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
    {
      url: "https://localhost:3000",
      description: "Secure local server",
    },
  ],
  components: {
    schemas: {
      Blog: {
        type: "object",
        required: [
          "title",
          "content",
          "author",
          "category",
          "summary",
          "userName",
        ],
        properties: {
          title: { type: "string" },
          content: { type: "string" },
          author: { type: "string" },
          category: { type: "string" },
          summary: { type: "string" },
          createdAt: { type: "date", format: "date-time" },
          userName: { type: "string" },
        },
      },
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"]; // or ./routes/blogs.js if that’s where your routes are

swaggerAutogen(outputFile, endpointsFiles, doc);





