"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { queryMedRAG } from "@/lib/ai-helpers"
import { Loader2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Citation {
  id: number
  text: string
  relevance: number
}

interface MedRAGContextProps {
  query: string
}

export function MedRAGContext({ query }: MedRAGContextProps) {
  const [citations, setCitations] = useState<Citation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [backendStatus, setBackendStatus] = useState<"unknown" | "connected" | "disconnected">("unknown")

  const fetchCitations = async () => {
    if (!query) return

    setIsLoading(true)
    setError("")

    try {
      // Add console logs for debugging
      console.log("Fetching citations for query:", query)
      const result = await queryMedRAG(query)
      console.log("Received citation data:", result)

      // Check if result is an array
      if (Array.isArray(result)) {
        setCitations(result)
        setBackendStatus("connected")
      } else {
        // Handle case where result is not an array
        console.error("Citations result is not an array:", result)
        setError("Invalid citation format received")
        setCitations([])
      }
    } catch (error) {
      console.error("Error retrieving citations:", error)

      // Check if the error is likely due to the Python backend being unavailable
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        setError("Unable to connect to MedRAG backend. Is the Python server running?")
        setBackendStatus("disconnected")
      } else {
        setError(`Failed to retrieve citations: ${error instanceof Error ? error.message : String(error)}`)
      }

      setCitations([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCitations()
  }, [query])

  const handleRetry = () => {
    fetchCitations()
  }

  // Always render the card, even if empty, to show loading state
  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="text-sm font-medium">Citations</CardTitle>
      </CardHeader>
      <CardContent className="py-2">
        {isLoading ? (
          <div className="flex items-center text-sm text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading citations from MedRAG...
          </div>
        ) : error ? (
          <div className="space-y-2">
            <div className="flex items-start text-sm text-red-500">
              <AlertTriangle className="mr-2 h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
            {backendStatus === "disconnected" && (
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">Make sure the Python backend is running:</p>
                <pre className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-xs overflow-x-auto">python app.py</pre>
                <Button size="sm" variant="outline" onClick={handleRetry} className="mt-2">
                  Retry Connection
                </Button>
              </div>
            )}
          </div>
        ) : citations.length === 0 ? (
          <div className="text-sm text-muted-foreground">No relevant citations found in medical literature</div>
        ) : (
          <ol className="list-decimal pl-5 space-y-2">
            {citations.map((citation) => (
              <li key={citation.id} className="text-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-1">{citation.text}</div>
                  <div className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
                    {citation.relevance}% relevance
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  )
}
