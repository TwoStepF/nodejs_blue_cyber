import express from "express";
import ProjectService from "../services/project.service";

class ProjectController {
    async deleteProject(req: express.Request, res: express.Response) {
        const status = await ProjectService.deleteById(req.params.id);
        res.status(status.status).json(status);
    }
    async addProject(req: express.Request, res: express.Response) {
        const status = await ProjectService.create(req.body);
        res.status(status.status).json(status);
    }
    async getAllProject(req: express.Request, res: express.Response){
        const status = await ProjectService.getAll();
        res.status(200).json(status);
    }

}

export default new ProjectController()