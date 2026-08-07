const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "src",".env"),
});
// const {resume, selfDescription , jobDescription} = require("./src/services/")

const invokeGeminiAi = require("./src/services/ai.services");
const app = require("./src/app");
const connectToDB = require("./src/config/database");

connectToDB();
invokeGeminiAi();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});