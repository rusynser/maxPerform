import  express  from "express";
import cors from 'cors';
import { connectToDatabase, closeDatabaseConnection } from './db/db.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import session from 'express-session';
import 'dotenv/config';


const app = express();
const port = 4000;
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with the URL of your React app
  credentials: true // Allow cookies to be sent
}));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // for HTTPS, set to true
}));

connectToDatabase()
  .then(() => {

    app.use('/api/projects', projectRoutes);
    app.use('/api/tasks', taskRoutes);
    app.use('/api/users', userRoutes);
    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    
    process.on('SIGINT', async () => {
      console.log('Received SIGINT. Closing the server and database connection...');

      server.close(async () => {
        await closeDatabaseConnection();
        console.log('Server and database connection closed. Exiting process.');
        process.exit(0);
      });
    });
  })
  .catch((error) => {
    console.error('Error starting the app:', error);
  });

