import type { Route } from "./+types/home";
import { redirect } from "react-router";

export function loader({}: Route.LoaderArgs) {
  return redirect("/dashboard");
}
