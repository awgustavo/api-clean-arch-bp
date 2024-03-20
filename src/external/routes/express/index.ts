import express, { type Express, type Request } from "express";
//import { authenticate } from "./middleware/authentication.midleware";

export type RequestAuth = Request & { user: { email: string } };

export const startExpress = () => {
  const app = express();
  //app.use(authenticate);
  app.use(express.json());
  app.get("/", (req, res) => {
    res.json({ keepAlive: Date.now() });
  });

  return app;
};

export const listenExpress = (app: Express, port: number) => {
  app.listen(port, () => {
    console.log(`🚀 Express is listening at http://localhost:${port}`);
  });
};
