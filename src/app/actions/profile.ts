"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateUserProfile(fullName: string, avatarUrl: string) {
  const supabase = createClient();

  // 调用 Supabase 的 updateUser 方法，修改 user_metadata
  const { data, error } = await supabase.auth.updateUser({
    data: {
      full_name: fullName,
      avatar_url: avatarUrl,
    }
  });

  if (error) {
    return { error: error.message };
  }

  // 强制刷新整个应用的布局缓存，确保右上角的导航栏头像立即更新
  revalidatePath("/", "layout");
  return { success: "个人资料更新成功！" };
}
