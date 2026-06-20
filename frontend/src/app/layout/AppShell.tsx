type AppShellProps = {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-muted/40 lg:px-6 lg:py-6">
      <div className="mx-auto flex min-h-screen w-full max-w-screen-2xl flex-col bg-background text-foreground shadow-2xl lg:min-h-[calc(100vh-3rem)] lg:overflow-hidden lg:rounded-[2rem] lg:border lg:border-border/30">
        {children}
      </div>
    </div>
  )
}
