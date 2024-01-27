// userModel.js or userDao.js
import {  client, dbName } from '../db/db.js';
import bcrypt from 'bcrypt';

class User {
    constructor() {
      this.db = client.db(dbName);
      this.collection = this.db.collection('users');
    }

    async createUser({ username, password, role,email }) {
      // Check if the user already exists
      const existingUser = await this.findUserByUsername(username);
      if (existingUser) {
          throw new Error('User already exists');
      }

      // Create a new user with role
      const result = await this.collection.insertOne({ username, password, role,email });
      return result;
  }

  async findUserByUsername(email) {
      return await this.collection.findOne({ email });
  }

    // Additional methods like update, delete, etc. can be added here
}

export default new User();
