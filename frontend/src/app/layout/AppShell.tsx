type AppShellProps = {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-muted/40 flex justify-center md:px-6 lg:px-8">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-6xl min-h-screen lg:min-h-0 lg:h-[calc(100vh-3rem)] bg-background text-foreground flex flex-col relative shadow-2xl border-x border-border/20 pb-24 lg:my-6 lg:rounded-[2rem] lg:overflow-hidden">
        {children}
      </div>
    </div>
  )
}
