"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PatientView } from "@/components/patient-view"
import { ClinicianView } from "@/components/clinician-view"
import { PatientProfile } from "@/components/patient-profile"
import { usePatientData } from "@/hooks/use-patient-data"
import { useChatHistory } from "@/hooks/use-chat-history"
import { ApiKeyStatus } from "@/components/api-key-status"
import { MedRAGStatus } from "@/components/medrag-status"

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState("patient")
  const { patientData, updatePatientData } = usePatientData()
  const { chatHistory, addMessage } = useChatHistory()
  const [physicianDraft, setPhysicianDraft] = useState("")

  // Load physician draft from localStorage
  useEffect(() => {
    const savedDraft = localStorage.getItem("inboxrx-physician-draft")
    if (savedDraft) {
      setPhysicianDraft(savedDraft)
    }
  }, [])

  // Save physician draft to localStorage
  const updatePhysicianDraft = (draft: string) => {
    setPhysicianDraft(draft)
    localStorage.setItem("inboxrx-physician-draft", draft)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">InboxRx Demo</h1>

      <ApiKeyStatus />
      {<MedRAGStatus />}

      <Tabs defaultValue="patient" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="patient">👤 Patient View</TabsTrigger>
          <TabsTrigger value="clinician">🩺 Clinician View</TabsTrigger>
          <TabsTrigger value="profile">📋 Patient Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="patient">
          <PatientView chatHistory={chatHistory} addMessage={addMessage} patientData={patientData} />
        </TabsContent>
        <TabsContent value="clinician">
          <ClinicianView
            chatHistory={chatHistory}
            patientData={patientData}
            physicianDraft={physicianDraft}
            setPhysicianDraft={updatePhysicianDraft}
          />
        </TabsContent>
        <TabsContent value="profile">
          <PatientProfile patientData={patientData} updatePatientData={updatePatientData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
