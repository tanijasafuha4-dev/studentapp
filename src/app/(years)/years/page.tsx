import React, { Suspense } from "react";
import PageLoader from "@/components/shared/page-loader";
import { redirect } from "next/navigation";
import {
  getAllSchoolYears,
  setCurrentSchoolYearId,
} from "@/app/actions/school-year";
import YearsContent from "@/components/years/years-content";
import BackButton from "@/components/shared/back-button";

async function selectYearAction(formData: FormData) {
  "use server";

  const id = formData.get("yearId");
  if (!id || typeof id !== "string") {
    throw new Error("Invalid year ID");
  }

  await setCurrentSchoolYearId(parseInt(id, 10));
  redirect("/home");
}

export default function YearsPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <YearsPageContent />
    </Suspense>
  );
}

async function YearsPageContent() {
  const schoolYears = await getAllSchoolYears();

  return (
    <>
      <BackButton url="/home" />
      <YearsContent schoolYears={schoolYears} selectAction={selectYearAction} />
    </>
  );
}
