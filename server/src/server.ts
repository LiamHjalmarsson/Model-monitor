import { Request, Response } from "express";
import config from "./config/config.js";
import app from "./app.js";

app.get("/", (req: Request, res: Response) => {
	res.send("Hello, TypeScript + Node.js + Express!");
});

app.listen(config.port, () => {
	console.log(`Server is running on http://localhost:${config.port}`);
});
