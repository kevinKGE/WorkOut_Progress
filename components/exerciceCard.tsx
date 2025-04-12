'use client'

import { Exercice } from '../types/models/exercice'

interface ExerciceCardProps {
    exercice: Exercice
}

export default function ExerciceCard({ exercice }: ExerciceCardProps) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">{exercice.name}</h3>
            <div className="text-sm text-gray-500 mb-3">Type: {exercice.type}</div>

            {exercice.description && (
                <p className="text-sm mb-3">{exercice.description}</p>
            )}

            <div className="bg-gray-50 p-3 rounded-md mb-3">
                <div className="mb-2 text-sm font-medium text-gray-500">Séries</div>
                <div className="flex flex-wrap gap-2">
                    {exercice.sets.map((set, index) => (
                        <div key={index} className="px-3 py-2 bg-white rounded-md border border-gray-200 text-sm">
                            <span className="font-medium">{set.repetitions} × {set.weight}</span> kg
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center mb-3">
                <div className="mr-2 text-gray-500 text-sm">Repos:</div>
                <div className="text-sm font-medium">{exercice.rest} sec</div>
            </div>

            {exercice.notes && (
                <div className="mt-3 p-2 bg-gray-50 rounded-md">
                    <p className="text-sm italic text-gray-600">{exercice.notes}</p>
                </div>
            )}
        </div>
    )
}