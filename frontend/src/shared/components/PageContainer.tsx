type PageContainerProps = {
  children: React.ReactNode
}

export function PageContainer({ children }: PageContainerProps) {
  return <div className="mx-auto w-full max-w-md px-4">{children}</div>
}
