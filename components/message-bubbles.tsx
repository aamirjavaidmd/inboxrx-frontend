interface MessageProps {
  message: string
}

export function PatientMessage({ message }: MessageProps) {
  return (
    <div className="flex items-start gap-2">
      <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0"></div>
      <div className="bg-muted rounded-lg p-3 max-w-[80%]">{message}</div>
    </div>
  )
}

export function AssistantMessage({ message }: MessageProps) {
  if (!message) return null

  return (
    <div className="flex items-start gap-2 justify-end">
      <div className="bg-primary/10 rounded-lg p-3 max-w-[80%]">{message}</div>
      <div className="w-8 h-8 rounded-full bg-primary/30 flex-shrink-0"></div>
    </div>
  )
}
