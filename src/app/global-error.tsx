"use client";

import { LanguageProvider } from "@/contexts/language-context";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log(error);
  const { t } = useTranslation();
  return (
    <html>
      <body className="flex h-screen flex-col items-center justify-center gap-4">
        <X className="h-24 w-24 rounded-lg bg-red-100 p-2 text-red-500" />
        <h2 className="text-2xl font-bold">
          {t("error.something_went_wrong")}
        </h2>
        <p className="text-center text-sm text-gray-500">
          {t("error.if_the_problem_persists")}
        </p>
        <a
          className="text-sm text-gray-500 hover:underline"
          href="mailto:contact.johannes@icloud.com"
        >
          contact.johannes@icloud.com
        </a>
        <Button onClick={() => reset()}>{t("error.try_again")}</Button>
      </body>
    </html>
  );
}
