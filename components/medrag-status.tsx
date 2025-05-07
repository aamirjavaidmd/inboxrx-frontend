"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MedRAGStatus() {
  const [status, setStatus] = useState<"checking" | "connected" | "disconnected">("checking")

  const checkConnection = async () => {
    setStatus("checking")
    try {
      const response = await fetch("/api/rag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: "test connection" }),
      })

      if (response.ok) {
        setStatus("connected")
      } else {
        setStatus("disconnected")
      }
    } catch (error) {
      console.error("Error checking MedRAG connection:", error)
      setStatus("disconnected")
    }
  }

  useEffect(() => {
    checkConnection()
  }, [])

  if (status === "checking") {
    return (
      <Alert className="mb-4">
        <Loader2 className="h-4 w-4 animate-spin" />
        <AlertTitle>Checking MedRAG Connection</AlertTitle>
        <AlertDescription>Verifying connection to the MedRAG Python backend...</AlertDescription>
      </Alert>
    )
  }

  if (status === "disconnected") {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>MedRAG Backend Not Connected</AlertTitle>
        <AlertDescription className="space-y-2">
          <p>Unable to connect to the MedRAG Python backend. Make sure the Python server is running:</p>
          <pre className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-xs overflow-x-auto">python app.py</pre>
          <Button size="sm" variant="outline" onClick={checkConnection} className="mt-2">
            Retry Connection
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="mb-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
      <AlertTitle className="text-green-600 dark:text-green-400">MedRAG Backend Connected</AlertTitle>
      <AlertDescription>
        Successfully connected to the MedRAG Python backend. Real medical literature retrieval is active.
      </AlertDescription>
    </Alert>
  )
}
