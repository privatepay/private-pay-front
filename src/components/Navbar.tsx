import { Menu, ChevronLeft, LogOut, User } from "lucide-react";
import { useSidebar } from "@/hooks/useSidebar";
import { useProfile, useLogout } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { toggle, isOpen } = useSidebar();
  const { data: profile } = useProfile();
  const { logout } = useLogout();

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-card/95 px-4 py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            className="rounded-full p-2 text-foreground transition hover:bg-muted"
            aria-label="Alternar sidebar"
          >
            {!isOpen ? (
              <Menu className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Resumo do dia
            </p>
            <h2 className="text-base font-semibold text-foreground sm:text-lg">
              Bem-vindo de volta ao painel
            </h2>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="rounded-full border border-border bg-muted px-3 py-2 text-sm text-foreground transition hover:bg-muted/80 sm:px-4"
          >
            <span className="hidden sm:inline">Nova transação</span>
            <span className="sm:hidden">+ Nova</span>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <button
                type="button"
                className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                {profile?.firstName ? (
                  profile.firstName.charAt(0).toUpperCase()
                ) : (
                  <User className="h-5 w-5" />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {profile?.firstName} {profile?.lastName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {profile?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={() => logout()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
