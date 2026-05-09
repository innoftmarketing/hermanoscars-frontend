import { redirect } from "next/navigation";

// Root path redirects to default locale (French)
export default function RootPage() {
  redirect("/fr");
}
