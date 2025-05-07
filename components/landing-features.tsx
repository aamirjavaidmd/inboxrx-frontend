import { MessageSquare, Clock, FileText, Database, Brain, Shield } from "lucide-react"

export function LandingFeatures() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Transforming Medical Communication</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              InboxRx combines AI and medical expertise to streamline patient-provider communication
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/20 p-3">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">AI-Assisted Triage</h3>
            <p className="text-center text-muted-foreground">
              Automatically categorize and prioritize patient messages based on urgency and content
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/20 p-3">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Faster Response Times</h3>
            <p className="text-center text-muted-foreground">
              Reduce clinician workload with AI-generated draft responses based on medical guidelines
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/20 p-3">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Structured Data</h3>
            <p className="text-center text-muted-foreground">
              Extract and organize patient information from unstructured messages
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/20 p-3">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Medical Knowledge Base</h3>
            <p className="text-center text-muted-foreground">
              Access to up-to-date medical literature and guidelines through MedRAG technology
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/20 p-3">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Contextual Understanding</h3>
            <p className="text-center text-muted-foreground">
              AI that understands medical terminology and patient history for more accurate responses
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/20 p-3">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">HIPAA Compliant</h3>
            <p className="text-center text-muted-foreground">
              Secure, encrypted communication that meets healthcare privacy standards
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
