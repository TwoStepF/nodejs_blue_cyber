import {CRUD} from "../../common/interfaces/crud.interface";
import cache from 'memory-cache'
import {Status} from "../../common/StatusRes/status.dto";
import argon2 from 'argon2';
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
        let hash = await argon2.hash("password")
        return await CryptoDao.crypto(hash)
    }

    async checkKeyToDecode(key: string) {
        try {
            // const password = argon2.verify()
            let dataEncrypted = await CryptoDao.getEncrypted()
            const text = Buffer.from(dataEncrypted[0].crypto, "base64");
            let decrypt = await CryptoService.decrypt(key, text)
            if(decrypt === 'so cool'){
                cache.put('key', key)
                return new Status(200, 'success', '')
            }
            return new Status(400, 'false', '')
        }catch (e){
            console.log(e)
            return new Status(400, 'false', '')
        }

    }
}

export default new AuthService()