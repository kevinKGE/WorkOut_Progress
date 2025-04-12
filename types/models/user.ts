import {Workout} from "./workout";

export interface User {
    id: number;
    email: string;
    name: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    workouts: Workout[];
}