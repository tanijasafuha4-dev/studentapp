"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateTermSettings(
  schoolYearId: number, 
  startDate: string, 
  totalWeeks: number
) {
  const supabase = createClient();

  const { error } = await supabase
    .from("school_years")
    .update({ 
      term_start_date: startDate, 
      total_weeks: totalWeeks 
    })
    .eq("id", schoolYearId);

  if (error) {
    return { error: error.message };
  }

  // 强制刷新系统缓存，让首页课表立刻重新计算周数
  revalidatePath("/", "layout");
  return { success: "教学周设置已更新！" };
}
