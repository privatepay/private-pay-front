import { cn } from "@/lib/utils"

export type Payment = {
  id: string
  customer: string
  amount: number
  status: "approved" | "pending" | "failed"
  method: string
  date: string
}

const statusStyles: Record<Payment["status"], string> = {
  approved: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  failed: "bg-destructive/10 text-destructive",
}

interface PaymentTableProps {
  payments: Payment[]
}

export function PaymentTable({ payments }: PaymentTableProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)

  return (
    <div className="rounded-3xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border text-left text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 font-medium text-muted-foreground">ID</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Cliente</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Valor</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Método</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card-foreground/5">
            {payments.map((payment) => (
              <tr key={payment.id} className="transition hover:bg-muted/50">
                <td className="whitespace-nowrap px-4 py-4 font-medium text-foreground">{payment.id}</td>
                <td className="px-4 py-4 text-foreground">{payment.customer}</td>
                <td className="px-4 py-4 text-foreground">{formatCurrency(payment.amount)}</td>
                <td className="px-4 py-4 text-foreground">{payment.method}</td>
                <td className="px-4 py-4">
                  <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", statusStyles[payment.status])}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-foreground">{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
