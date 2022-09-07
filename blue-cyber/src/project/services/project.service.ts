import {CRUD} from "../../common/interfaces/crud.interface";
import e from "express";
import ProjectDao from "../Daos/project.dao";
import {Status} from "../../common/StatusRes/status.dto";
import {CreateProjectDto} from "../DTO/create.project.dto";

class ProjectService implements CRUD{
    async create(data: CreateProjectDto){
        return await ProjectDao.addProject(data);
    }

    async deleteById(id: string) {
        return await ProjectDao.deleteProject(id);
    }

    async getAll(): Promise<any> {
        return await ProjectDao.getAll();
    }

    getById(id: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    updateById(id: string, data: any): Promise<Status> {
        // @ts-ignore
        return Promise.resolve(undefined);
    }


}

export default new ProjectService()