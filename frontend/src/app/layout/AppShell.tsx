type AppShellProps = {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-muted/40 flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-background text-foreground flex flex-col relative shadow-2xl border-x border-border/20 pb-24">
        {children}
      </div>
    </div>
  )
}
