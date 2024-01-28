import { client, dbName } from '../db/db.js';
import { ObjectId } from 'mongodb';
class ProjectDao {
    constructor() {
        this.db = client.db(dbName);
        this.collection = this.db.collection('projects');
    }

    async createProject(projectData) {
        try {
            const result = await this.collection.insertOne(projectData);
            return result;
        } catch (error) {
            console.error('Error creating project:', error);
        }
    }

    async getAllProjects() {
        try {
            return await this.collection.find({}).toArray();
        } catch (error) {
            console.error('Error retrieving projects:', error);
        }
    }

    async getProjectById(id) {
        try {
            const objectId = new ObjectId(id); 
            return await this.collection.findOne({ _id: objectId });
        } catch (error) {
            console.error('Error finding project:', error);
        }
    }

    async updateProject(id, updateData) {
        try {
            await this.collection.updateOne({ _id: id }, { $set: updateData });
            console.log(id);
            return this.getProjectById(id);
        } catch (error) {
            console.error('Error updating project:', error);
        }
    }

    async addUserToProject(projectId, userId) {
        try {
            // Update the project to add the user ID to the solvers array
            const result = await this.collection.updateOne(
                { _id: new ObjectId(projectId) },
                { $addToSet: { solvers: userId } } // Use $addToSet to prevent duplicates
            );
            return result;
        } catch (error) {
            console.error('Error adding user to project:', error);
            throw error; // Rethrow the error for handling in the controller
        }
    }

    async deleteProject(id) {
        try {
            return await this.collection.deleteOne({ _id: id });
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    }

    async findByUserId(userId) {
        try {
            return await this.collection.find({ user: userId }).toArray(); 
        } catch (error) {
            throw error;
        }
    }
    async findProjectsBySolver(userId) {
        try {
            return await this.collection.find({ solvers: userId }).toArray();
        } catch (error) {
            console.error('Error finding projects for solver:', error);
            throw error;
        }
    }
}

export default new ProjectDao();
