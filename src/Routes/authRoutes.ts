import express from 'express';
import Contollers from '../Controllers';

const authRoutes = express.Router();

authRoutes.post('/register', Contollers.Auth.register);
export default authRoutes;
