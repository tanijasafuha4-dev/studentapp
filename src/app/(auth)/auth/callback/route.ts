import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  // 接收我们刚才在邮件模板里配置的新参数
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/home";

  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  const baseUrl = (isLocalEnv || !forwardedHost) ? origin : `https://${forwardedHost}`;

  // 如果链接中包含哈希令牌，则执行无 Cookie 依赖的验证
  if (token_hash && type) {
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    
    if (!error) {
      // 验证成功，平滑放行
      return NextResponse.redirect(`${baseUrl}${next}`);
    }
    
    console.error("Auth verify error:", error.message);
    return NextResponse.redirect(
      `${baseUrl}/login?error=${encodeURIComponent("验证链接已过期或无效，请重新注册。")}`
    );
  }

  return NextResponse.redirect(`${baseUrl}/login`);
}
