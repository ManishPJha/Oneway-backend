import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import lodash from "lodash";

import { localConfig, prodConfig } from "./config/index";

const app: Express = express();

const config = lodash.merge(localConfig, prodConfig);

app.use(bodyParser.json());

process.on("uncaughtException", (error: Error) => {
  console.log(`ERROR:`, error.stack);
  console.log("server is going to down due to uncaught promise rejction.");
  process.exit(1);
});

const server = app.listen(config.PORT, () => {
  console.log(
    `server is running on PORT: ${config.PORT} and NODE_ENV: ${process.env.NODE_ENV}`
  );
});

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Server is running perfectlt.");
});

process.on("unhandledRejection", (error: Error) => {
  console.log(`ERROR:`, error.stack);
  server.close(() => {
    process.exit(1);
  });
  console.log("server is going to down due to unhandled promise rejction.");
});

export default app;
