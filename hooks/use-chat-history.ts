"use client"

import { useState, useEffect, useCallback } from "react"
import type { ChatHistory } from "@/lib/types"

export function useChatHistory() {
  const [chatHistory, setChatHistory] = useState<ChatHistory>([])
  const [initialized, setInitialized] = useState(false)

  // Function to load chat history from localStorage
  const loadChatHistory = useCallback(() => {
    try {
      const savedHistory = localStorage.getItem("inboxrx-chat-history")
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory)
        if (Array.isArray(parsedHistory)) {
          setChatHistory(parsedHistory)
        } else {
          console.error("Saved chat history is not an array")
          setChatHistory([])
        }
      }
    } catch (e) {
      console.error("Error parsing saved chat history:", e)
      setChatHistory([])
    }
  }, [])

  // Clear localStorage on first load to ensure a fresh start
  useEffect(() => {
    if (!initialized) {
      // Initialize with empty array instead of removing
      localStorage.setItem("inboxrx-chat-history", JSON.stringify([]))
      setInitialized(true)
    }
  }, [initialized])

  // Load from localStorage if available
  useEffect(() => {
    if (initialized) {
      loadChatHistory()

      // Set up event listener for storage changes
      const handleStorageChange = () => {
        loadChatHistory()
      }

      window.addEventListener("storage", handleStorageChange)

      // Clean up
      return () => {
        window.removeEventListener("storage", handleStorageChange)
      }
    }
  }, [initialized, loadChatHistory])

  // Save to localStorage when updated
  const addMessage = (question: string, answer: string) => {
    try {
      // Get current history directly from localStorage to avoid race conditions
      const currentHistoryStr = localStorage.getItem("inboxrx-chat-history")
      let currentHistory: ChatHistory = []

      if (currentHistoryStr) {
        currentHistory = JSON.parse(currentHistoryStr)
        if (!Array.isArray(currentHistory)) {
          currentHistory = []
        }
      }

      // Add new message
      const updatedHistory = [...currentHistory, [question, answer]]

      // Update localStorage
      localStorage.setItem("inboxrx-chat-history", JSON.stringify(updatedHistory))

      // Update state
      setChatHistory(updatedHistory)

      return updatedHistory
    } catch (e) {
      console.error("Error adding message to chat history:", e)
      return chatHistory
    }
  }

  // Update a specific message in the chat history
  const updateMessage = (index: number, question: string, answer: string) => {
    try {
      const updatedHistory = [...chatHistory]
      if (index >= 0 && index < updatedHistory.length) {
        updatedHistory[index] = [question, answer]

        // Update localStorage
        localStorage.setItem("inboxrx-chat-history", JSON.stringify(updatedHistory))

        // Update state
        setChatHistory(updatedHistory)

        // Dispatch storage event for other components
        window.dispatchEvent(new Event("storage"))
      }
    } catch (e) {
      console.error("Error updating message:", e)
    }
  }

  return { chatHistory, addMessage, updateMessage }
}
