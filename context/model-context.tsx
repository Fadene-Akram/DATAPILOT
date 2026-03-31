"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface SelectedModel {
  id: string
  name: string
  trainMetrics: Record<string, number>
  valMetrics: Record<string, number>
  overfittingStatus: string
  underfittingStatus: string
}

interface ModelContextType {
  selectedModelsForExport: SelectedModel[]
  setSelectedModelsForExport: (models: SelectedModel[]) => void
  toggleModelForExport: (model: SelectedModel) => void
}

const ModelContext = createContext<ModelContextType | undefined>(undefined)

export function ModelProvider({ children }: { children: React.ReactNode }) {
  const [selectedModelsForExport, setSelectedModelsForExport] = useState<SelectedModel[]>([])

  const toggleModelForExport = (model: SelectedModel) => {
    setSelectedModelsForExport((prev) => {
      const exists = prev.find((m) => m.id === model.id)
      if (exists) {
        return prev.filter((m) => m.id !== model.id)
      } else {
        return [...prev, model]
      }
    })
  }

  return (
    <ModelContext.Provider value={{ selectedModelsForExport, setSelectedModelsForExport, toggleModelForExport }}>
      {children}
    </ModelContext.Provider>
  )
}

export function useModelContext() {
  const context = useContext(ModelContext)
  if (context === undefined) {
    throw new Error("useModelContext must be used within ModelProvider")
  }
  return context
}
