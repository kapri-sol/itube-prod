import cors from "cors";
import express from "express";
import { NextFunction, Response } from "express";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import decodeJWT from "./utils/decodeJWT";
import { uploadMiddleware, uploadController } from "./utils/upload";
import "./env";
import path from "path";

class App {
  public app: GraphQLServer;
  constructor() {
    this.app = new GraphQLServer({
      schema,
      context: req => {
        return {
          req: req.request
        };
      }
    });
    this.middlewares();
  }
  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
    this.app.express.use(this.jwt);
    this.app.express.post("/api/upload", uploadMiddleware, uploadController);

    this.app.express.use(
      "/user/:user",
      express.static(path.join(__dirname, "/../client/build"))
    );
    this.app.express.use(
      "/video/:id",
      express.static(path.join(__dirname, "/../client/build"))
    );
    this.app.express.use(
      "/",
      express.static(path.join(__dirname, "/../client/build"))
    );

    this.app.express.get("*", (req, res, next) =>
      res.sendFile(path.join(__dirname, "/../client/build/index.html"))
    );
  };

  private jwt = async (
    req,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.get("X-JWT");
    if (token) {
      const user = await decodeJWT(token);
      if (user) {
        req.user = user;
      } else {
        req.user = undefined;
      }
    }
    next();
  };
}

export default new App().app;
