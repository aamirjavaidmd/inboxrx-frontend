import { type NextRequest, NextResponse } from "next/server"

// Get the backend URL from environment variable or use a default URL
const MEDRAG_BACKEND_URL = process.env.MEDRAG_BACKEND_URL || "http://localhost:8000/rag"

export async function POST(request: NextRequest) {
  let query = ""
  try {
    const reqBody = await request.json()
    query = reqBody.query

    if (!query) {
      return NextResponse.json({ error: "Missing query parameter" }, { status: 400 })
    }

    console.log(`Sending query to MedRAG backend: ${query}`)
    console.log(`Backend URL: ${MEDRAG_BACKEND_URL}`)

    // Call the real MedRAG backend
    const response = await fetch(MEDRAG_BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`MedRAG backend error: ${response.status} - ${errorText}`)

      // If the backend is down, fall back to the OpenAI implementation
      if (response.status === 404 || response.status === 503) {
        console.log("Backend unavailable, falling back to OpenAI implementation")
        return await fallbackToOpenAI(query)
      }

      return NextResponse.json(
        {
          error: `MedRAG backend error: ${response.status}`,
        },
        { status: response.status },
      )
    }

    // Parse the response from the backend
    const citations = await response.json()
    console.log(`Received ${citations.length} citations from MedRAG backend`)

    return NextResponse.json(citations)
  } catch (error) {
    console.error("Error connecting to MedRAG backend:", error)

    // Fall back to OpenAI implementation if there's a connection error
    console.log("Connection error, falling back to OpenAI implementation")
    return await fallbackToOpenAI(query)
  }
}

// Keep your current implementation as a fallback
async function fallbackToOpenAI(query: string) {
  try {
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key is not configured" }, { status: 500 })
    }

    // Import these at the function level to avoid issues if they're not needed
    const { generateText } = await import("ai")
    const { openai } = await import("@ai-sdk/openai")

    const prompt = `
You are a medical research assistant that provides evidence-based citations from medical literature.
For the following query, provide 3-5 relevant citations from medical literature:

Query: ${query}

For each citation, provide:
1. The citation text including the source name, authors (if relevant), and year
2. A brief summary of the relevant finding or conclusion (1-2 sentences)
3. A relevance percentage (0-100) indicating how relevant this citation is to the query

Format your response as a JSON array with objects containing "id", "text", and "relevance" fields.
Example:
[
{
  "id": 1,
  "text": "FOURIER Trial (Sabatine et al., 2017): The trial demonstrated safety with LDL cholesterol levels below 30 mg/dL with no increase in adverse events compared to higher levels.",
  "relevance": 95
}
]

Your response MUST be a valid JSON array. Do not include any text before or after the JSON array.
`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
      temperature: 0.3,
      maxTokens: 800,
    })

    console.log("Fallback OpenAI response:", text)

    // Parse the JSON response
    let citations = []
    try {
      // Try to clean the response if it's not pure JSON
      const jsonText = text
        .trim()
        .replace(/^```json/, "")
        .replace(/```$/, "")
        .trim()
      citations = JSON.parse(jsonText)

      // Ensure each citation has the required fields
      citations = citations.map((citation, index) => ({
        id: citation.id || index + 1,
        text: citation.text || "Citation text unavailable",
        relevance: citation.relevance || 0,
      }))
    } catch (e) {
      console.error("Error parsing citations JSON:", e, "Raw text:", text)
      // Return empty array if parsing fails
      citations = []
    }

    return NextResponse.json(citations)
  } catch (error) {
    console.error("Error in OpenAI fallback:", error)
    return NextResponse.json({ error: "Failed to generate citations" }, { status: 500 })
  }
}
