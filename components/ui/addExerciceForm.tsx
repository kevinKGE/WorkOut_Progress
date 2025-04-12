'use client'

import { useState } from 'react'
import { Exercice, ExerciceName, ExerciceType } from '../types/models/exercice'
import { X, PlusCircle, Trash2 } from 'lucide-react'

// Normalement, ces données viendraient de votre fichier JSON
const EXERCISE_TYPES = ['Jambes', 'Poitrine', 'Dos', 'Épaules', 'Bras', 'Abdos', 'Cardio'] as const
const EXERCISE_NAMES = ['Squat', 'Développé couché', 'Soulevé de terre', 'Rowing', 'Curl biceps', 'Dips', 'Presse à jambes'] as const

interface AddExerciceFormProps {
    onClose: () => void
    onAddExercice?: (exercice: Omit<Exercice, 'id' | 'workoutId'>) => void
}

export default function AddExerciceForm({ onClose, onAddExercice }: AddExerciceFormProps) {
    const [name, setName] = useState<ExerciceName>('' as ExerciceName)
    const [type, setType] = useState<ExerciceType>('' as ExerciceType)
    const [description, setDescription] = useState('')
    const [sets, setSets] = useState([{ repetitions: 10, weight: 20 }])
    const [rest, setRest] = useState(60)
    const [notes, setNotes] = useState('')

    const addSet = () => {
        setSets([...sets, { repetitions: 10, weight: 20 }])
    }

    const removeSet = (index: number) => {
        setSets(sets.filter((_, i) => i !== index))
    }

    const updateSet = (index: number, field: 'repetitions' | 'weight', value: number) => {
        const newSets = [...sets]
        newSets[index][field] = value
        setSets(newSets)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const newExercice = {
            name,
            type,
            description,
            sets,
            rest,
            notes
        }

        onAddExercice?.(newExercice)
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold">Ajouter un exercice</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Nom de l'exercice
                        </label>
                        <select
                            id="name"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value as ExerciceName)}
                            required
                        >
                            <option value="">Sélectionnez un exercice</option>
                            {EXERCISE_NAMES.map((exerciseName) => (
                                <option key={exerciseName} value={exerciseName}>
                                    {exerciseName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                            Type
                        </label>
                        <select
                            id="type"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={type}
                            onChange={(e) => setType(e.target.value as ExerciceType)}
                            required
                        >
                            <option value="">Sélectionnez un type</option>
                            {EXERCISE_TYPES.map((exerciseType) => (
                                <option key={exerciseType} value={exerciseType}>
                                    {exerciseType}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={2}
                        />
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-gray-700 text-sm font-bold">
                                Séries
                            </label>
                            <button
                                type="button"
                                onClick={addSet}
                                className="text-blue-500 flex items-center text-sm hover:text-blue-700"
                            >
                                <PlusCircle size={16} className="mr-1" />
                                Ajouter une série
                            </button>
                        </div>

                        <div className="space-y-3">
                            {sets.map((set, index) => (
                                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                                    <div className="flex-1">
                                        <label className="block text-gray-500 text-xs mb-1">
                                            Répétitions
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={set.repetitions}
                                            onChange={(e) => updateSet(index, 'repetitions', parseInt(e.target.value) || 0)}
                                            min="1"
                                            required
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-gray-500 text-xs mb-1">
                                            Poids (kg)
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={set.weight}
                                            onChange={(e) => updateSet(index, 'weight', parseInt(e.target.value) || 0)}
                                            min="0"
                                            step="2.5"
                                            required
                                        />
                                    </div>
                                    {sets.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeSet(index)}
                                            className="mt-5 text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rest">
                            Repos (secondes)
                        </label>
                        <input
                            id="rest"
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={rest}
                            onChange={(e) => setRest(parseInt(e.target.value) || 0)}
                            min="0"
                            step="15"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
                            Notes
                        </label>
                        <textarea
                            id="notes"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={2}
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}