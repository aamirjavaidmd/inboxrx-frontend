"use client"

import { useState, useEffect } from "react"
import type { PatientData } from "@/lib/types"

const defaultPatientData: PatientData = {
  age: 65,
  gender: "Male",
  medical_history: ["Coronary artery disease", "Hypertension", "Type 2 diabetes", "Hyperlipidemia"],
  current_medications: [
    "Atorvastatin 40mg daily",
    "Metformin 1000mg twice daily",
    "Lisinopril 20mg daily",
    "Aspirin 81mg daily",
  ],
  allergies: ["Penicillin"],
  lab_results: [
    {
      name: "LDL Cholesterol",
      value: "110 mg/dL",
      date: "2023-10-15",
    },
    {
      name: "HDL Cholesterol",
      value: "45 mg/dL",
      date: "2023-10-15",
    },
    {
      name: "Total Cholesterol",
      value: "185 mg/dL",
      date: "2023-10-15",
    },
    {
      name: "HbA1c",
      value: "7.2%",
      date: "2023-09-30",
    },
  ],
}

export function usePatientData() {
  const [patientData, setPatientData] = useState<PatientData>(defaultPatientData)
  const [initialized, setInitialized] = useState(false)

  // Reset to default on first load
  useEffect(() => {
    if (!initialized) {
      localStorage.setItem("inboxrx-patient-data", JSON.stringify(defaultPatientData))
      setInitialized(true)
    }
  }, [initialized])

  // Load from localStorage if available
  useEffect(() => {
    if (initialized) {
      const savedData = localStorage.getItem("inboxrx-patient-data")
      if (savedData) {
        try {
          setPatientData(JSON.parse(savedData))
        } catch (e) {
          console.error("Error parsing saved patient data:", e)
          // Fallback to default if there's an error
          setPatientData(defaultPatientData)
        }
      }
    }
  }, [initialized])

  // Save to localStorage when updated
  const updatePatientData = (newData: PatientData) => {
    setPatientData(newData)
    localStorage.setItem("inboxrx-patient-data", JSON.stringify(newData))
  }

  return { patientData, updatePatientData }
}
