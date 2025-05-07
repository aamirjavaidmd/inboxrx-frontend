import { NextResponse } from "next/server"

export async function GET() {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OpenAI API key is not configured" }, { status: 500 })
  }

  return NextResponse.json({ status: "API key is configured" })
}
