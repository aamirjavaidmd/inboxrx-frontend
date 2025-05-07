"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import type { PatientData } from "@/lib/types"

interface PatientProfileProps {
  patientData: PatientData
  updatePatientData: (data: PatientData) => void
}

export function PatientProfile({ patientData, updatePatientData }: PatientProfileProps) {
  const [profileJson, setProfileJson] = useState(JSON.stringify(patientData, null, 2))
  const [error, setError] = useState("")

  const handleUpdate = () => {
    try {
      const parsedData = JSON.parse(profileJson)
      updatePatientData(parsedData)
      setError("")
    } catch (e) {
      setError("Invalid JSON format. Please check your input.")
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="text-xl font-bold">Patient Profile</div>

          <Textarea
            value={profileJson}
            onChange={(e) => setProfileJson(e.target.value)}
            className="min-h-[400px] font-mono text-sm"
          />

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Button onClick={handleUpdate}>Update Profile</Button>
        </div>
      </CardContent>
    </Card>
  )
}
