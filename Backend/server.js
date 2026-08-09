const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "src",".env"),
});
// const {resume, selfDescription , jobDescription} = require("./src/services/")

const invokeGeminiAi = require("./src/services/ai.services");
const app = require("./src/app");
const connectToDB = require("./src/config/database");

const PORT = process.env.PORT || 3000;

connectToDB();
// invokeGeminiAi();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});