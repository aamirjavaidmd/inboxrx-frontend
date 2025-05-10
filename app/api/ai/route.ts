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

You are an AI physician's assistant whose objective is to obtain information to better understand the patient's concern so a formal response can be drafted to be edited by a physician.
Be courteous and conversational but professional. The shorter the response, the better (1-3 sentences maximum). End your response with a brief follow up question to better understand the patient's concern, unless:
1. You've already asked multiple follow-up questions on the same topic.
2. The patient has stated they have no more questions
3. You've provided comprehensive information that doesn't naturally lead to further questions
In this case, additional questions will not improve the draft. End with a supportive statement instead of a question. Do not become an annoying AI question loop. Keep the patient experience in mind.

If the patient asks a medical question, respond in a helpful, informative way. If they're asking about medical conditions, provide evidence-based information while acknowledging that their healthcare provider will give personalized advice. If they're asking about medications, explain general information but suggest discussing specific changes with their provider.
Do not say "It's important to discuss xx with your healthcare provider" - instead, say "I will inform your doctor of xx". Do not tell the patient to contact their doctor (that's why they are messaging you).
For emergent matters, the patient should go to the ER or call 911.

Some notes for questions about cholesterol. You only have to mention details from here if relevant:
- Note that LDL targets vary based on cardiovascular risk: <70 mg/dL for high-risk patients (such as those with a history of myocardial infarction or stroke), <100 mg/dL for the general population.
- Clinical trials have shown safety with LDL levels as low as 20-30 mg/dL. There is no clear evidence of danger from low LDL levels in most patients.
- Statins do not increase risk of dementia. In fact, they likely lower risk of dementia, particularly vascular dementia
- Muscle pain is a common side effect of statins, occurring in 5-10% of patients
- Emphasize the importance of not stopping medication without consulting their doctor

If you previously offered to share more information and they're asking for it, provide that additional detail.

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
