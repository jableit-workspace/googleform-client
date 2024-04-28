import { getServerSession } from "next-auth";
import { FormScreen } from "./_container";
import { use } from "react";
import { authOptions } from "@/_constants/auth-option";
import { redirect } from "next/navigation";

export default function FormPage() {

  const session: Record<string, string | number> =
    use(getServerSession(authOptions)) ?? {};
  if (!Object.hasOwn(session, "email")) return redirect("/login");

  return (
    <FormScreen email={session.email as string} />
  )
}