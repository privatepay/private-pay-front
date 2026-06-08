import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { useTranslation } from "react-i18next";

export function Sidebar() {
  const { t } = useTranslation();
  const { isOpen, close } = useSidebar();
  const location = useLocation();

  const navItems = [
    { label: t("sidebar.nav.dashboard"), to: "/home", icon: LayoutDashboard },
    { label: t("sidebar.nav.transactions"), to: "/home", icon: CreditCard },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={close}
        />
      )}

      <aside
        className={cn(
          "flex flex-col border-r border-border bg-sidebar text-sidebar-foreground",
          "transition-all duration-300 overflow-hidden",
          "fixed inset-y-0 left-0 z-50 h-full w-72 px-4 py-6",
          "md:sticky md:top-0 md:h-screen md:z-auto",
          isOpen
            ? "translate-x-0 md:w-72 md:px-4"
            : "-translate-x-full md:translate-x-0 md:w-16 md:px-2",
        )}
      >
        <div
          className={cn(
            "mb-8 flex items-center justify-between gap-2",
            !isOpen && "md:justify-center",
          )}
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-3xl bg-primary text-primary-foreground">
              <ArrowRight className="h-6 w-6" />
            </div>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                isOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0",
              )}
            >
              <p className="whitespace-nowrap text-sm font-medium">
                Private Pay
              </p>
              <span className="whitespace-nowrap text-xs text-muted-foreground">
                {t("sidebar.tagline")}
              </span>
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => {
                  if (window.innerWidth < 768) close();
                }}
                className={cn(
                  "flex items-center rounded-3xl py-3 transition",
                  isOpen ? "px-4 gap-3" : "px-0 md:justify-center",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-ring/10",
                )}
              >
                <Icon
                  className={cn("shrink-0", isOpen ? "h-5 w-5" : "h-6 w-6")}
                />
                <span
                  className={cn(
                    "whitespace-nowrap overflow-hidden transition-all duration-300",
                    isOpen ? "max-w-full opacity-100" : "max-w-0 opacity-0",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
