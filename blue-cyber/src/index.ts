import {CommonRoutesConfig} from "./common/common.routes.config";
import * as http from "http";
import express from "express";
import cors from 'cors';
import * as bodyparser from 'body-parser';
import helmet from 'helmet';
import {ProjectRoutes} from "./project/project.routes";
import {AuthRoutes} from "./auth/auth.routes";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 8084;
const routes: Array<CommonRoutesConfig> = [];


app.use(bodyparser.json());
app.use(cors());
app.use(helmet());

routes.push(new ProjectRoutes(app));
routes.push(new AuthRoutes(app))
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(`Server running at http://localhost:${port}`);
});

export default server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    routes.forEach((route: CommonRoutesConfig) => {
        console.log(`Routes configured for ${route.getName()}`);
    });
});