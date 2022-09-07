import {CommonRoutesConfig} from "../common/common.routes.config";

import express from 'express';
import AuthController from "./controllers/auth.controller";

export class AuthRoutes extends CommonRoutesConfig{
    constructor(app: express.Application) {
        super(app, 'AuthRoutes');
    }
    configureRoutes(): express.Application {
        this.app
            .route(`/cryto`)
            .post(
                AuthController.inputKey
            )
            .get(
                AuthController.decode
            )

        return this.app;
    }


}