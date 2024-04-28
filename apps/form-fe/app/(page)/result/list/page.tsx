import { authOptions } from "@/_constants/auth-option";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { use } from "react";
import { ResultListScreen } from "./_container";

export default function ResultListPage() {

  const session: Record<string, string | number> =
    use(getServerSession(authOptions)) ?? {};
  if (!Object.hasOwn(session, "email")) return redirect("/login");

  const { result } = use(fetch(`https://google.vote24.co.kr/question/mypaper/${session.email}`, {
    cache: "no-cache",
  }).then(res => res.json()))

  return <ResultListScreen data={result?.list} />
}