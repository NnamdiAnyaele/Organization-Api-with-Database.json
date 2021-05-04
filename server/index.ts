import express from "express";
import router from "./router"
const app = express();

/*
implement your server code here
*/
app.use(express.json());
app.use("/api/users", router);

const port = process.env.PORT || 3005;
app.listen(port, () => console.log("Server running..."));

export default app