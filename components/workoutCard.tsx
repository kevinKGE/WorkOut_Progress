'use client'

import Link from 'next/link'
import { Workout } from '../types/models/workout'
import { format } from 'date-fns';

interface WorkoutCardProps {
    workout: Workout
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">{workout.name}</h3>
            <p className="text-gray-600 mb-2">
                {format(new Date(workout.date), 'dd/MM/yyyy')}
            </p>
            <p className="text-sm mb-3">{workout.description}</p>

            <div className="mb-3">
                <p className="text-sm text-gray-500 font-medium">Exercices: {workout.exercices.length}</p>
            </div>

            {workout.notes && (
                <div className="mt-3 p-2 bg-gray-50 rounded-md">
                    <p className="text-sm italic text-gray-600">{workout.notes}</p>
                </div>
            )}

            <div className="mt-4">
                <Link href={`/dashboard/workout/${workout.id}`} className="text-blue-500 text-sm font-medium hover:underline">
                    Voir les détails →
                </Link>
            </div>
        </div>
    )
}