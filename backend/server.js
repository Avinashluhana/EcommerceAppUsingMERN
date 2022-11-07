const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary")

//Handling unCaught exception

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught exception`);
  process.exit(1);
});


dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDNIARY_NAME,
  api_key: process.env.CLOUDINARY_AP1_KEY,
  api_secret: process.env.CLOUDNIARY_SECRET,
});


const PORT = 6000;
const server = app.listen(PORT, () => {
  console.log(`server is working on port ${PORT}`);
});

// Unhandled Promise Rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
