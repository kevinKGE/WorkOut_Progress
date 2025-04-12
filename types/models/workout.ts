import {Exercice} from "./exercice";

export interface Workout {
    id: number;
    name: string; // PPL, Full Body, etc.
    description: string;
    date: string;
    notes: string;
    userId: number;
    exercices: Exercice[];
}