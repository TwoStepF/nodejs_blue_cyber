import express from "express";
import ProjectService from "../services/project.service";
import ProjectDao from "../Daos/project.dao";

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
        const projects = await ProjectService.getAll();
        res.status(200).json(projects);
    }
    async getByProjectId(req: express.Request, res: express.Response){
        const project = await ProjectService.getById(req.params.id)
        res.status(200).json(project)
    }
}

export default new ProjectController()