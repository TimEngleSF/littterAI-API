import { ObjectId, Document } from 'mongodb';

export interface CategoryDoc extends Document {
  userId: ObjectId;
  email: string;
  username: string;
  pictureData: {
    paper: number;
    cardboard: number;
    compost: number;
    metal: number;
    glass: number;
    plastic: number;
    trash: number;
    other: number;
    unknown: number;
  };
  totalUploads: number;
}

export interface UsersDoc extends Document {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  zip: string;
}

export interface PhotoInfoDoc extends Document {
  _id: ObjectId;
  userId: ObjectId;
  category: string;
  date: Date;
}
