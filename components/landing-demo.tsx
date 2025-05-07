import Link from "next/link"
import { Button } from "@/components/ui/button"

export function LandingDemo() {
  return (
    <section id="demo" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Interactive Demo
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">See InboxRx in Action</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Experience how InboxRx transforms patient-provider communication with our interactive demo
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-12 md:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Patient View</h3>
              <p className="text-muted-foreground">
                Patients can easily communicate with their healthcare providers through a simple, intuitive interface.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Clinician View</h3>
              <p className="text-muted-foreground">
                Clinicians receive AI-assisted draft responses based on medical guidelines and patient history, with
                automatic draft generation and RAG integration.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Medical Knowledge Integration</h3>
              <p className="text-muted-foreground">
                Powered by MedRAG technology to provide evidence-based responses using the latest medical literature and
                guidelines.
              </p>
            </div>
            <div className="pt-4">
              <Link href="/demo">
                <Button size="lg">Try the Demo</Button>
              </Link>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl border shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-background to-muted"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[90%] h-[90%] bg-background rounded-lg shadow-lg p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="text-xs text-muted-foreground ml-2">InboxRx Demo</div>
                </div>
                <div className="flex gap-4 mb-4">
                  <div className="bg-primary/10 rounded-lg px-4 py-2 text-sm font-medium">Patient View</div>
                  <div className="bg-muted rounded-lg px-4 py-2 text-sm font-medium">Clinician View</div>
                  <div className="bg-muted rounded-lg px-4 py-2 text-sm font-medium">Patient Profile</div>
                </div>
                <div className="flex-1 bg-muted rounded p-4 overflow-hidden">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0"></div>
                      <div className="bg-primary/10 rounded-lg p-2 max-w-[80%]">
                        Is there a risk for too low LDL cholesterol?
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <div className="bg-primary/20 rounded-lg p-2 max-w-[80%]">
                        That's a great question about low LDL cholesterol risks. Some concerns have been proposed, but
                        these are not strongly supported by clinical evidence...
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary/30 flex-shrink-0"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0"></div>
                      <div className="bg-primary/10 rounded-lg p-2 max-w-[80%]">
                        Can you tell me more details about the research?
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
