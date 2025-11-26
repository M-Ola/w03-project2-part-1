const swaggerAutogen = require("swagger-autogen")();

const doc = {
  openapi: "3.0.0",
  info: {
    title: "Blog API",
    description: "Doc for Blogs API",
    version: "1.0.0",
  },
  servers: [
    { url: "https://w03-project2-part-1.onrender.com" },
    { url: "http://localhost:3000" },
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
          createdAt: { type: "string", format: "date-time" },
          userName: { type: "string" },
        },
      },
      Comment: {
        type: "object",
        required: ["blogId", "userName", "text"],
        properties: {
          userName: { type: "string" },
          comment: { type: "string" },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2025-11-22T17:20:00Z",
          },
        },
      },
    },
  },
  
  
};


const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
