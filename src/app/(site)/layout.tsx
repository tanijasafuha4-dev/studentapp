import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookCopy } from "lucide-react";
import Link from "next/link";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link
            href="/landing"
            className="flex items-center space-x-2 pl-2 text-indigo-500"
          >
            <BookCopy className="h-6 w-6" />
            <span className="font-bold">Studentapp</span>
          </Link>
          <Button asChild className="ml-4">
            <Link href="/login">Let's start</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mb-10 py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24">
          <div className="flex items-center space-x-4">
            <Link
              href="/changelog"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Changelog
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms of Use
            </Link>
            <Link
              href="/privacy"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
          </div>
          <Separator />
          <p className="text-center leading-loose text-muted-foreground">
            Kevin Shek © 2026-2027
          </p>
        </div>
      </footer>
    </div>
  );
}
