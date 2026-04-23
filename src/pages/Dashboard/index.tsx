import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";

export default function Dashboard() {
  const { logoutUser, data: profile } = useAuth();
  const { changeLanguage } = useUser(profile);

  return (
    <>
      <Button className="w-full" onClick={() => logoutUser()}>
        Logout
      </Button>
      {profile && (
        <Button
          className="w-full"
          onClick={() => changeLanguage(profile.language)}
        >
          Change Language
        </Button>
      )}
    </>
  );
}
