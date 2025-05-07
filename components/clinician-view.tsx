"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { PatientMessage, AssistantMessage } from "@/components/message-bubbles"
import { generatePhysicianDraft } from "@/lib/ai-helpers"
import type { ChatHistory, PatientData } from "@/lib/types"
import { MedRAGContext } from "@/components/medrag-context"
import { Loader2, RefreshCw } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ClinicianViewProps {
  chatHistory: ChatHistory
  patientData: PatientData
  physicianDraft: string
  setPhysicianDraft: (draft: string) => void
}

export function ClinicianView({ chatHistory, patientData, physicianDraft, setPhysicianDraft }: ClinicianViewProps) {
  const [editedDraft, setEditedDraft] = useState(physicianDraft)
  const [isEditing, setIsEditing] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState("")
  const [draftStatus, setDraftStatus] = useState<"idle" | "generating" | "ready" | "error">("idle")

  // Auto-generate physician draft when chat history changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      generateDraft()
    }
  }, [chatHistory])

  // Update editedDraft when physicianDraft changes
  useEffect(() => {
    setEditedDraft(physicianDraft)
    if (physicianDraft) {
      setDraftStatus("ready")
    }
  }, [physicianDraft])

  const generateDraft = async () => {
    if (isGenerating || chatHistory.length === 0) return

    setIsGenerating(true)
    setDraftStatus("generating")
    setError("")

    try {
      const draft = await generatePhysicianDraft(patientData, chatHistory)
      setPhysicianDraft(draft)
      setEditedDraft(draft)
      setDraftStatus("ready")
    } catch (error) {
      console.error("Error generating draft:", error)
      setError("Failed to generate physician draft. Please try again.")
      setDraftStatus("error")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setEditedDraft(physicianDraft)
    setIsEditing(false)
  }

  const handleSend = () => {
    setIsSending(true)
    // Simulate sending message
    setTimeout(() => {
      setPhysicianDraft(editedDraft)
      setIsEditing(false)
      setIsSending(false)
      alert("Message sent to patient!")
    }, 1000)
  }

  const handleRegenerateDraft = () => {
    generateDraft()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
            <div className="text-xl font-bold">Patient Conversation</div>

            <div className="flex-1 overflow-auto p-4 rounded-lg border min-h-[400px] max-h-[600px] space-y-4">
              {chatHistory.length === 0 ? (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  No conversation history yet. Patient messages will appear here.
                </div>
              ) : (
                chatHistory.map((message, index) => (
                  <div key={index} className="space-y-4">
                    <PatientMessage message={message[0]} />
                    {message[1] && <AssistantMessage message={message[1]} />}
                  </div>
                ))
              )}
            </div>

            {chatHistory.length > 0 && (
              <div className="space-y-4">
                <MedRAGContext query={chatHistory[chatHistory.length - 1][0]} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">Physician Draft</div>
              <div className="flex items-center gap-2">
                {draftStatus === "generating" && (
                  <div className="flex items-center text-sm text-amber-500">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating draft...
                  </div>
                )}
                {draftStatus === "ready" && <div className="text-sm text-green-500">Draft ready</div>}
                {draftStatus === "error" && <div className="text-sm text-red-500">Draft generation failed</div>}
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {draftStatus === "generating" && (
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md p-3 mb-2">
                <div className="flex items-center text-amber-700 dark:text-amber-400">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Generating physician draft based on the conversation...</span>
                </div>
              </div>
            )}

            <Textarea
              value={editedDraft}
              onChange={(e) => setEditedDraft(e.target.value)}
              placeholder={
                chatHistory.length === 0
                  ? "Physician draft will be automatically generated when patient messages are received"
                  : draftStatus === "generating"
                    ? "Generating draft..."
                    : "No draft available"
              }
              className="min-h-[400px] resize-none"
              disabled={!isEditing || isGenerating}
            />

            <div className="flex gap-2">
              {!isEditing ? (
                <>
                  <Button onClick={handleEdit} disabled={!editedDraft || isGenerating} className="flex-1">
                    Edit Draft
                  </Button>
                  <Button
                    onClick={handleRegenerateDraft}
                    variant="outline"
                    disabled={isGenerating}
                    className="flex items-center gap-1"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Regenerate
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleCancel} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleSend} disabled={isSending} className="flex-1">
                    {isSending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send to Patient"
                    )}
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
