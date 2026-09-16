import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { handleGoogleLogin, handleDiscordLogin } from "./actions";
import { BookCopy } from "lucide-react";

export default async function LoginPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/home");
  }
  return (
    <main className="relative min-h-screen">
      <div className="absolute left-8 top-8">
        <Link href="/" className="flex items-center space-x-2">
          <BookCopy className="h-6 w-6 text-indigo-500" />
          <span className="text-xl font-bold text-indigo-500">Studentapp</span>
        </Link>
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center space-y-3 p-24">
        <form action={handleGoogleLogin}>
          <Button type="submit">
            <Image
              src="/google.svg"
              className="mr-2"
              alt="Google Logo"
              width={20}
              height={20}
            />
            Sign in with Google
          </Button>
        </form>
        <form action={handleDiscordLogin}>
          <Button type="submit">
            <Image
              src="/discord.svg"
              className="mr-2"
              alt="Discord Logo"
              width={20}
              height={20}
            />
            Sign in with Discord
          </Button>
        </form>

        <footer className="fixed bottom-5 w-64 text-center text-sm text-neutral-600">
          Mit der Anmeldung stimmen Sie unseren{" "}
          <Link className="underline" href="/terms">
            Nutzungsbedingungen
          </Link>{" "}
          und{" "}
          <Link className="underline" href="/privacy">
            Datenschutzerklärung
          </Link>{" "}
          zu.
        </footer>
      </div>
    </main>
  );
}
