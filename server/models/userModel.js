// models/userModel.js
import {  client, dbName } from '../db/db.js';

const db = client.db(dbName);
const users = db.collection('users');

export default users;
