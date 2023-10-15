import express from 'express';
import Contollers from '../Controllers';

const photoInfoRoutes = express.Router();

photoInfoRoutes.post('/', Contollers.PhotoInfo.postPhotoInfo);
export default photoInfoRoutes;
