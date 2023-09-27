import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import router from "./routes/routes";
import "dotenv/config";
import cors from "cors";
import path from "path";
import { AppError } from "./errors/AppError";

const server = express();
const port = process.env.PORT;

server.use(express.json());
server.use(cors());
server.use(router);
server.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "Error",
      message: err.msg,
    });
  }

  return res.status(500).json({
    status: "Error",
    message: `Internal Server Error - ${err.message}`,
  });
});

server.listen(port, () => {
  console.log(`Connected ${port}`);
});
