import express, { Application, Request, Response } from "express";
import { indexRoute } from "./app/routes";

const app: Application = express();

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the indexRoute at the "/api/v1" path
app.use("/api/v1", indexRoute);

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript + Express!');
});

export default app