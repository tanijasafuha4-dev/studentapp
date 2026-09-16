import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { handleGoogleLogin, handleDiscordLogin } from "./actions";
import { BookCopy } from "lucide-react";
// 引入刚刚编写好的邮箱注册/登录客户端组件
import EmailAuthForm from "@/components/auth/email-auth-form";

export default async function LoginPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/home");
  }
  
  return (
    <main className="relative min-h-screen">
      <div className="absolute left-8 top-8">
        <Link href="/" className="flex items-center space-x-2">
          <BookCopy className="h-6 w-6 text-indigo-500" />
          <span className="text-xl font-bold text-indigo-500">南开课表系统</span>
        </Link>
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">欢迎登录</h1>
            <p className="text-sm text-muted-foreground mt-2">
              使用南开邮箱或第三方账号进入系统
            </p>
          </div>

          {/* 挂载独立的邮箱认证组件 */}
          <EmailAuthForm />

          {/* 视觉分割线 */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                或者使用以下方式
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <form action={handleGoogleLogin}>
              <Button type="submit" variant="outline" className="w-full">
                <Image
                  src="/google.svg"
                  className="mr-2"
                  alt="Google Logo"
                  width={20}
                  height={20}
                />
                通过 Google 登录
              </Button>
            </form>
            <form action={handleDiscordLogin}>
              <Button type="submit" variant="outline" className="w-full">
                <Image
                  src="/discord.svg"
                  className="mr-2"
                  alt="Discord Logo"
                  width={20}
                  height={20}
                />
                通过 Discord 登录
              </Button>
            </form>
          </div>
        </div>

        <footer className="fixed bottom-5 w-full text-center text-sm text-neutral-600">
          注册即表示您同意我们的{" "}
          <Link className="underline hover:text-indigo-500" href="/terms">
            使用条款
          </Link>{" "}
          和{" "}
          <Link className="underline hover:text-indigo-500" href="/privacy">
            隐私政策
          </Link>
        </footer>
      </div>
    </main>
  );
}
