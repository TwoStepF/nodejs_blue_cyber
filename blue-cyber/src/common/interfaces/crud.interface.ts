
import {Status} from "../StatusRes/status.dto";

export interface CRUD {
    create: (data: any) =>  Promise<Status>;
    updateById: (id: string, data: any) =>  Promise<any>;
    getAll: () =>  Promise<any>;
    getById: (id: string) =>  Promise<any>;
    deleteById: (id: string) =>  Promise<any>;
}