import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import type { ChatHistory, PatientData } from "@/lib/types"

// Helper function to create a prompt from chat history and patient data
function createPrompt(patientData: PatientData, chatHistory: ChatHistory, newQuestion: string) {
  const medicalHistory = patientData.medical_history.join(", ")
  const medications = patientData.current_medications.join(", ")
  const allergies = patientData.allergies.join(", ")

  // Format lab results
  const labResults = patientData.lab_results
    ? patientData.lab_results.map((lab) => `${lab.name}: ${lab.value} (${lab.date})`).join("\n")
    : "No lab results available"

  // Create conversation history
  const conversationFormatted = chatHistory
    .map(([question, answer]) => `Patient: ${question}\nAssistant: ${answer}`)
    .join("\n\n")

  return `
You are an AI assistant for a medical messaging system called InboxRx. Your role is to help patients communicate with their healthcare providers.

PATIENT INFORMATION:
Age: ${patientData.age}
Gender: ${patientData.gender}
Medical History: ${medicalHistory}
Current Medications: ${medications}
Allergies: ${allergies}
Lab Results:
${labResults}

CONVERSATION HISTORY:
${conversationFormatted}

CURRENT QUESTION:
Patient: ${newQuestion}

Respond to the patient in a helpful, informative way. If they're asking about medical conditions, provide evidence-based information while acknowledging that their healthcare provider will give personalized advice. If they're asking about medications, explain general information but suggest discussing specific changes with their provider. Be conversational but professional. If you previously offered to share more information and they're asking for it, provide that additional detail.

Your response:
`
}

export async function POST(request: NextRequest) {
  try {
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key is not configured" }, { status: 500 })
    }

    const { patientData, chatHistory, question } = await request.json()

    if (!patientData || !question) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const prompt = createPrompt(patientData, chatHistory || [], question)

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
      temperature: 0.7,
      maxTokens: 800,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Error generating AI response:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
