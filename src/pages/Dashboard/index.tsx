import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { logoutUser } = useAuth();

  return (
    <>
      <Button className="w-full" onClick={() => logoutUser()}>
        Logout
      </Button>
    </>
  );
}
