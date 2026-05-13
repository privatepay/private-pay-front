import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight, ArrowUpLeft } from "lucide-react";
import type { Payment } from "@/components/payment/PaymentTable";
import { PaymentTable } from "@/components/payment/PaymentTable";

const mockPayments: Payment[] = [
  {
    id: "PAY-001",
    customer: "João Silva",
    amount: 1250.0,
    status: "approved",
    method: "Cartão de Crédito",
    date: "18/05/2025 14:32",
  },
  {
    id: "PAY-002",
    customer: "Maria Santos",
    amount: 850.5,
    status: "pending",
    method: "PIX",
    date: "18/05/2025 13:15",
  },
  {
    id: "PAY-003",
    customer: "Carlos Oliveira",
    amount: 2100.0,
    status: "approved",
    method: "Boleto",
    date: "18/05/2025 11:48",
  },
  {
    id: "PAY-004",
    customer: "Ana Costa",
    amount: 450.0,
    status: "failed",
    method: "Cartão de Débito",
    date: "18/05/2025 10:22",
  },
];

const Dashboard = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Visão geral das suas transações
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Valores Recebidos
            </CardTitle>
            <ArrowDownLeft className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-foreground">
              R$ 84.320,00
            </div>
            <p className="flex items-center text-[10px] sm:text-xs text-success">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +12,4% este mês
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Valores Enviados
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-foreground">
              R$ 51.780,00
            </div>
            <p className="flex items-center text-[10px] sm:text-xs text-destructive">
              <ArrowDownLeft className="mr-1 h-3 w-3" />
              -8,1% este mês
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Transferências Recebidas
            </CardTitle>
            <ArrowDownLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-foreground">
              1.248
            </div>
            <p className="flex items-center text-[10px] sm:text-xs text-muted-foreground">
              transações este mês
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Transferências Enviadas
            </CardTitle>
            <ArrowUpLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-foreground">
              873
            </div>
            <p className="flex items-center text-[10px] sm:text-xs text-muted-foreground">
              transações este mês
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="w-full">
        <h2 className="mb-4 text-lg sm:text-xl font-semibold text-foreground">
          Transações Recentes
        </h2>
        <PaymentTable payments={mockPayments} />
      </div>
    </>
  );
};

export default Dashboard;
