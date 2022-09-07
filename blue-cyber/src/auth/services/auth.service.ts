import {CRUD} from "../../common/interfaces/crud.interface";
import e from "express";
import {Status} from "../../common/StatusRes/status.dto";
import * as Crypto from "crypto";
import CryptoService from "../../common/services/crypto.service";
import CryptoDao from "../Daos/crypto.dao";
import util from "util";
import crypto from "crypto";
const randomBytes = util.promisify(crypto.randomBytes);

class AuthService implements CRUD{
    // @ts-ignore
    async create(data: CreateProjectDto){
        // @ts-ignore
        return await ProjectDao.addProject(data);
    }

    async deleteById(id: string) {
        // @ts-ignore
        return await ProjectDao.deleteProject(id);
    }

    async getAll(): Promise<any> {
        // @ts-ignore
        return await ProjectDao.getAll();
    }

    getById(id: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    updateById(id: string, data: any): Promise<Status> {
        // @ts-ignore
        return Promise.resolve(undefined);
    }


    async inputKey(key: any) {

        return await CryptoDao.crypto(await CryptoService.encrypt(key, 2))
    }
}

export default new AuthService()