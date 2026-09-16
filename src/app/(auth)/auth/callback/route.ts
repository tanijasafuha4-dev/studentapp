import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // 默认验证成功后跳回主页 /home
  const next = searchParams.get("next") ?? "/home";

  // 提取原作者的域名解析逻辑，确保在 Cloudflare 代理下也能获取准确的公网域名
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  const baseUrl = (isLocalEnv || !forwardedHost) ? origin : `https://${forwardedHost}`;

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // 验证成功，平滑放行
      return NextResponse.redirect(`${baseUrl}${next}`);
    }
    
    // 核心修复：拦截跨浏览器导致 PKCE 失效的报错，拒绝跳转不存在的 404 页面
    console.error("Auth callback error:", error.message);
    return NextResponse.redirect(
      `${baseUrl}/login?error=${encodeURIComponent("验证失败：为了保障安全，请务必在刚刚发起注册的同一个浏览器窗口中复制并打开此链接。")}`
    );
  }

  // 兜底处理：缺少验证码时直接打回登录页
  return NextResponse.redirect(`${baseUrl}/login`);
}
