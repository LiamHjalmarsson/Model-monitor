import { Request, Response } from "express";
import config from "./config/config.js";
import app from "./app.js";
import authRoute from "./routes/authRoute.js";
import brandRoute from "./routes/brandRoute.js";

app.use("/api/auth", authRoute);

app.use("/api/brands", brandRoute);

app.get("/", (req: Request, res: Response) => {
	res.send("Hello, TypeScript + Node.js + Express!");
});

app.listen(config.port, () => {
	console.log(`Server is running on http://localhost:${config.port}`);
});
