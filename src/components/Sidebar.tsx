import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, CreditCard, ArrowRight } from "lucide-react"

const navItems = [
  {
    label: "Dashboard",
    to: "/home",
    icon: LayoutDashboard,
  },
  {
    label: "Transações",
    to: "/home",
    icon: CreditCard,
  },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-border bg-sidebar px-4 py-6 text-sidebar-foreground">
      <div className="mb-8 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-3xl bg-primary text-primary-foreground">
          <ArrowRight className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-medium">Private Pay</p>
          <span className="text-xs text-muted-foreground">Painel financeiro</span>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = location.pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm transition ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-ring/10"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
