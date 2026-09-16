"use server";

import { createClient } from "@/lib/supabase/server";
// import { headers } from "next/headers"; // 删掉或注释掉这行，不再依赖请求头
import { redirect } from "next/navigation";
import { z } from "zod";

// 直接硬编码你的南开专属反代域名
const BASE_URL = "https://my-nankai-timetable.ccwu.cc";

export async function handleGoogleLogin() {
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      // 强制指定正确的回调路由
      redirectTo: `${BASE_URL}/auth/callback`,
    },
  });

  console.log(data);

  if (error) {
    console.error(error.message);
    throw error;
  } else {
    redirect(data.url);
  }
}

export async function handleDiscordLogin() {
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: `${BASE_URL}/auth/callback`,
    },
  });

  console.log(data);

  if (error) {
    console.error(error.message);
    throw error;
  } else {
    redirect(data.url);
  }
}

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export async function handleEmailLogin(formData: LoginFormData) {
  const supabase = createClient();

  const result = loginSchema.safeParse(formData);
  if (!result.success) {
    return { error: result.error.message };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  console.log(data);

  if (error) {
    return { error: error.message };
  }

  redirect("/home");
}
