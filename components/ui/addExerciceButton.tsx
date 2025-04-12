'use client'

import { useState } from 'react'
import { PlusIcon } from 'lucide-react'
import AddExerciceForm from "./addExerciceForm";
export default function AddExerciceButton() {
    const [isFormOpen, setIsFormOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setIsFormOpen(true)}
                className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition-colors"
                aria-label="Ajouter un exercice"
            >
                <PlusIcon size={24} />
            </button>

            {isFormOpen && (
                <AddExerciceForm onClose={() => setIsFormOpen(false)} />
            )}
        </>
    )
}