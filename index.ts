import cloudinary from "cloudinary";
import _app from "./server/app";
import { localConfig, prodConfig } from "./server/config";
import _ from "lodash";
import connectDatabase from "./server/db/connection";
import errorMiddleware from "./server/middlewares/error";

let config = _.merge(localConfig, prodConfig);

process.on("uncaughtException", (error: Error) => {
  console.log("ERROR :" + error.stack);
  console.log("server is going to down due to uncaught promise exception.");
  process.exit(1);
});

connectDatabase();

// Setting up cloudinary configurations
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware
_app.use(errorMiddleware);

export const server = _app.listen(config.PORT, () => {
  console.log(
    `server is running on PORT: ${config.PORT} and NODE_ENV: ${process.env.NODE_ENV}`
  );
});

process.on("unhandledRejection", (error: Error) => {
  console.log("ERROR :" + error.stack);
  server.close(() => {
    process.exit(1);
  });
  console.log("server is going to down due to unhandled promise rejection.");
});
