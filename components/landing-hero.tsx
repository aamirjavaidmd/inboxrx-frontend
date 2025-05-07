import Link from "next/link"
import { Button } from "@/components/ui/button"

export function LandingHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                AI-Powered Medical Messaging
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                InboxRx streamlines communication between patients and healthcare providers, reducing response times and
                improving patient satisfaction.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/demo">
                <Button size="lg" className="w-full min-[400px]:w-auto">
                  Try the Demo
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 rounded-lg border"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-background rounded-lg shadow-lg p-4 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="text-xs text-muted-foreground ml-2">InboxRx Patient Portal</div>
                  </div>
                  <div className="flex-1 bg-muted rounded p-2 text-xs overflow-hidden">
                    <div className="flex gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0"></div>
                      <div className="bg-primary/10 rounded-lg p-2 max-w-[80%]">
                        I want to change my atorvastatin dose
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <div className="bg-primary/20 rounded-lg p-2 max-w-[80%]">
                        I understand your concern about your atorvastatin dose. Could you share why you'd like to change
                        it?
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary/30 flex-shrink-0"></div>
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
