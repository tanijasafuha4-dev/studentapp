"use server";

import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers"; // 务必加回来，这是打破静态缓存的“钥匙”
import { redirect } from "next/navigation";
import { z } from "zod";

const BASE_URL = "https://my-nankai-timetable.ccwu.cc";

export async function handleGoogleLogin() {
  headers(); // 唤醒动态请求机制，强制拦截 Cloudflare 的错误缓存

  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
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

export async function handleDiscordLogin() {
  headers(); // 同理，给 Discord 登录也加上

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
