import Link from "next/link"
import { Button } from "@/components/ui/button"

export function LandingCTA() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Transform Your Patient Communication?
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Try our interactive demo today and see how InboxRx can streamline your workflow
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
      </div>
    </section>
  )
}
