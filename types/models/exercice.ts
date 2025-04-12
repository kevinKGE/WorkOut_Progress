import exercices from "../../data/exercices.json" assert { type: "json" }

export interface ExerciceReference {
    name: string
    type: string
}

const typedExercices = exercices as ExerciceReference[]

export type ExerciceType = typeof exercices[number]["type"]
export type ExerciceName = typeof exercices[number]["name"]

export interface Set {
    repetitions: number
    weight: number
}

export interface Exercice {
    id: number
    name: ExerciceName
    type: ExerciceType
    description: string
    sets: Set[]
    rest: number
    notes: string
    workoutId: number
}