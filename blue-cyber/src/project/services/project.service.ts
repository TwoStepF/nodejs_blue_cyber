import {CRUD} from "../../common/interfaces/crud.interface";
import e from "express";
import ProjectDao from "../Daos/project.dao";
import {Status} from "../../common/StatusRes/status.dto";
import {CreateProjectDto} from "../DTO/create.project.dto";
import CryptoService from "../../common/services/crypto.service";
import cache from "memory-cache";
import {CommonRoutesConfig} from "../../common/common.routes.config";

class ProjectService implements CRUD{
    async create(data: CreateProjectDto){
        data.description = await CryptoService.encrypt(cache.get('key'), data.description)
        data.name = await CryptoService.encrypt(cache.get('key'), data.name)
        return await ProjectDao.addProject(data);
    }

    async deleteById(id: string) {
        return await ProjectDao.deleteProject(id);
    }

    async getAll(): Promise<any> {
        return await ProjectDao.getAll();
    }

    async getById(id: string): Promise<any> {
        let project = await ProjectDao.getById(id),
            DescriptionBuffer = CryptoService.DataToBuffer(project[0].description),
            NameBuffer = CryptoService.DataToBuffer(project[0].name)
        project[0].description = await CryptoService.decrypt(cache.get('key'), DescriptionBuffer)
        project[0].name = await CryptoService.decrypt(cache.get('key'), NameBuffer)
        return project;
    }



    updateById(id: string, data: any): Promise<Status> {
        // @ts-ignore
        return Promise.resolve(undefined);
    }


}

export default new ProjectService()