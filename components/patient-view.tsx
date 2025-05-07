"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { PatientMessage, AssistantMessage } from "@/components/message-bubbles"
import { generateAssistantResponse } from "@/lib/ai-helpers"
import type { ChatHistory, PatientData } from "@/lib/types"
import { Loader2 } from "lucide-react"

interface PatientViewProps {
  chatHistory: ChatHistory
  addMessage: (question: string, answer: string) => void
  patientData: PatientData
}

export function PatientView({ chatHistory, addMessage, patientData }: PatientViewProps) {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null)
  // Local chat history state to ensure immediate updates
  const [localChatHistory, setLocalChatHistory] = useState<ChatHistory>(chatHistory)
  const [suggestedQuestions] = useState([
    "Is there a risk for too low LDL cholesterol?",
    "I want to change my atorvastatin dose",
    "I've been having muscle pain with my statin",
    "When will I hear back from my doctor?",
  ])

  // Keep local chat history in sync with props
  useEffect(() => {
    setLocalChatHistory(chatHistory)
  }, [chatHistory])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    const userMessage = message.trim()
    setMessage("")
    setIsLoading(true)
    setCurrentQuestion(userMessage)

    // Update local state immediately with the new message and empty response
    const updatedHistory = [...localChatHistory, [userMessage, ""]]
    setLocalChatHistory(updatedHistory)

    // Add to global state
    addMessage(userMessage, "")

    try {
      // Get the response from the API
      const assistantResponse = await generateAssistantResponse(patientData, updatedHistory)

      // Update local state immediately with the response
      const finalHistory = [...localChatHistory]
      if (finalHistory.length > 0) {
        // Replace the last message with the complete one
        finalHistory[finalHistory.length - 1] = [userMessage, assistantResponse]
        setLocalChatHistory(finalHistory)
      }

      // Update localStorage and global state
      const storedHistory = JSON.parse(localStorage.getItem("inboxrx-chat-history") || "[]")
      if (storedHistory.length > 0) {
        storedHistory[storedHistory.length - 1] = [userMessage, assistantResponse]
        localStorage.setItem("inboxrx-chat-history", JSON.stringify(storedHistory))
      }

      // Force a re-render for other components
      window.dispatchEvent(new Event("storage"))
    } catch (error) {
      console.error("Error generating response:", error)

      // Update local state with error message
      const finalHistory = [...localChatHistory]
      if (finalHistory.length > 0) {
        finalHistory[finalHistory.length - 1] = [userMessage, "I'm sorry, I encountered an error. Please try again."]
        setLocalChatHistory(finalHistory)
      }

      // Update localStorage with error message
      const storedHistory = JSON.parse(localStorage.getItem("inboxrx-chat-history") || "[]")
      if (storedHistory.length > 0) {
        storedHistory[storedHistory.length - 1] = [userMessage, "I'm sorry, I encountered an error. Please try again."]
        localStorage.setItem("inboxrx-chat-history", JSON.stringify(storedHistory))
      }

      window.dispatchEvent(new Event("storage"))
    } finally {
      setIsLoading(false)
      setCurrentQuestion(null)
    }
  }

  const handleSuggestedQuestion = (question: string) => () => {
    setMessage(question)
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="text-xl font-bold">Patient Portal</div>

          <div className="flex-1 overflow-auto p-4 rounded-lg border min-h-[400px] max-h-[600px] space-y-4">
            {localChatHistory.length === 0 ? (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Start a conversation with your healthcare provider
              </div>
            ) : (
              localChatHistory.map((message, index) => (
                <div key={index} className="space-y-4">
                  <PatientMessage message={message[0]} />
                  {message[1] ? (
                    <AssistantMessage message={message[1]} />
                  ) : (
                    isLoading &&
                    currentQuestion === message[0] && (
                      <div className="flex items-center justify-end gap-2">
                        <div className="bg-primary/10 rounded-lg p-3 flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Generating response...</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-primary/30 flex-shrink-0"></div>
                      </div>
                    )
                  )}
                </div>
              ))
            )}
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Suggested questions:</div>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={handleSuggestedQuestion(question)}
                  className="text-xs"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !message.trim()}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send"
              )}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
