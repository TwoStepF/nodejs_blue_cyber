import {CommonRoutesConfig} from "../common/common.routes.config";

import express from 'express';
import ProjectController from "./controllers/project.controller";

export class ProjectRoutes extends CommonRoutesConfig{
    constructor(app: express.Application) {
        super(app, 'ProjectRoutes');
    }
    configureRoutes(): express.Application {
        this.app
            .route(`/projects`)
            .post(
                ProjectController.addProject
            )
            .get(
                ProjectController.getAllProject
            )
        this.app
            .route(`/projects/:id`)
            .delete(
                ProjectController.deleteProject
            );
        this.app
            .route('')
        return this.app;
    }


}