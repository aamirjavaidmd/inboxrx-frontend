"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

export function ApiKeyStatus() {
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null)

  useEffect(() => {
    const checkApiKey = async () => {
      try {
        const response = await fetch("/api/check-key")
        const data = await response.json()
        setIsConfigured(!data.error)
      } catch (error) {
        console.error("Error checking API key:", error)
        setIsConfigured(false)
      }
    }

    checkApiKey()
  }, [])

  if (isConfigured === null) {
    return null
  }

  return (
    <>
      {!isConfigured && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>API Key Not Configured</AlertTitle>
          <AlertDescription>
            The OpenAI API key is not properly configured. Please add your API key to the .env.local file.
          </AlertDescription>
        </Alert>
      )}

      {isConfigured && (
        <Alert className="mb-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle className="text-green-600 dark:text-green-400">API Key Configured</AlertTitle>
          <AlertDescription>
            The OpenAI API key is properly configured. The application is ready to use.
          </AlertDescription>
        </Alert>
      )}
    </>
  )
}
