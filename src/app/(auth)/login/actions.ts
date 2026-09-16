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

// 请将此函数添加到你的 Server Actions 文件中
export async function handleEmailSignUp(formData: LoginFormData) {
  headers();
  const supabase = createClient();
  // 依然硬编码反代域名，确保邮件里的验证链接能准确跳回国内直连地址
  const BASE_URL = "https://my-nankai-timetable.ccwu.cc";

  const result = loginSchema.safeParse(formData);
  if (!result.success) {
    return { error: result.error.message };
  }

  // 调用 signUp 接口，Supabase 会自动向目标邮箱发送包含 Token 的验证链接
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      // 验证成功后强制重定向回我们的兑换路由
      emailRedirectTo: `${BASE_URL}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  // 检查是否因为之前已存在同名账号但未验证，导致需要重新发送
  if (data?.user?.identities?.length === 0) {
    return { error: "该邮箱已被注册。如果未收到邮件，请检查垃圾邮件箱。" };
  }

  return { success: "验证邮件已发送，请前往你的南开邮箱查收并点击验证链接！" };
}
