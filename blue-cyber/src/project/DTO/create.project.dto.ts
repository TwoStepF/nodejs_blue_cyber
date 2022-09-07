import mongoose from "mongoose";

export interface CreateProjectDto {
    name: String,
    scopes: { type: String, select: false },
    startDate: String,
    endDate: String,
    description: String,
    group: String,
    owner: String,
    // reporter: mongoose.Types.ObjectId,
    // assignees: [mongoose.Types.ObjectId],
    // comments: [mongoose.Types.ObjectId],
    status: String,
    contacts: String,
    type: String,
    platform: String,
}