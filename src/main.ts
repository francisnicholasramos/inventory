import express from "express";
import path from "path";
import {router} from "./routes/indexRoutes"

const app = express();

const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/styles", express.static(path.join(__dirname, "styles")));

app.use("/", router)

app.listen(port, () => {
    console.log(`Service running on http://localhost:${port}`);
});

