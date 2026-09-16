"use client";

import { LanguageProvider } from "@/contexts/language-context";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <Info className="h-24 w-24 rounded-lg bg-amber-100 p-2 text-amber-500" />
        <h2 className="text-2xl font-bold">{t("not_found.page_not_found")}</h2>
        <Button asChild>
          <Link href="/">{t("not_found.go_home")}</Link>
        </Button>
      </div>
    </div>
  );
}
