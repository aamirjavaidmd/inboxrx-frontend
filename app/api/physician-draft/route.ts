import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import type { ChatHistory, PatientData } from "@/lib/types"

function createDraftPrompt(patientData: PatientData, chatHistory: ChatHistory) {
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
You are a physician assistant drafting a response to a patient message. Your goal is to create a professional, informative, and compassionate response that the physician can review, edit, and send to the patient.

PATIENT INFORMATION:
Name: ${patientData.name}
Age: ${patientData.age}
Gender: ${patientData.gender}
Medical History: ${medicalHistory}
Current Medications: ${medications}
Allergies: ${allergies}
Lab Results:
${labResults}

PATIENT-AI CONVERSATION:
${conversationFormatted}

Based on the above information, draft a physician's response to the patient. The response should:
1. Address the patient's concerns directly with evidence-based information
2. If relevant, reference specific details from their medical history and lab results.
3. Use a professional but warm tone
4. Include a clear next step or action item (follow-up appointment, lab test, etc.). Provide clear recommendations about medication adjustments if appropriate in order to achieve goals stated in the ACC/AHA guidelines.
5. Be formatted as a formal medical message with greeting and signature

Your draft:
`
}

export async function POST(request: NextRequest) {
  try {
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key is not configured" }, { status: 500 })
    }

    const { patientData, chatHistory } = await request.json()

    if (!patientData || !chatHistory || chatHistory.length === 0) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const prompt = createDraftPrompt(patientData, chatHistory)

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
      temperature: 0.5,
      maxTokens: 1000,
    })

    return NextResponse.json({ draft: text })
  } catch (error) {
    console.error("Error generating physician draft:", error)
    return NextResponse.json({ error: "Failed to generate physician draft" }, { status: 500 })
  }
}
