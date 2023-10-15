import { Collection, ObjectId } from 'mongodb';
import {
  getUploadInfoCollection,
  getCatCountCollection,
} from '../../DB/collections';

import { logError } from '../../Errors/logError';

let photoInfoCollection: Collection;
let categoryCollection: Collection;

const setPhotoInfoCollection = async () => {
  try {
    photoInfoCollection = await getUploadInfoCollection();
  } catch (error) {
    console.log(error);
  }
};

const setCategoryCollection = async () => {
  try {
    categoryCollection = await getCatCountCollection();
  } catch (error) {
    console.log(error);
  }
};
setPhotoInfoCollection();
setCategoryCollection();

export const addPhoto = async (userId: string, category: string) => {
  const userObjId = new ObjectId(userId);
  try {
    await photoInfoCollection.insertOne({
      userId: userObjId,
      category,
      date: new Date(),
    });

    await categoryCollection.updateOne(
      { userId: userObjId },
      { $inc: { totalUploads: 1, [`pictureData.${category}`]: 1 } }
    );
    return { code: 201, data: { message: 'Succesfully added photo' } };
  } catch (error: any) {
    console.log(error);
    await logError(
      error,
      'Error occured while executing addPhoto in Models/PhotoInfo/addPhoto'
    );
    return { code: 500, data: { message: 'Internal Server Error' } };
  }
};
