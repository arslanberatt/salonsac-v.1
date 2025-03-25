import { redirect } from "next/navigation";
import { LoginForm } from "./_components/LoginForm";
import { getLoggedInUser } from "@/actions/auth";

export default async function LoginPage() {
  const user: UserDetails | null = await getLoggedInUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
