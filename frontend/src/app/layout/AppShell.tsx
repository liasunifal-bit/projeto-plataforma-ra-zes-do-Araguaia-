type AppShellProps = {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-muted/40 flex justify-center lg:px-6 xl:px-8">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-screen-xl 2xl:max-w-screen-2xl min-h-screen bg-background text-foreground flex flex-col relative shadow-2xl border-x border-border/20 pb-24 lg:pb-0 lg:pl-24 xl:mx-auto">
        {children}
      </div>
    </div>
  )
}