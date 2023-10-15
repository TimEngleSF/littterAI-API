import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import connectDb from './DB/connectDB';
import routes from './Routes';
import isAuth from './middleware/isAuth';
import { logError } from './Errors/logError';
const app = express();

const PORT = process.env.SERVER_PORT || 3000;

const startServer = async () => {
  try {
    const db = await connectDb();

    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/', routes.authRoutes);

    app.use('/leaderboard', routes.leaderboardRoutes);

    app.use(isAuth);
    //  Place routes that require authorization below
    app.use('/photoInfo', routes.photoInfoRoutes);

    app.listen(PORT, () => {
      console.log(
        `Server started on port: ${PORT}\nConnected to db: ${db.databaseName}`
      );
    });
  } catch (error: any) {
    logError(error, 'An error occured while executing server');
  }
};

startServer();
