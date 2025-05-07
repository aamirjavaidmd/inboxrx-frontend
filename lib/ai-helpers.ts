"use client"

import type { PatientData, ChatHistory } from "./types"

// Function to generate assistant response using the OpenAI API
export async function generateAssistantResponse(patientData: PatientData, chatHistory: ChatHistory): Promise<string> {
  try {
    const lastQuestion = chatHistory[chatHistory.length - 1][0]

    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patientData,
        chatHistory: chatHistory.slice(0, -1), // Exclude the last question which has no answer yet
        question: lastQuestion,
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data.response
  } catch (error) {
    console.error("Error generating assistant response:", error)
    return "I'm sorry, I'm having trouble connecting to the system right now. Please try again later."
  }
}

// Function to generate physician draft using the OpenAI API
export async function generatePhysicianDraft(patientData: PatientData, chatHistory: ChatHistory): Promise<string> {
  try {
    const response = await fetch("/api/physician-draft", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patientData,
        chatHistory,
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data.draft
  } catch (error) {
    console.error("Error generating physician draft:", error)
    return "Error generating physician draft. Please try again later."
  }
}

// Function to query MedRAG using the real MedRAG API
export async function queryMedRAG(query: string): Promise<any> {
  try {
    console.log("Sending query to MedRAG system:", query)

    // Use the /api/rag endpoint that connects to the Python backend
    const response = await fetch("/api/rag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`MedRAG API error: ${response.status} - ${errorText}`)
      throw new Error(`MedRAG API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("MedRAG API response:", data)

    // Check if we got an error response
    if (data.error) {
      console.error("MedRAG API returned an error:", data.error)
      throw new Error(data.error)
    }

    return data
  } catch (error) {
    console.error("Error querying MedRAG:", error)
    return []
  }
}
