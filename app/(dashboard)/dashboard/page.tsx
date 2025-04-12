'use client'

import { useState } from "react";
import { Workout } from "../../../types/models/workout";
import { Exercice } from "../../../types/models/exercice";
import WorkoutCard from "../../../components/workoutCard";
import ExerciceCard from "../../../components/exerciceCard";
import AddExerciceButton from "../../../components/ui/addExerciceButton";

export default function Dashboard() {
    // const session = await getServerSession(authOptions)
    //
    // if (!session) {
    //     redirect("/login")
    // }
    const [displayMode, setDisplayMode] = useState<'workouts' | 'exercices'>('workouts')
    const [exercices, setExercices] = useState<Exercice[]>([
        {
            id: 1,
            name: 'Squat',
            type: 'Jambes',
            description: 'Squat avec barre',
            sets: [
                { repetitions: 10, weight: 80 },
                { repetitions: 8, weight: 80 },
                { repetitions: 8, weight: 60 }
            ],
            rest: 90,
            notes: 'Augmenter le poids la prochaine fois',
            workoutId: 1
        },
        {
            id: 2,
            name: 'Développé couché',
            type: 'Poitrine',
            description: 'Bench press avec barre',
            sets: [
                { repetitions: 12, weight: 70 },
                { repetitions: 10, weight: 70 },
                { repetitions: 8, weight: 75 }
            ],
            rest: 60,
            notes: '',
            workoutId: 2
        }
    ]);

    const mockWorkouts: Workout[] = [
        {
            id: 1,
            name: 'Push Pull Legs - Jour 1',
            description: 'Focus sur les jambes',
            date: '2025-04-10',
            notes: 'Sensation de progression sur le squat',
            userId: 1,
            exercices: []
        },
        {
            id: 2,
            name: 'Full Body',
            description: 'Session complète',
            date: '2025-04-08',
            notes: '',
            userId: 1,
            exercices: []
        }
    ];

    const handleAddExercice = (newExercice: Omit<Exercice, 'id' | 'workoutId'>) => {
        const exerciceToAdd: Exercice = {
            ...newExercice,
            id: exercices.length + 1, // Génère un ID simple (à remplacer par une méthode plus robuste)
            workoutId: 1 // Par défaut, vous voudriez peut-être choisir le workout
        };

        setExercices([...exercices, exerciceToAdd]);
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

                <div className="flex space-x-2 mb-6">
                    <button
                        onClick={() => setDisplayMode('workouts')}
                        className={`px-4 py-2 rounded-md ${displayMode === 'workouts'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-800'}`}
                    >
                        Workouts
                    </button>
                    <button
                        onClick={() => setDisplayMode('exercices')}
                        className={`px-4 py-2 rounded-md ${displayMode === 'exercices'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-800'}`}
                    >
                        Exercices
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {displayMode === 'workouts' ? (
                    mockWorkouts.map(workout => (
                        <WorkoutCard key={workout.id} workout={workout} />
                    ))
                ) : (
                    exercices.map(exercice => (
                        <ExerciceCard key={exercice.id} exercice={exercice} />
                    ))
                )}
            </div>

            {displayMode === 'exercices' && (
                <AddExerciceButton />
            )}
        </div>
    )
}