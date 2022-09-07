import MongooesServices from "../../common/services/mongooes.services";
import {CreateProjectDto} from "../DTO/create.project.dto";
import {Status} from "../../common/StatusRes/status.dto";
import mongoose from "mongoose";
import shortid from 'shortid';

class ProjectDao {
    Schema = MongooesServices.getMongoose().Schema;

    projectSchema = new this.Schema({
        _id: { type: String, required: true },
        name: { type: String, maxLength: 2 },
        scopes: { type: String, select: false },
        startDate: String,
        endDate: String,
        description: String,
        group: String,
        owner: String,
        reporter: String,
        assignees: [String],
        comments: [String],
        status: String,
        contacts: String,
        type: String,
        platform: String,
    });

    Project = MongooesServices.getMongoose().model('Project', this.projectSchema);

    constructor() {
        console.log('Created new instance of UsersDao');
    }

    async addProject(createProjectDto: CreateProjectDto) {
        try {
            const projectId = shortid.generate();
            const project = new this.Project({
                _id: projectId,
                ...createProjectDto
            });
            await project.save()
            return new Status(200, 'success', '')
        }catch (err){
            console.log(err)
            return new Status(400, String(err),'')
        }
    }

    async deleteProject(id: string) {
        try{
            await this.Project.deleteOne({ _id: id}).exec();
            return new Status(200, 'success', '')
        }catch (e){
            return new Status(400, String(e), '')
        }
    }

    async getAll() {
        return await this.Project.find().exec();
    }
}

export default new ProjectDao()