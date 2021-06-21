import * as express from "express";
import * as bodyParser from "body-parser";

const app = express();

require("dotenv").config();

import routes from "./routes";

const { PORT = 3000 } = process.env;

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

routes(app);

app.listen(PORT, () => {
    console.log("server started at http://localhost:" + PORT);
});

export default app;
