"use client";

import { SchoolYear } from "@/types/school-year";
import { useTranslation } from "@/hooks/use-translation";
import DeleteYearButton from "@/components/years/delete-year-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import YearCard from "@/components/years/year-card";

interface YearsContentProps {
  schoolYears: SchoolYear[];
  selectAction: (formData: FormData) => Promise<void>;
}

export default function YearsContent({
  schoolYears,
  selectAction,
}: YearsContentProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className="mb-8 pt-8 text-center">
        <h1 className="text-3xl font-bold">{t("years.select_title")}</h1>
      </div>

      <Link href="/new" className="mb-8 block">
        <Button className="w-full gap-2" size="lg">
          <Plus className="h-5 w-5" />
          {t("years.create_new")}
        </Button>
      </Link>

      <div className="grid gap-4">
        {schoolYears
          .sort((a, b) => b.class - a.class)
          .map((year) => (
            /* 1. 给整张卡片增加 relative 包装层，作为绝对定位的参照物 */
            <div key={year.id} className="relative group">
              
              /* 2. 注入删除按钮，并用 z-10 确保它悬浮在卡片的最上层，不会被遮挡或误触 */
              <div className="z-10">
                <DeleteYearButton id={year.id} />
              </div>
              
              /* 3. 保持原有的卡片渲染逻辑不变 */
              <YearCard year={year} selectAction={selectAction} />
            </div>
          ))}
      </div>

      {schoolYears.length === 0 && (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground">{t("years.no_years")}</p>
        </div>
      )}
    </>
  );
}
