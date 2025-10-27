import express from "express";
import path from "path";
import {router} from "./routes/indexRoutes"
import {category} from "./routes/categories"

const app = express();

const port = 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.set("views", path.join(__dirname, "../src/views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../src/scripts")));
app.use("/styles", express.static(path.join(__dirname, "../src/styles")));

app.use("/", category)
app.use("/", router)

app.listen(port, () => {
    console.log(`Service running on http://localhost:${port}`);
});

