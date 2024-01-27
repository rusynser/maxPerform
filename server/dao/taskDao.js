// taskDao.js
import {  client, dbName } from '../db/db.js';

class TaskDao {
  constructor() {
    this.db = client.db(dbName);
    this.collection = this.db.collection('tasks');
  }

  async createTask(taskData) {
    try {
      const result = await this.collection.insertOne(taskData);
      return result;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async getAllTasks() {
    try {
      return await this.collection.find({}).toArray();
    } catch (error) {
      console.error('Error getting tasks:', error);
      throw error;
    }
  }

  async getTaskById(id) {
    try {
      return await this.collection.findOne({ _id: id });
    } catch (error) {
      console.error('Error finding task:', error);
      throw error;
    }
  }

  async updateTask(id, updateData) {
    try {
      await this.collection.updateOne({ _id: id }, { $set: updateData });
      return this.getTaskById(id);
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async deleteTask(id) {
    try {
      return await this.collection.deleteOne({ _id: id });
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

  async getTasksByProjectId(projectId) {
    try {
        return await this.collection.find({ projectId: projectId }).toArray();
    } catch (error) {
        console.error('Error getting tasks by project ID:', error);
        throw error;
    }
}
}

export default new TaskDao();
