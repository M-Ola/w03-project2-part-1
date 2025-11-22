const swaggerAutogen = require("swagger-autogen")();

const doc = {
  openapi: "3.0.0",
  info: {
    title: "Blog and Itinerary planner API",
    description: "Doc for  Blogs and Itinerary planner API ",
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
          createdAt: { type: "string", format: "date-time" },
          userName: { type: "string" },
        },
      },

      Itinerary: {
        type: "object",
        required: ["title", "destination", "startDate", "endDate"],
        properties: {
          title: { type: "string" },
          destination: { type: "string" },
          startDate: { type: "string", format: "date-time" },
          endDate: { type: "string", format: "date-time" },
          notes: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
};


const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);




