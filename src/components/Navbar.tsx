export function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-card/95 px-4 py-4 backdrop-blur-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Resumo do dia</p>
          <h2 className="text-lg font-semibold text-foreground">Bem-vindo de volta ao painel</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full border border-border bg-muted px-4 py-2 text-sm text-foreground transition hover:bg-muted/80"
          >
            Nova transação
          </button>
        </div>
      </div>
    </header>
  )
}
