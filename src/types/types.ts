// src/types.ts
import { ObjectId } from "mongodb";

export interface Task {
  _id: ObjectId;
  id: number;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  duration: string;
  location: string;
  distance: string;
  reward: string;
  images: string;
}

export interface Food {
  _id: ObjectId;
  id: number;
  name: string;
  description: string;
  restaurant: string;
  price: string;
  rating: string;
  images: string;
  location: string;
  distance: string;
}