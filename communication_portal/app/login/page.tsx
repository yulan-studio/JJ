import { redirect } from "next/navigation";
import { getAppUser } from "../auth";
import LoginForm from "./login-form";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await getAppUser()) redirect("/");
  return <main className="login-page"><LoginForm /></main>;
}
