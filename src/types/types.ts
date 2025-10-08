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
  reward: string;
  icon: string;
}

export interface Food {
  _id: ObjectId;
  id: number;
  name: string;
  description: string;
  restaurant: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  rating: string;
  icon: string;
  location: string;
}