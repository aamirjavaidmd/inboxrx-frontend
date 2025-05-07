export function LandingTestimonials() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trusted by Healthcare Professionals</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See what clinicians and patients are saying about InboxRx
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 fill-primary text-primary"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground">
                "InboxRx has cut my message response time in half. The AI-generated drafts are remarkably accurate and
                save me valuable time."
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-muted p-1">
                <div className="h-10 w-10 rounded-full bg-primary/20"></div>
              </div>
              <div>
                <p className="text-sm font-medium">Dr. Sarah Johnson</p>
                <p className="text-xs text-muted-foreground">Cardiologist</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 fill-primary text-primary"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground">
                "As a patient, I love how quickly I get responses now. The assistant helps clarify my questions before
                my doctor even sees them."
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-muted p-1">
                <div className="h-10 w-10 rounded-full bg-primary/20"></div>
              </div>
              <div>
                <p className="text-sm font-medium">Michael Rodriguez</p>
                <p className="text-xs text-muted-foreground">Patient</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 fill-primary text-primary"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground">
                "Our clinic has seen a 40% reduction in message backlog since implementing InboxRx. It's been a
                game-changer for our staff."
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-muted p-1">
                <div className="h-10 w-10 rounded-full bg-primary/20"></div>
              </div>
              <div>
                <p className="text-sm font-medium">Dr. James Chen</p>
                <p className="text-xs text-muted-foreground">Medical Director</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
