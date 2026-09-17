import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  
  // 同时捕获第三方登录的 code 和邮箱验证的 token_hash
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/home";

  // 动态处理代理环境下的回调主域名
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  const baseUrl = (isLocalEnv || !forwardedHost) ? origin : `https://${forwardedHost}`;

  const supabase = createClient();

  // 场景一：处理 Google / Discord 等第三方 OAuth 登录
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${baseUrl}${next}`);
    }
    console.error("OAuth callback error:", error.message);
    return NextResponse.redirect(
      `${baseUrl}/login?error=${encodeURIComponent("第三方授权失败，请重试。")}`
    );
  }

  // 场景二：处理邮箱无 Cookie 依赖的哈希令牌验证
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      return NextResponse.redirect(`${baseUrl}${next}`);
    }
    console.error("OTP verify error:", error.message);
    return NextResponse.redirect(
      `${baseUrl}/login?error=${encodeURIComponent("验证链接已过期或无效，请重新操作。")}`
    );
  }

  // 异常兜底重定向
  return NextResponse.redirect(`${baseUrl}/login`);
}
